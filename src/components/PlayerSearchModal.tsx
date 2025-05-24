
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface PlayerSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayerSelect: (player: any) => void;
  position: string;
}

// Mock data for demo
const mockPlayers = [
  { name: "2022 Tyler Boyd", team: "CIN", position: "WR", fantasyPoints: 11.2, targets: 78, receptions: 58, yards: 762 },
  { name: "2022 Allen Lazard", team: "GB", position: "WR", fantasyPoints: 9.8, targets: 60, receptions: 40, yards: 513 },
  { name: "2021 Cooper Kupp", team: "LAR", position: "WR", fantasyPoints: 23.1, targets: 191, receptions: 145, yards: 1947 },
  { name: "2022 Josh Jacobs", team: "LV", position: "RB", fantasyPoints: 18.9, targets: 53, receptions: 53, yards: 2053 },
  { name: "2022 Jalen Hurts", team: "PHI", position: "QB", fantasyPoints: 24.8, targets: 0, receptions: 0, yards: 3701 },
  { name: "2022 Travis Kelce", team: "KC", position: "TE", fantasyPoints: 17.1, targets: 150, receptions: 110, yards: 1338 },
];

export const PlayerSearchModal = ({ isOpen, onClose, onPlayerSelect, position }: PlayerSearchModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.team.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlayerClick = (player: any) => {
    onPlayerSelect(player);
    setSearchTerm("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-green-900 border-green-700">
        <DialogHeader>
          <DialogTitle className="text-white">Search Player for {position}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-green-400" />
            <Input
              placeholder="Search by player name or team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 border-green-600 text-white placeholder:text-green-300"
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredPlayers.map((player, index) => (
              <Card
                key={index}
                className="bg-white/5 border-green-600 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={() => handlePlayerClick(player)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white">{player.name}</span>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        {player.team}
                      </Badge>
                      <Badge variant="secondary" className="bg-green-700 text-white">
                        {player.position}
                      </Badge>
                    </div>
                    <div className="text-yellow-400 font-bold">
                      {player.fantasyPoints} PPG
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    {player.position !== "QB" && (
                      <>
                        <div className="text-green-200">
                          <span className="font-medium">Targets:</span> {player.targets}
                        </div>
                        <div className="text-green-200">
                          <span className="font-medium">Catches:</span> {player.receptions}
                        </div>
                      </>
                    )}
                    <div className="text-green-200">
                      <span className="font-medium">Yards:</span> {player.yards}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
