import { useEffect, useMemo, useState } from 'react'
import { motion as Motion, useScroll, useTransform } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { CalendarDays, Clock3, MapPin } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons'

const EVENT_DATE = new Date('2026-06-26T00:00:00')

const timelineEvents = [
  { time: '5:30 PM', title: 'Guest Arrival', detail: 'Welcome drinks and floral garden reception.' },
  { time: '6:15 PM', title: 'Ring Exchange', detail: 'A heartfelt moment with family and friends.' },
  { time: '7:00 PM', title: 'Dinner & Toasts', detail: 'A joyful meal and loving speeches.' },
  { time: '8:30 PM', title: 'Music & Celebration', detail: 'Dancing under the evening lights.' },
]

const initialFormState = {
  name: '',
  attendance: 'yes',
  note: '',
}

const getCountdown = () => {
  const diff = EVENT_DATE.getTime() - Date.now()
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds }
}

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [countdown, setCountdown] = useState(() => getCountdown())
  const [hearts, setHearts] = useState([])
  const [formData, setFormData] = useState(initialFormState)
  const [formError, setFormError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { scrollY } = useScroll()
  const backLayerY = useTransform(scrollY, [0, 1500], [0, -160])
  const midLayerY = useTransform(scrollY, [0, 1500], [0, -260])

  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 60,
    })
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown())
    }, 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const onClick = (event) => {
      const id = `${Date.now()}-${Math.random()}`
      const newHeart = {
        id,
        x: event.clientX,
        y: event.clientY,
      }

      setHearts((prev) => [...prev, newHeart])
      window.setTimeout(() => {
        setHearts((prev) => prev.filter((heart) => heart.id !== id))
      }, 1200)
    }

    window.addEventListener('click', onClick)
    return () => window.removeEventListener('click', onClick)
  }, [])

  const countdownItems = useMemo(
    () => [
      { label: 'Days', value: countdown.days },
      { label: 'Hours', value: countdown.hours },
      { label: 'Minutes', value: countdown.minutes },
      { label: 'Seconds', value: countdown.seconds },
    ],
    [countdown],
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formData.name.trim().length < 2) {
      setFormError('Please enter your full name.')
      setSubmitted(false)
      return
    }

    setFormError('')
    setSubmitted(true)
    setFormData(initialFormState)
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream text-sage-900">
      <Motion.div className="pointer-events-none fixed inset-0 -z-10">
        <Motion.div style={{ y: backLayerY }} className="floral-layer floral-layer-back" />
        <Motion.div style={{ y: midLayerY }} className="floral-layer floral-layer-front" />
      </Motion.div>

      {hearts.map((heart) => (
        <Motion.div
          key={heart.id}
          initial={{ opacity: 1, scale: 0.7, y: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -65 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="pointer-events-none fixed z-50 text-gold"
          style={{ left: heart.x - 8, top: heart.y - 8 }}
          aria-hidden="true"
        >
          <FontAwesomeIcon icon={faHeart} />
        </Motion.div>
      ))}

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 pb-20 pt-8 sm:px-8">
        <section className="flex min-h-[90vh] items-center justify-center" aria-label="Invitation envelope">
          <div className="w-full max-w-xl text-center" data-aos="zoom-in">
            <p className="font-calligraphy text-4xl text-dusty-rose sm:text-5xl">Abdullah & Dina</p>
            <div className="mt-5 rounded-3xl border border-gold/30 bg-white/55 p-6 shadow-2xl backdrop-blur-sm sm:p-9">
              <div className="envelope-shell mx-auto max-w-md rounded-2xl bg-cream p-4 shadow-xl">
                <Motion.div
                  animate={isOpen ? { rotateX: -145, y: -40 } : { rotateX: 0, y: 0 }}
                  transition={{ type: 'spring', stiffness: 80, damping: 12 }}
                  className="envelope-flap"
                />

                <Motion.div
                  animate={isOpen ? { y: -100, opacity: 1 } : { y: 20, opacity: 0.9 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="invitation-card"
                >
                  <p className="font-calligraphy text-4xl text-dusty-rose">You are invited</p>
                  <h1 className="mt-2 font-serif text-4xl font-semibold text-sage-900">Abdullah & Dina</h1>
                  <p className="mt-4 text-sm leading-relaxed text-sage-800 sm:text-base">
                    We are so happy to finally celebrate our engagement with the people who mean the most
                    to us. You&apos;ve all been such a big part of our lives, and we can&apos;t wait to have
                    you by our side as we start this new chapter.
                  </p>
                </Motion.div>

                {!isOpen && (
                  <Motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setIsOpen(true)}
                    className="wax-seal"
                    aria-label="Open the invitation envelope"
                  >
                    A & D
                  </Motion.button>
                )}
              </div>
            </div>
          </div>
        </section>

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
          <p className="mt-3 text-center text-sm text-sage-700">
            <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-gold" />
            Alexandria, Egypt
          </p>
        </section>

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

        <section className="rounded-3xl border border-white/60 bg-white/65 p-6 shadow-xl backdrop-blur-sm sm:p-8" data-aos="fade-up">
          <h2 className="mb-4 text-center font-serif text-2xl font-semibold text-sage-900">RSVP</h2>
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-4" noValidate>
            <label className="text-sm font-medium text-sage-900" htmlFor="guest-name">
              Full Name
            </label>
            <input
              id="guest-name"
              type="text"
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              className="rounded-xl border border-dusty-rose/40 bg-cream/90 px-4 py-3 outline-none transition focus:border-gold"
              placeholder="Enter your name"
              required
            />

            <label className="text-sm font-medium text-sage-900" htmlFor="attendance">
              Attendance
            </label>
            <select
              id="attendance"
              value={formData.attendance}
              onChange={(event) => setFormData((prev) => ({ ...prev, attendance: event.target.value }))}
              className="rounded-xl border border-dusty-rose/40 bg-cream/90 px-4 py-3 outline-none transition focus:border-gold"
            >
              <option value="yes">Joyfully attending</option>
              <option value="no">Regretfully cannot attend</option>
            </select>

            <label className="text-sm font-medium text-sage-900" htmlFor="note">
              Message (Optional)
            </label>
            <textarea
              id="note"
              rows="4"
              value={formData.note}
              onChange={(event) => setFormData((prev) => ({ ...prev, note: event.target.value }))}
              className="rounded-xl border border-dusty-rose/40 bg-cream/90 px-4 py-3 outline-none transition focus:border-gold"
              placeholder="Leave Abdullah & Dina a sweet note"
            />

            {formError && <p className="text-sm text-red-600">{formError}</p>}
            {submitted && <p className="text-sm text-sage-800">Thank you! Your RSVP has been recorded.</p>}

            <button
              type="submit"
              className="rounded-xl bg-sage-green px-5 py-3 font-semibold text-white transition hover:brightness-95"
            >
              Send RSVP
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
