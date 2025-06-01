
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PlayerSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayerSelect: (player: any) => void;
  position: string;
}

export const PlayerSearchModal = ({ isOpen, onClose, onPlayerSelect, position }: PlayerSearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchPlayers();
    }
  }, [isOpen, searchTerm]);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('sleeper_players')
        .select(`
          *,
          sleeper_player_stats!inner(
            season,
            fantasy_points,
            targets,
            receptions,
            receiving_yards,
            rushing_yards,
            passing_yards
          )
        `)
        .order('sleeper_player_stats.fantasy_points', { ascending: false })
        .limit(50);

      // Filter by position if specified
      if (position && !position.includes('Bench')) {
        const posFilter = position.replace(/[0-9]/g, ''); // Remove numbers from position
        if (posFilter !== 'FLEX' && posFilter !== 'D/ST' && posFilter !== 'K') {
          query = query.eq('position', posFilter);
        }
      }

      // Apply search filter
      if (searchTerm.trim()) {
        query = query.or(`name.ilike.%${searchTerm}%,team.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching players:', error);
        setPlayers([]);
        return;
      }

      // Transform data to include aggregated stats
      const playersWithStats = data?.map(player => {
        const stats = player.sleeper_player_stats || [];
        const latestStats = stats[0] || {};
        
        return {
          id: player.id,
          name: player.name,
          team: player.team,
          position: player.position,
          fantasyPoints: latestStats.fantasy_points || 0,
          targets: latestStats.targets || 0,
          receptions: latestStats.receptions || 0,
          yards: latestStats.receiving_yards || latestStats.rushing_yards || latestStats.passing_yards || 0,
          height: player.height,
          weight: player.weight,
          // Add mock advanced stats for now
          fortyYardDash: 4.5,
          routeEfficiency: 85,
          separationAverage: 2.5,
          catchRadius: 8.0,
          breakoutAge: 21.0
        };
      }) || [];

      setPlayers(playersWithStats);
    } catch (error) {
      console.error('Error fetching players:', error);
      setPlayers([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerClick = (player: any) => {
    onPlayerSelect(player);
    setSearchTerm("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-black border-purple-700">
        <DialogHeader>
          <DialogTitle className="text-white">Search Player for {position}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
            <Input
              placeholder="Search by player name or team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-purple-600 text-white placeholder:text-purple-300"
            />
          </div>

          {loading ? (
            <div className="text-center text-purple-400 py-8">Loading players...</div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {players.length === 0 ? (
                <div className="text-center text-purple-400 py-8">
                  No players found. Try importing data first.
                </div>
              ) : (
                players.map((player, index) => (
                  <Card
                    key={index}
                    className="bg-white/5 border-purple-600 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => handlePlayerClick(player)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-white">{player.name}</span>
                          <Badge variant="outline" className="text-purple-400 border-purple-400">
                            {player.team}
                          </Badge>
                          <Badge variant="secondary" className="bg-purple-700 text-white">
                            {player.position}
                          </Badge>
                        </div>
                        <div className="text-purple-400 font-bold">
                          {player.fantasyPoints} PPG
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        {player.position !== "QB" && (
                          <>
                            <div className="text-purple-200">
                              <span className="font-medium">Targets:</span> {player.targets}
                            </div>
                            <div className="text-purple-200">
                              <span className="font-medium">Catches:</span> {player.receptions}
                            </div>
                          </>
                        )}
                        <div className="text-purple-200">
                          <span className="font-medium">Yards:</span> {player.yards}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
