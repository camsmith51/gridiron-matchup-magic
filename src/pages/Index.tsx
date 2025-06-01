
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RosterBuilder } from "@/components/RosterBuilder";
import { PlayerComparison } from "@/components/PlayerComparison";
import { Trophy, Users, TrendingUp, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'roster' | 'comparison'>('home');
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [matchedPlayer, setMatchedPlayer] = useState<any>(null);
  const [importing, setImporting] = useState(false);

  const handlePlayerSelect = (player: any) => {
    setSelectedPlayer(player);
    // Find a similar player from database or use mock for now
    setMatchedPlayer({
      name: "2025 Jalen Coker",
      team: "CAR",
      position: "WR",
      fantasyPoints: 12.4,
      targets: 89,
      receptions: 58,
      yards: 742,
      fortyYardDash: 4.42,
      height: "6'1\"",
      weight: 205,
      routeEfficiency: 94,
      separationAverage: 2.8,
      catchRadius: 8.2,
      breakoutAge: 20.1
    });
    setCurrentView('comparison');
  };

  const handleImportData = async () => {
    setImporting(true);
    toast.info("Starting data import... This may take a few minutes.");
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-fantasy-data');
      
      if (error) {
        throw error;
      }
      
      if (data.success) {
        toast.success(`Import complete! Added ${data.playersAdded} players and ${data.statsAdded} stat records.`);
      } else {
        throw new Error(data.error || 'Import failed');
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error(`Import failed: ${error.message}`);
    } finally {
      setImporting(false);
    }
  };

  if (currentView === 'roster') {
    return <RosterBuilder onPlayerSelect={handlePlayerSelect} onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'comparison') {
    return (
      <PlayerComparison 
        selectedPlayer={selectedPlayer}
        matchedPlayer={matchedPlayer}
        onBack={() => setCurrentView('roster')}
        onNewSearch={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-purple-800">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Trophy className="h-12 w-12 text-purple-400" />
            <h1 className="text-5xl font-bold text-white">
              Gridiron Matchup Magic
            </h1>
          </div>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Find your next fantasy football sleeper by comparing players to past season performances. 
            Build your roster and discover hidden gems using advanced statistical analysis.
          </p>
          
          <div className="flex gap-4 justify-center mb-8">
            <Button 
              onClick={() => setCurrentView('roster')}
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-8 py-4 text-lg"
            >
              Start Building Your Roster
            </Button>
            
            <Button
              onClick={handleImportData}
              disabled={importing}
              variant="outline"
              size="lg"
              className="border-purple-600 text-purple-200 hover:bg-white/10 font-bold px-8 py-4 text-lg"
            >
              <Download className="h-5 w-5 mr-2" />
              {importing ? "Importing..." : "Import Real Data"}
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-purple-700">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Smart Player Matching</h3>
              <p className="text-purple-100">
                Compare counting stats like fantasy points, targets, and yards to find similar players
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-purple-700">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Advanced Analytics</h3>
              <p className="text-purple-100">
                Deep dive into route efficiency, combine metrics, and advanced performance data
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-purple-700">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Viral-Ready Results</h3>
              <p className="text-purple-100">
                Beautiful side-by-side comparisons perfect for sharing on social media
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
