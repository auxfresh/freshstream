import { Play } from "lucide-react";
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const competitions = [
    "Premier League",
    "Champions League", 
    "La Liga",
    "Serie A"
  ];

  const support = [
    "Help Center",
    "Contact Us",
    "Technical Issues",
    "System Status"
  ];

  const socialLinks = [
    { icon: FaTwitter, href: "https://freshhub.netlify.app/stream.html" },
    { icon: FaFacebook, href: "#" },
    { icon: FaInstagram, href: "#" },
    { icon: FaYoutube, href: "#" },
  ];

  return (
    <footer className="surface border-t border-gray-800 mt-16">
               <div className="flex items-center space-x-4">
            <Button className="bg-primary text-white hover:bg-primary/90 transition-all">
              Subscribe
            </Button>
            
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Play className="text-primary text-xl" />
              <span className="text-lg font-bold">FootStream</span>
            </div>
            <p className="text-gray-400 text-sm">
              The ultimate destination for live football streaming with HD quality and ultra-low latency.
            </p>
                      <div className="flex items-center space-x-4">
            <Button className="bg-primary text-white hover:bg-primary/90 transition-all">
              Subscribe
            </Button>
            
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Competitions</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {competitions.map((competition) => (
                <li key={competition}>
                  <a href="#" className="hover:text-white transition-colors">
                    {competition}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {support.map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href} 
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <IconComponent className="text-xl" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 FootStream. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
