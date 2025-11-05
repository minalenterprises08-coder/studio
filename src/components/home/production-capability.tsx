import { CheckCircle } from "lucide-react";
import Image from "next/image";

const capabilities = [
    { text: "A well-maintained, technology & automation-centric Production Plant managed by an experienced & skilled workforce." },
    { text: "Capable of delivering 50K inlay cards, and 500K labels & stickers per day with superior quality & results." },
    { text: "We work in accordance with the 'Right First Time Principle' to deliver the level of quality we commit to our customers." },
    { text: "Our plant is scheduled to be maintained preventively to deliver an uninterrupted supply of products & services to our valued business partners." },
    { text: "A well-structured & developed Quality Assurance Criteria is applied from the start of the product design phase to assure a quality experience for our customers." }
];

export function ProductionCapability() {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg order-last md:order-first">
            <Image
              src="https://images.unsplash.com/photo-1563784152347-9a09325a472a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFjaGluZXJ5fGVufDB8fHx8MTc2MjE4MjgxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Industrial machinery at Minal Enterprises production plant for offset printing"
              fill
              className="object-cover"
              data-ai-hint="industrial machinery"
            />
          </div>
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Our Production Capability
            </h2>
            <ul className="mt-6 space-y-4">
                {capabilities.map((cap, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                        <span className="text-muted-foreground">{cap.text}</span>
                    </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
