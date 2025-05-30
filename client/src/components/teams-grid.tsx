import { useQuery } from "@tanstack/react-query";
import { type Team } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeamsGrid() {
  const { data: teams, isLoading } = useQuery<Team[]>({
    queryKey: ["/api/teams"],
  });

  if (isLoading) {
    return (
      <section id="teams" className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="surface border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div>
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="text-center">
                      <Skeleton className="h-8 w-8 mx-auto mb-1" />
                      <Skeleton className="h-3 w-12 mx-auto" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="teams" className="mb-12">
      <h2 className="text-3xl font-bold mb-8">Teams</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams?.map((team) => (
          <Card 
            key={team.id} 
            className="surface border-gray-700 hover:border-primary/50 transition-all cursor-pointer hover:transform hover:-translate-y-0.5"
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={team.logo}
                  alt={`${team.name} logo`}
                  className="w-16 h-16 rounded-full object-cover border-2"
                  style={{ borderColor: team.primaryColor }}
                />
                <div>
                  <h3 className="text-xl font-bold">{team.name}</h3>
                  <p className="text-gray-400">{team.league}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-accent">{team.wins}</div>
                  <div className="text-xs text-gray-400">Wins</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-300">{team.draws}</div>
                  <div className="text-xs text-gray-400">Draws</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">{team.losses}</div>
                  <div className="text-xs text-gray-400">Losses</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
