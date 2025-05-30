import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { type MatchWithTeams } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Bell } from "lucide-react";

export default function LiveMatches() {
  const { data: liveMatches, isLoading: loadingLive } = useQuery<MatchWithTeams[]>({
    queryKey: ["/api/matches/live"],
  });

  const { data: upcomingMatches, isLoading: loadingUpcoming } = useQuery<MatchWithTeams[]>({
    queryKey: ["/api/matches/upcoming"],
  });

  const isLoading = loadingLive || loadingUpcoming;

  if (isLoading) {
    return (
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Live & Upcoming Matches</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Card key={i} className="surface border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-8 w-16" />
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="w-10 h-10 rounded-full" />
                  </div>
                </div>
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  const allMatches = [...(liveMatches || []), ...(upcomingMatches || [])];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-8">Live & Upcoming Matches</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {allMatches.map((match) => (
          <Card 
            key={match.id} 
            className={`surface border-gray-700 ${match.status === "live" ? "border-red-500/30" : ""}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Badge className={match.status === "live" ? "bg-red-600 text-white" : "bg-gray-600 text-white"}>
                  {match.status === "live" && (
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                  )}
                  {match.status === "live" ? "LIVE" : "UPCOMING"}
                </Badge>
                <span className="text-sm text-gray-400">
                  {match.status === "live" ? match.matchTime : 
                   new Date(match.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={match.homeTeam.logo}
                    alt={`${match.homeTeam.name} logo`}
                    className="w-10 h-10 rounded-full object-cover border"
                    style={{ borderColor: match.homeTeam.primaryColor }}
                  />
                  <span className="font-semibold">{match.homeTeam.name}</span>
                </div>
                
                <div className="text-xl font-bold text-accent">
                  {match.status === "live" && match.homeScore !== null && match.awayScore !== null
                    ? `${match.homeScore}-${match.awayScore}`
                    : "VS"
                  }
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="font-semibold">{match.awayTeam.name}</span>
                  <img
                    src={match.awayTeam.logo}
                    alt={`${match.awayTeam.name} logo`}
                    className="w-10 h-10 rounded-full object-cover border"
                    style={{ borderColor: match.awayTeam.primaryColor }}
                  />
                </div>
              </div>
              
              {match.status === "live" ? (
                <Link href={`/match/${match.id}`}>
                  <Button className="w-full bg-primary text-white hover:bg-primary/90 transition-all">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Live
                  </Button>
                </Link>
              ) : (
                <Button 
                  variant="secondary" 
                  className="w-full bg-gray-700 text-white hover:bg-gray-600 transition-all"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Set Reminder
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
