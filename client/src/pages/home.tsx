import Header from "@/components/header";
import FeaturedMatch from "@/components/featured-match";
import TeamsGrid from "@/components/teams-grid";
import LiveMatches from "@/components/live-matches";
import MatchSchedule from "@/components/match-schedule";
import StreamingOptions from "@/components/streaming-options";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FeaturedMatch />
        <TeamsGrid />
        <LiveMatches />
        <MatchSchedule />
        <StreamingOptions />
      </div>
      <Footer />
    </div>
  );
}
