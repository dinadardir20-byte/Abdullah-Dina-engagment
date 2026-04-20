import { useEffect, useMemo, useState } from 'react'
import { Heart, MapPinHouse } from 'lucide-react'
import { motion as Motion, useScroll, useTransform } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Venue from './components/Venue'
import Timeline from './components/Timeline'
import RSVP from './components/RSVP'

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
          style={{ left: heart.x - 12, top: heart.y - 12 }}
          aria-hidden="true"
        >
          <Heart size={18} fill="currentColor" />
        </Motion.div>
      ))}

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 pb-20 pt-8 sm:px-8">
        <Hero isOpen={isOpen} onOpen={() => setIsOpen(true)} />
        <Countdown countdownItems={countdownItems} />
        <Venue />
        <Timeline timelineEvents={timelineEvents} />
        <RSVP
          formData={formData}
          setFormData={setFormData}
          formError={formError}
          submitted={submitted}
          handleSubmit={handleSubmit}
        />
      </main>

      <p className="fixed bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 text-xs text-sage-800 shadow-lg backdrop-blur-sm">
        <MapPinHouse size={14} className="text-gold" />
        Agamy Garden • June 26, 2026
      </p>
    </div>
  )
}

export default App
