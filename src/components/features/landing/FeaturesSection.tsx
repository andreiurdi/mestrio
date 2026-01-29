import { Shield, Star, MapPin, Clock, DollarSign, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Verified Professionals",
    description: "All workers undergo thorough background checks and verification before joining the platform.",
  },
  {
    icon: Star,
    title: "Real Reviews",
    description: "Read honest feedback from previous customers to make informed hiring decisions.",
  },
  {
    icon: MapPin,
    title: "Local Workers",
    description: "Find professionals in your area who understand your local building codes and requirements.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    description: "Get responses within hours, not days. Most workers reply within 24 hours.",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    description: "Compare quotes from multiple professionals to get the best value for your project.",
  },
  {
    icon: Users,
    title: "Direct Communication",
    description: "Message workers directly through our platform. No middlemen, no delays.",
  },
];

export function FeaturesSection() {
  return (
    <section className="px-6 py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Why choose Mestrio?</h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">We make finding and hiring construction professionals simple, safe, and reliable</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-border hover:border-primary/50 transition-colors">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
