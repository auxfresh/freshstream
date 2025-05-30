import { useState, useEffect } from "react";
import { type MatchWithTeams } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, Maximize, Eye } from "lucide-react";

interface VideoPlayerProps {
  match: MatchWithTeams;
}

export default function VideoPlayer({ match }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewerCount, setViewerCount] = useState(match.viewerCount || 0);

  useEffect(() => {
    // Simulate viewer count changes
    const interval = setInterval(() => {
      setViewerCount(prev => {
        const variation = Math.floor(Math.random() * 200) - 100;
        return Math.max(0, prev + variation);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative aspect-video bg-gray-900">
      {/* Stadium background image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        <img 
          src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Football stadium with bright floodlights during night match" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Video Controls Overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center group cursor-pointer" 
        onClick={togglePlayPause}
      >
        <div className="bg-black/50 rounded-full p-6 group-hover:bg-black/70 transition-all">
          {isPlaying ? (
            <Pause className="text-white text-4xl" />
          ) : (
            <Play className="text-white text-4xl ml-1" />
          )}
        </div>
      </div>
      
      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={togglePlayPause}
              className="text-white hover:text-primary transition-colors"
            >
              {isPlaying ? <Pause className="text-xl" /> : <Play className="text-xl" />}
            </Button>
            
            {match.status === "live" && match.matchTime && (
              <span className="text-white font-medium">{match.matchTime}</span>
            )}
            
            <div className="w-64 bg-gray-600 rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-3/4"></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:text-primary transition-colors"
            >
              <Volume2 className="text-lg" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:text-primary transition-colors"
            >
              <Maximize className="text-lg" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Live viewer count */}
      {match.status === "live" && (
        <div className="absolute top-4 right-4 bg-black/70 px-3 py-2 rounded-lg">
          <div className="flex items-center space-x-2">
            <Eye className="text-accent text-sm" />
            <span className="text-white text-sm font-medium">
              {viewerCount.toLocaleString()} watching
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
