import { MapPin } from 'lucide-react';

export function Location() {
  const address = 'Print Vision printing press, C44G+GPM, Dhuddi Wala, Faisalabad, Pakistan';
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="py-16 sm:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-bold">
            Visit Our Office
          </h2>
          <p className="text-muted-foreground mt-4">
            We are located in the heart of Faisalabad's printing hub. Come visit us to discuss your project in person.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                <p className="font-semibold text-lg">{address}</p>
              </div>
          </div>
        </div>
        <div className="mt-8 rounded-lg overflow-hidden shadow-xl border">
          <iframe
            width="100%"
            height="450"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={embedUrl}
            className='border-0'
          >
          </iframe>
        </div>
      </div>
    </section>
  );
}
