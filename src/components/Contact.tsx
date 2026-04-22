export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl shadow-purple-900/5">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Let's Create Something Amazing</h2>
          <p className="text-gray-600">Ready to elevate your brand? Fill out the form below and I will get back to you within 24 hours.</p>
        </div>
        <form className="space-y-6" action="https://formsubmit.co/tyemi66@gmail.com" method="POST">
          <div className="grid md:grid-cols-2 gap-6">
            <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Your Name" />
            <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Your Email" />
          </div>
          <textarea name="message" rows={4} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Tell me about your project..."></textarea>
          <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-lg hover:shadow-lg transition">Send Message</button>
        </form>
      </div>
    </section>
  );
}
