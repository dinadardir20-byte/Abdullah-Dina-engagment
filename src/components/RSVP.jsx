function RSVP({ formData, setFormData, formError, submitted, handleSubmit }) {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/65 p-6 shadow-xl backdrop-blur-sm sm:p-8" data-aos="fade-up">
      <h2 className="mb-4 text-center font-serif text-2xl font-semibold text-sage-900">RSVP</h2>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-4" noValidate>
        <label className="text-sm font-medium text-sage-900" htmlFor="guest-name">
          Guest name
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
          Attendance status
        </label>
        <select
          id="attendance"
          value={formData.attendance}
          onChange={(event) => setFormData((prev) => ({ ...prev, attendance: event.target.value }))}
          className="rounded-xl border border-dusty-rose/40 bg-cream/90 px-4 py-3 outline-none transition focus:border-gold"
        >
          <option value="yes">Yes - Joyfully attending</option>
          <option value="no">No - Regretfully cannot attend</option>
          <option value="maybe">Maybe</option>
        </select>

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
  )
}

export default RSVP
