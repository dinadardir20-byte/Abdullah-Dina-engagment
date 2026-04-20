import { motion as Motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'

function Timeline({ timelineEvents }) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/65 p-6 shadow-xl backdrop-blur-sm sm:p-8" data-aos="fade-up">
      <div className="mb-6 flex items-center justify-center gap-2 text-gold">
        <CalendarDays size={20} />
        <h2 className="font-serif text-2xl font-semibold text-sage-900">Engagement Timeline</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {timelineEvents.map((event, index) => (
          <Motion.article
            key={event.title}
            whileHover={{ rotateX: -4, rotateY: index % 2 === 0 ? 4 : -4, y: -6 }}
            transition={{ duration: 0.3 }}
            className="timeline-card rounded-2xl border border-dusty-rose/30 bg-cream/90 p-5 shadow-lg"
            data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dusty-rose">{event.time}</p>
            <h3 className="mt-2 text-xl font-semibold text-sage-900">{event.title}</h3>
            <p className="mt-2 text-sage-800">{event.detail}</p>
          </Motion.article>
        ))}
      </div>
    </section>
  )
}

export default Timeline
