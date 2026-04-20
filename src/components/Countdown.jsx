import { Clock3 } from 'lucide-react'

function Countdown({ countdownItems }) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/65 p-6 shadow-xl backdrop-blur-sm sm:p-8" data-aos="fade-up">
      <div className="mb-6 flex items-center justify-center gap-2 text-gold">
        <Clock3 size={20} />
        <h2 className="font-serif text-2xl font-semibold text-sage-900">Countdown to June 26, 2026</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
        {countdownItems.map((item) => (
          <div key={item.label} className="rounded-2xl border border-dusty-rose/30 bg-cream/85 px-3 py-4">
            <p className="text-3xl font-bold text-sage-900">{item.value}</p>
            <p className="text-sm uppercase tracking-[0.2em] text-dusty-rose">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Countdown
