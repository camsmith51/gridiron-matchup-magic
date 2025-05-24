
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, RotateCcw, TrendingUp, Target, Activity } from "lucide-react";

interface PlayerComparisonProps {
  selectedPlayer: any;
  matchedPlayer: any;
  onBack: () => void;
  onNewSearch: () => void;
}

export const PlayerComparison = ({ selectedPlayer, matchedPlayer, onBack, onNewSearch }: PlayerComparisonProps) => {
  const handleShare = () => {
    // Mock share functionality - in real app would generate shareable image
    alert("Share functionality coming soon! This will create a shareable image for social media.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Roster
            </Button>
            <h1 className="text-3xl font-bold text-white">Player Comparison</h1>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={onNewSearch}
              variant="outline"
              className="border-green-600 text-green-200 hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              New Search
            </Button>
            <Button
              onClick={handleShare}
              className="bg-yellow-500 hover:bg-yellow-600 text-green-900"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Result
            </Button>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Original Player */}
          <Card className="bg-white/10 backdrop-blur-sm border-green-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-600 hover:bg-blue-700">
                  Team Build Target
                </Badge>
                <div className="text-right">
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    {selectedPlayer?.team}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-2xl text-white">{selectedPlayer?.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-yellow-400" />
                    <span className="text-green-200 text-sm">Fantasy Points</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{selectedPlayer?.fantasyPoints}</div>
                  <div className="text-green-300 text-xs">per game</div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-yellow-400" />
                    <span className="text-green-200 text-sm">Targets</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{selectedPlayer?.targets}</div>
                  <div className="text-green-300 text-xs">total season</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-3 rounded-lg">
                  <span className="text-green-200 text-sm">Receptions</span>
                  <div className="text-xl font-bold text-white">{selectedPlayer?.receptions}</div>
                </div>
                <div className="bg-white/5 p-3 rounded-lg">
                  <span className="text-green-200 text-sm">Yards</span>
                  <div className="text-xl font-bold text-white">{selectedPlayer?.yards}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Matched Player */}
          <Card className="bg-white/10 backdrop-blur-sm border-yellow-500 ring-2 ring-yellow-500/50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <Badge className="bg-yellow-600 hover:bg-yellow-700 text-green-900">
                  Optimized Match
                </Badge>
                <div className="text-right">
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                    {matchedPlayer?.team}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-2xl text-white">{matchedPlayer?.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-yellow-400" />
                    <span className="text-green-200 text-sm">Projected Points</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">{matchedPlayer?.fantasyPoints}</div>
                  <div className="text-green-300 text-xs">per game</div>
                </div>
                
                <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-yellow-400" />
                    <span className="text-green-200 text-sm">Proj. Targets</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">{matchedPlayer?.targets}</div>
                  <div className="text-green-300 text-xs">projected season</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                  <span className="text-green-200 text-sm">Proj. Catches</span>
                  <div className="text-xl font-bold text-yellow-400">{matchedPlayer?.receptions}</div>
                </div>
                <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                  <span className="text-green-200 text-sm">Proj. Yards</span>
                  <div className="text-xl font-bold text-yellow-400">{matchedPlayer?.yards}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Similarity Analysis */}
        <Card className="bg-white/10 backdrop-blur-sm border-green-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-yellow-400" />
              Similarity Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">87%</div>
                <div className="text-green-200">Statistical Match</div>
                <div className="text-sm text-green-300 mt-1">Based on counting stats</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">92%</div>
                <div className="text-green-200">Usage Pattern</div>
                <div className="text-sm text-green-300 mt-1">Target share & role</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">79%</div>
                <div className="text-green-200">Physical Profile</div>
                <div className="text-sm text-green-300 mt-1">Size & athleticism</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
