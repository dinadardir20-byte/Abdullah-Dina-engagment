import { MapPin } from 'lucide-react'

function Venue() {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/65 p-6 shadow-xl backdrop-blur-sm sm:p-8" data-aos="fade-up">
      <div className="mb-4 flex items-center justify-center gap-2 text-gold">
        <MapPin size={20} />
        <h2 className="font-serif text-2xl font-semibold text-sage-900">Agamy Garden</h2>
      </div>
      <p className="mx-auto mb-6 max-w-2xl text-center text-sage-800">
        Join us in the peaceful beauty of Agamy Garden for an evening filled with love, laughter,
        and unforgettable memories.
      </p>
      <div className="overflow-hidden rounded-2xl border border-dusty-rose/40">
        <iframe
          title="Agamy Garden location"
          src="https://www.google.com/maps?q=Agamy%20Garden&output=embed"
          className="h-72 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <p className="mt-3 text-center text-sm text-sage-700">Alexandria, Egypt</p>
    </section>
  )
}

export default Venue
