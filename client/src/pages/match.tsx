import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type MatchWithTeams } from "@shared/schema";
import Header from "@/components/header";
import Footer from "@/components/footer";
import VideoPlayer from "@/components/video-player";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Match() {
  const { id } = useParams();
  
  const { data: match, isLoading } = useQuery<MatchWithTeams>({
    queryKey: ["/api/matches", id],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-[400px] w-full rounded-2xl" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="surface border-gray-700">
            <CardContent className="p-6 text-center">
              <h1 className="text-2xl font-bold mb-4">Match Not Found</h1>
              <p className="text-gray-400">The requested match could not be found.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-6">
          {match.status === "live" && (
            <Badge className="bg-red-600 text-white">
              <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
              LIVE
            </Badge>
          )}
          <h1 className="text-3xl font-bold">
            {match.homeTeam.name} vs {match.awayTeam.name}
          </h1>
        </div>

        <Card className="surface rounded-2xl overflow-hidden shadow-2xl mb-8">
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
                {match.status === "live" && match.matchTime && (
                  <div className="text-accent font-medium">{match.matchTime}</div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
