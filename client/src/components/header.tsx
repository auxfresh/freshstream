import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Play } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const navigation = [
    { name: "Live Matches", href: "/", active: location === "/" },
    { name: "Teams", href: "/teams", active: location === "/teams" },
    { name: "Schedule", href: "/#schedule", active: false },
  ];

  return (
    <header className="surface border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="client/stream1.html">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Play className="text-primary text-2xl" />
                <span className="text-xl font-bold">Fresh Stream</span>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-6">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`font-medium transition-colors ${
                      item.active
                        ? "text-primary"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button className="bg-primary text-white hover:bg-primary/90 transition-all">
              Subscribe
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-gray-300">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="surface border-gray-700">
                <nav className="flex flex-col space-y-4 mt-4">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={`font-medium transition-colors ${
                          item.active
                            ? "text-primary"
                            : "text-gray-300 hover:text-white"
                        }`}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
