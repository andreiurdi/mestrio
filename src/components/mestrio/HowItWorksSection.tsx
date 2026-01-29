import { Search, MessageSquare, CheckCircle, Shield, Star, MapPin } from "lucide-react";

const features = [
  {
    icon: Search,
    number: "1",
    title: "Search",
    description: "Choose the service you need and enter your location",
  },
  {
    icon: MessageSquare,
    number: "2",
    title: "Message",
    description: "Contact workers directly to discuss your project",
  },
  {
    icon: CheckCircle,
    number: "3",
    title: "Get the job done",
    description: "Hire the right professional for your needs",
  },
  {
    icon: Shield,
    number: "4",
    title: "Verified professionals",
    description: "All workers are verified before joining the platform",
  },
  {
    icon: Star,
    number: "5",
    title: "Real reviews",
    description: "Read honest feedback from previous customers",
  },
  {
    icon: MapPin,
    number: "6",
    title: "Local workers",
    description: "Connect with professionals in your area",
  },
];

export function HowItWorksSection() {
  return (
    <section className="px-6 py-20 bg-accent/5">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How it works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {feature.number}. {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
