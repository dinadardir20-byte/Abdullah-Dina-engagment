import { AnimatePresence, motion as Motion } from 'framer-motion'

function Hero({ isOpen, onOpen }) {
  return (
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
                We are so happy to finally celebrate our engagement with the people who mean the most to us.
                You&apos;ve all been such a big part of our lives, and we can&apos;t wait to have you by our
                side as we start this new chapter.
              </p>
            </Motion.div>

            <AnimatePresence>
              {!isOpen && (
                <Motion.button
                  type="button"
                  whileTap={{ scale: 0.92 }}
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.65, rotate: -20 }}
                  transition={{ duration: 0.35 }}
                  onClick={onOpen}
                  className="wax-seal"
                  aria-label="Open the invitation envelope"
                >
                  A & D
                </Motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
