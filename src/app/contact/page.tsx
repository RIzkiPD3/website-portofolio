export default function ContactPage() {
    return (
      <section className="min-h-screen bg-black text-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact
          </h1>
  
          {/* Description */}
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            Interested in working together or just want to say hi?
            Feel free to reach out. I’m always open to discussing new
            opportunities and ideas.
          </p>
  
          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-3 text-white focus:outline-none focus:border-white"
              />
            </div>
  
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-3 text-white focus:outline-none focus:border-white"
              />
            </div>
  
            <div>
              <label className="block mb-2 text-sm text-gray-300">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-3 text-white focus:outline-none focus:border-white resize-none"
              />
            </div>
  
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    );
  }
  