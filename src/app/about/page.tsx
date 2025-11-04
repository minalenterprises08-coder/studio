import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold">
              About Minal Enterprises
            </h1>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Established in 2008, Minal Enterprises soon became a trusted
                destination for branded packaging, trim, and offset printing
                solutions. We serve organizations dedicated to supplying brand
                concepts, graphics, products, and solutions to all partners in
                the retail supply chain.
              </p>
              <p>
                Our experienced service and production teams work with clients
                to provide cost-effective & quality-oriented solutions from
                concepts to execution.
              </p>
              <p>
                Since our start, we have been driven to help our clients build
                brand equity and customer loyalty through quality, consistency,
                and alignment with their objectives. Our mission and vision are
                built on the premise that our client's goals serve as the
                results we aim to achieve.
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
             <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwcmludGluZyUyMHByZXNzfGVufDB8fHx8MTc2MjE3NjY0NHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Minal Enterprises team working in the print shop"
                fill
                className="object-cover"
                data-ai-hint="printing press"
              />
          </div>
        </div>
      </div>
    </div>
  );
}
