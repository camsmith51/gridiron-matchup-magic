
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Share2, RotateCcw, TrendingUp, Target, Activity, Timer, Ruler, Weight } from "lucide-react";

interface PlayerComparisonProps {
  selectedPlayer: any;
  matchedPlayer: any;
  onBack: () => void;
  onNewSearch: () => void;
}

export const PlayerComparison = ({ selectedPlayer, matchedPlayer, onBack, onNewSearch }: PlayerComparisonProps) => {
  const handleShare = () => {
    alert("Share functionality coming soon! This will create a shareable image for social media.");
  };

  const CountingStatsCard = ({ player, isMatched = false }: { player: any, isMatched?: boolean }) => {
    const cardClass = isMatched 
      ? "bg-white/10 backdrop-blur-sm border-purple-500 ring-2 ring-purple-500/50"
      : "bg-white/10 backdrop-blur-sm border-purple-700";
    
    const accentColor = isMatched ? "purple-400" : "white";
    const bgColor = isMatched ? "purple-500/10" : "white/5";
    const borderColor = isMatched ? "purple-500/30" : "purple-600/20";

    return (
      <Card className={cardClass}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <Badge className={isMatched ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"}>
              {isMatched ? "Optimized Match" : "Team Build Target"}
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              {player?.team}
            </Badge>
          </div>
          <CardTitle className="text-2xl text-white">{player?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className={`bg-${bgColor} p-4 rounded-lg ${isMatched ? `border border-${borderColor}` : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className={`h-4 w-4 text-${accentColor}`} />
                <span className="text-purple-200 text-sm">Fantasy Points</span>
              </div>
              <div className={`text-2xl font-bold text-${accentColor}`}>{player?.fantasyPoints}</div>
              <div className="text-purple-300 text-xs">per game</div>
            </div>
            
            <div className={`bg-${bgColor} p-4 rounded-lg ${isMatched ? `border border-${borderColor}` : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <Target className={`h-4 w-4 text-${accentColor}`} />
                <span className="text-purple-200 text-sm">Targets</span>
              </div>
              <div className={`text-2xl font-bold text-${accentColor}`}>{player?.targets}</div>
              <div className="text-purple-300 text-xs">total season</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className={`bg-${bgColor} p-3 rounded-lg ${isMatched ? `border border-${borderColor}` : ''}`}>
              <span className="text-purple-200 text-sm">Receptions</span>
              <div className={`text-xl font-bold text-${accentColor}`}>{player?.receptions}</div>
            </div>
            <div className={`bg-${bgColor} p-3 rounded-lg ${isMatched ? `border border-${borderColor}` : ''}`}>
              <span className="text-purple-200 text-sm">Yards</span>
              <div className={`text-xl font-bold text-${accentColor}`}>{player?.yards}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const AdvancedStatsCard = ({ player, isMatched = false }: { player: any, isMatched?: boolean }) => {
    const accentColor = isMatched ? "purple-400" : "white";
    const bgColor = isMatched ? "purple-500/10" : "white/5";
    const borderColor = isMatched ? "purple-500/30" : "purple-600/20";

    return (
      <div className="space-y-4">
        {/* Physical Attributes */}
        <Card className="bg-white/5 backdrop-blur-sm border-purple-600">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Ruler className="h-4 w-4 text-purple-400" />
              Physical Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-4">
            <div className={`bg-${bgColor} p-3 rounded-lg ${isMatched ? `border border-${borderColor}` : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <Timer className={`h-3 w-3 text-${accentColor}`} />
                <span className="text-purple-200 text-xs">40-Yard Dash</span>
              </div>
              <div className={`text-lg font-bold text-${accentColor}`}>{player?.fortyYardDash}s</div>
            </div>
            <div className={`bg-${bgColor} p-3 rounded-lg ${isMatched ? `border border-${borderColor}` : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <Ruler className={`h-3 w-3 text-${accentColor}`} />
                <span className="text-purple-200 text-xs">Height</span>
              </div>
              <div className={`text-lg font-bold text-${accentColor}`}>{player?.height}</div>
            </div>
            <div className={`bg-${bgColor} p-3 rounded-lg ${isMatched ? `border border-${borderColor}` : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <Weight className={`h-3 w-3 text-${accentColor}`} />
                <span className="text-purple-200 text-xs">Weight</span>
              </div>
              <div className={`text-lg font-bold text-${accentColor}`}>{player?.weight} lbs</div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        {player?.position === "WR" || player?.position === "TE" ? (
          <Card className="bg-white/5 backdrop-blur-sm border-purple-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Activity className="h-4 w-4 text-purple-400" />
                Route Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className={`bg-${bgColor} p-3 rounded-lg ${isMatched ? `border border-${borderColor}` : ''}`}>
                <span className="text-purple-200 text-xs">Route Efficiency</span>
                <div className={`text-lg font-bold text-${accentColor}`}>{player?.routeEfficiency}%</div>
              </div>
              <div className={`bg-${bgColor} p-3 rounded-lg ${isMatched ? `border border-${borderColor}` : ''}`}>
                <span className="text-purple-200 text-xs">Avg Separation</span>
                <div className={`text-lg font-bold text-${accentColor}`}>{player?.separationAverage} yds</div>
              </div>
              <div className={`bg-${bgColor} p-3 rounded-lg ${isMatched ? `border border-${borderColor}` : ''}`}>
                <span className="text-purple-200 text-xs">Catch Radius</span>
                <div className={`text-lg font-bold text-${accentColor}`}>{player?.catchRadius} ft</div>
              </div>
              <div className={`bg-${bgColor} p-3 rounded-lg ${isMatched ? `border border-${borderColor}` : ''}`}>
                <span className="text-purple-200 text-xs">Breakout Age</span>
                <div className={`text-lg font-bold text-${accentColor}`}>{player?.breakoutAge}</div>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-purple-800">
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
              className="border-purple-600 text-purple-200 hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              New Search
            </Button>
            <Button
              onClick={handleShare}
              className="bg-purple-500 hover:bg-purple-600 text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Result
            </Button>
          </div>
        </div>

        {/* Comparison Tabs */}
        <Tabs defaultValue="counting" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 mb-8">
            <TabsTrigger value="counting" className="text-white data-[state=active]:bg-purple-600">
              Counting Stats
            </TabsTrigger>
            <TabsTrigger value="advanced" className="text-white data-[state=active]:bg-purple-600">
              Advanced Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="counting">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <CountingStatsCard player={selectedPlayer} />
              <CountingStatsCard player={matchedPlayer} isMatched={true} />
            </div>
          </TabsContent>

          <TabsContent value="advanced">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <AdvancedStatsCard player={selectedPlayer} />
              <AdvancedStatsCard player={matchedPlayer} isMatched={true} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Similarity Analysis */}
        <Card className="bg-white/10 backdrop-blur-sm border-purple-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-400" />
              Similarity Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">87%</div>
                <div className="text-purple-200">Counting Stats</div>
                <div className="text-sm text-purple-300 mt-1">Fantasy points & volume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">92%</div>
                <div className="text-purple-200">Usage Pattern</div>
                <div className="text-sm text-purple-300 mt-1">Target share & role</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">79%</div>
                <div className="text-purple-200">Physical Profile</div>
                <div className="text-sm text-purple-300 mt-1">Size & athleticism</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">85%</div>
                <div className="text-purple-200">Route Efficiency</div>
                <div className="text-sm text-purple-300 mt-1">Technical skills</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
