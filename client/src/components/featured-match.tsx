import { useQuery } from "@tanstack/react-query";
import { type MatchWithTeams } from "@shared/schema";
import VideoPlayer from "./video-player";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeaturedMatch() {
  const { data: match, isLoading } = useQuery<MatchWithTeams>({
    queryKey: ["/api/matches/featured"],
  });

  if (isLoading) {
    return (
      <section className="mb-12">
        <div className="flex items-center space-x-3 mb-6">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </section>
    );
  }

  if (!match) {
    return (
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Match</h2>
        <Card className="surface border-gray-700">
          <CardContent className="p-6 text-center">
            <p className="text-gray-400">No featured match available</p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="live" className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        {match.status === "live" && (
          <Badge className="bg-red-600 text-white">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            LIVE
          </Badge>
        )}
        <h2 className="text-3xl font-bold">Featured Match</h2>
      </div>
      
      <Card className="surface rounded-2xl overflow-hidden shadow-2xl">
        <VideoPlayer match={match} />
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <img
                  src={match.homeTeam.logo}
                  alt={`${match.homeTeam.name} logo`}
                  className="w-12 h-12 rounded-full object-cover border-2"
                  style={{ borderColor: match.homeTeam.primaryColor }}
                />
                <span className="font-semibold text-lg">{match.homeTeam.name}</span>
              </div>
              
              <div className="text-2xl font-bold text-accent">
                {match.homeScore !== null && match.awayScore !== null 
                  ? `${match.homeScore} - ${match.awayScore}`
                  : "VS"
                }
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-lg">{match.awayTeam.name}</span>
                <img
                  src={match.awayTeam.logo}
                  alt={`${match.awayTeam.name} logo`}
                  className="w-12 h-12 rounded-full object-cover border-2"
                  style={{ borderColor: match.awayTeam.primaryColor }}
                />
              </div>
            </div>
            
            <div className="text-sm text-gray-400 text-right">
              <div>{match.venue}</div>
              <div>{match.competition}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
