import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayerSearchModal } from "./PlayerSearchModal";
import { ArrowLeft, Users } from "lucide-react";

interface RosterBuilderProps {
  onPlayerSelect: (player: any) => void;
  onBack: () => void;
}

interface RosterSpot {
  position: string;
  player?: any;
  required: boolean;
}

export const RosterBuilder = ({ onPlayerSelect, onBack }: RosterBuilderProps) => {
  const [roster, setRoster] = useState<RosterSpot[]>([
    { position: "QB", required: true },
    { position: "RB1", required: true },
    { position: "RB2", required: true },
    { position: "WR1", required: true },
    { position: "WR2", required: true },
    { position: "TE", required: true },
    { position: "FLEX", required: true },
    { position: "D/ST", required: true },
    { position: "K", required: true },
    { position: "Bench 1", required: false },
    { position: "Bench 2", required: false },
    { position: "Bench 3", required: false },
  ]);

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>("");

  const handlePositionClick = (position: string) => {
    setSelectedPosition(position);
    setSearchModalOpen(true);
  };

  const handlePlayerAssign = (player: any) => {
    setRoster(prev => prev.map(spot => 
      spot.position === selectedPosition 
        ? { ...spot, player } 
        : spot
    ));
    setSearchModalOpen(false);
  };

  const handleFindSimilar = (player: any) => {
    onPlayerSelect(player);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-purple-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-white">Build Your Roster</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Starters */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-purple-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Starting Lineup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {roster.filter(spot => spot.required).map((spot, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-purple-600 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => handlePositionClick(spot.position)}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-purple-400 border-purple-400">
                        {spot.position}
                      </Badge>
                      {spot.player ? (
                        <div className="text-white">
                          <span className="font-semibold">{spot.player.name}</span>
                          <span className="text-purple-200 ml-2">({spot.player.team})</span>
                        </div>
                      ) : (
                        <span className="text-purple-200">Click to add player</span>
                      )}
                    </div>
                    {spot.player && (
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFindSimilar(spot.player);
                        }}
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                      >
                        Find Similar
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Bench */}
          <div>
            <Card className="bg-white/10 backdrop-blur-sm border-purple-700">
              <CardHeader>
                <CardTitle className="text-white">Bench</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {roster.filter(spot => !spot.required).map((spot, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-purple-600 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => handlePositionClick(spot.position)}
                  >
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-purple-300 border-purple-300 text-xs">
                        {spot.position}
                      </Badge>
                      {spot.player ? (
                        <div className="text-white text-sm">
                          <span className="font-semibold">{spot.player.name}</span>
                        </div>
                      ) : (
                        <span className="text-purple-200 text-sm">Empty</span>
                      )}
                    </div>
                    {spot.player && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFindSimilar(spot.player);
                        }}
                        className="text-purple-400 hover:bg-white/10 text-xs"
                      >
                        Find
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <PlayerSearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onPlayerSelect={handlePlayerAssign}
          position={selectedPosition}
        />
      </div>
    </div>
  );
};
