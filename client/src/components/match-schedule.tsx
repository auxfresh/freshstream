import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { type MatchWithTeams } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";

export default function MatchSchedule() {
  const { data: matches, isLoading } = useQuery<MatchWithTeams[]>({
    queryKey: ["/api/matches"],
  });

  if (isLoading) {
    return (
      <section id="schedule" className="mb-12">
        <h2 className="text-3xl font-bold mb-8">This Week's Schedule</h2>
        <Card className="surface overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    {["Date", "Time", "Match", "Competition", "Status"].map((header) => (
                      <th key={header} className="text-left py-4 px-6 font-semibold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {[...Array(3)].map((_, i) => (
                    <tr key={i}>
                      <td className="py-4 px-6"><Skeleton className="h-4 w-16" /></td>
                      <td className="py-4 px-6"><Skeleton className="h-4 w-12" /></td>
                      <td className="py-4 px-6"><Skeleton className="h-4 w-48" /></td>
                      <td className="py-4 px-6"><Skeleton className="h-4 w-24" /></td>
                      <td className="py-4 px-6"><Skeleton className="h-6 w-20" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="schedule" className="mb-12">
      <h2 className="text-3xl font-bold mb-8">This Week's Schedule</h2>
      
      <Card className="surface overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold">Date</th>
                  <th className="text-left py-4 px-6 font-semibold">Time</th>
                  <th className="text-left py-4 px-6 font-semibold">Match</th>
                  <th className="text-left py-4 px-6 font-semibold">Competition</th>
                  <th className="text-left py-4 px-6 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {matches?.map((match) => {
                  const matchDate = new Date(match.startTime);
                  
                  const getStatusBadge = () => {
                    switch (match.status) {
                      case "live":
                        return (
                          <Badge className="bg-red-600 text-white">
                            <span className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                            Live Now
                          </Badge>
                        );
                      case "upcoming":
                        return <Badge className="bg-gray-600 text-white">Upcoming</Badge>;
                      case "finished":
                        return <Badge className="bg-green-600 text-white">Finished</Badge>;
                      default:
                        return <Badge className="bg-accent text-black">Available</Badge>;
                    }
                  };

                  const isPsgInterMatch = match.homeTeam.name === "Paris Saint-Germain" && match.awayTeam.name === "Inter Milan";

                  return (
                    <tr key={match.id} className="hover:bg-gray-800 transition-colors">
                      <td className="py-4 px-6 text-gray-300">
                        {matchDate.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        {matchDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <img
                              src={match.homeTeam.logo}
                              alt={`${match.homeTeam.name} logo`}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span>{match.homeTeam.name}</span>
                          </div>
                          <span className="text-gray-500">vs</span>
                          <div className="flex items-center space-x-2">
                            <span>{match.awayTeam.name}</span>
                            <img
                              src={match.awayTeam.logo}
                              alt={`${match.awayTeam.name} logo`}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">{match.competition}</td>
                      <td className="py-4 px-6">{getStatusBadge()}</td>
                      <td className="py-4 px-6">
                        {isPsgInterMatch && match.status === "live" && (
                          <Link href={`/match/${match.id}`}>
                            <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
                              <Play className="w-3 h-3 mr-1" />
                              Watch Live
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
