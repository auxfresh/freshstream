import { Card, CardContent } from "@/components/ui/card";
import { Play, Zap, Smartphone } from "lucide-react";

export default function StreamingOptions() {
  const options = [
    {
      icon: Play,
      title: "HD Quality",
      description: "Stream in 1080p resolution with crystal clear picture quality.",
      specs: [
        { label: "Resolution", value: "1920x1080" },
        { label: "Bitrate", value: "6 Mbps" },
        { label: "Latency", value: "~3 seconds" },
      ],
      featured: false,
    },
    {
      icon: Zap,
      title: "Ultra Low Latency",
      description: "Experience near real-time streaming with minimal delay.",
      specs: [
        { label: "Resolution", value: "1280x720" },
        { label: "Bitrate", value: "3 Mbps" },
        { label: "Latency", value: "~500ms" },
      ],
      featured: true,
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Perfect for watching on mobile devices with data savings.",
      specs: [
        { label: "Resolution", value: "854x480" },
        { label: "Bitrate", value: "1.5 Mbps" },
        { label: "Data Usage", value: "~200MB/hour" },
      ],
      featured: false,
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-8">Streaming Options</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option) => {
          const IconComponent = option.icon;
          
          return (
            <Card 
              key={option.title}
              className={`surface border-gray-700 ${option.featured ? "border-primary" : ""}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <IconComponent 
                    className={`text-2xl ${
                      option.title === "HD Quality" ? "text-primary" :
                      option.title === "Ultra Low Latency" ? "text-accent" :
                      "text-secondary"
                    }`}
                  />
                  <h3 className="text-xl font-semibold">{option.title}</h3>
                </div>
                
                <p className="text-gray-400 mb-4">{option.description}</p>
                
                <div className="text-sm text-gray-500">
                  {option.specs.map((spec, index) => (
                    <div key={spec.label} className={`flex justify-between ${index < option.specs.length - 1 ? "mb-2" : ""}`}>
                      <span>{spec.label}:</span>
                      <span>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
