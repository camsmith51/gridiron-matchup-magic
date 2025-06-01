
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting fantasy data fetch...');
    
    // Fetch players and their stats from Sleeper API for the past 7 years (2017-2023)
    const years = ['2017', '2018', '2019', '2020', '2021', '2022', '2023'];
    let totalPlayersAdded = 0;
    let totalStatsAdded = 0;

    for (const year of years) {
      console.log(`Fetching data for ${year}...`);
      
      // Get all players for the year
      const playersResponse = await fetch(`https://api.sleeper.app/v1/players/nfl`);
      const allPlayers = await playersResponse.json();
      
      // Get stats for the year
      const statsResponse = await fetch(`https://api.sleeper.app/v1/stats/nfl/regular/${year}`);
      const yearStats = await statsResponse.json();

      // Filter for relevant fantasy positions
      const relevantPlayers = Object.entries(allPlayers).filter(([_, player]: [string, any]) => 
        ['QB', 'RB', 'WR', 'TE'].includes(player.position) && 
        player.team && 
        yearStats[player.player_id]
      );

      console.log(`Found ${relevantPlayers.length} relevant players for ${year}`);

      for (const [playerId, player] of relevantPlayers) {
        const playerStats = yearStats[playerId];
        if (!playerStats) continue;

        // Insert or update player
        const { data: existingPlayer } = await supabase
          .from('players')
          .select('id')
          .eq('sleeper_id', playerId)
          .single();

        let dbPlayerId;
        if (!existingPlayer) {
          const { data: newPlayer, error: playerError } = await supabase
            .from('players')
            .insert({
              name: player.full_name || `${player.first_name} ${player.last_name}`,
              position: player.position,
              team: player.team,
              sleeper_id: playerId,
              height: player.height,
              weight: player.weight ? parseInt(player.weight) : null,
              age: player.age,
              years_exp: player.years_exp
            })
            .select('id')
            .single();

          if (playerError) {
            console.error('Error inserting player:', playerError);
            continue;
          }
          dbPlayerId = newPlayer.id;
          totalPlayersAdded++;
        } else {
          dbPlayerId = existingPlayer.id;
        }

        // Calculate fantasy points (standard scoring)
        let fantasyPoints = 0;
        
        // QB scoring
        if (player.position === 'QB') {
          fantasyPoints += (playerStats.pass_yd || 0) * 0.04; // 1 point per 25 yards
          fantasyPoints += (playerStats.pass_td || 0) * 4; // 4 points per TD
          fantasyPoints += (playerStats.pass_int || 0) * -2; // -2 points per INT
          fantasyPoints += (playerStats.rush_yd || 0) * 0.1; // 1 point per 10 yards
          fantasyPoints += (playerStats.rush_td || 0) * 6; // 6 points per TD
        }
        
        // RB/WR/TE scoring
        if (['RB', 'WR', 'TE'].includes(player.position)) {
          fantasyPoints += (playerStats.rush_yd || 0) * 0.1; // 1 point per 10 yards
          fantasyPoints += (playerStats.rush_td || 0) * 6; // 6 points per TD
          fantasyPoints += (playerStats.rec_yd || 0) * 0.1; // 1 point per 10 yards
          fantasyPoints += (playerStats.rec_td || 0) * 6; // 6 points per TD
          fantasyPoints += (playerStats.rec || 0) * 1; // 1 point per reception (PPR)
        }

        // Insert player stats
        const { error: statsError } = await supabase
          .from('player_stats')
          .insert({
            player_id: dbPlayerId,
            season: parseInt(year),
            week: null, // Season totals
            fantasy_points: parseFloat(fantasyPoints.toFixed(2)),
            targets: playerStats.rec_tgt || 0,
            receptions: playerStats.rec || 0,
            receiving_yards: playerStats.rec_yd || 0,
            receiving_tds: playerStats.rec_td || 0,
            rushing_yards: playerStats.rush_yd || 0,
            rushing_tds: playerStats.rush_td || 0,
            passing_yards: playerStats.pass_yd || 0,
            passing_tds: playerStats.pass_td || 0,
            interceptions: playerStats.pass_int || 0
          });

        if (statsError) {
          console.error('Error inserting stats:', statsError);
          continue;
        }

        // Insert advanced stats if available
        if (player.position === 'WR' || player.position === 'TE') {
          const { error: advancedError } = await supabase
            .from('advanced_stats')
            .insert({
              player_id: dbPlayerId,
              season: parseInt(year),
              target_share: playerStats.rec_tgt ? (playerStats.rec_tgt / 150) * 100 : null, // Rough estimate
              air_yards_share: null, // Not available in Sleeper
              red_zone_targets: null, // Not available in Sleeper
              snap_share: null, // Not available in Sleeper
              route_participation: null // Not available in Sleeper
            });

          if (advancedError) {
            console.error('Error inserting advanced stats:', advancedError);
          }
        }

        totalStatsAdded++;
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`Data fetch complete. Added ${totalPlayersAdded} players and ${totalStatsAdded} stat records.`);

    return new Response(JSON.stringify({ 
      success: true, 
      playersAdded: totalPlayersAdded,
      statsAdded: totalStatsAdded,
      message: `Successfully imported fantasy data for ${years.length} seasons`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching fantasy data:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
