import { PenTool, Layout, Smartphone } from "lucide-react";

export default function Services() {
  const services = [
    { title: "Logo & Branding", icon: PenTool, description: "Custom logos and complete brand identities that make your business instantly recognizable." },
    { title: "Flyers & Posters", icon: Layout, description: "Eye-catching promotional materials designed to communicate your message and drive sales." },
    { title: "Social Media Management", icon: Smartphone, description: "Engaging content creation and account handling to grow your digital presence and community." },
  ];

  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-900">What I Do Best</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">High-quality services tailored to make your business look professional and attract the right clients.</p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {services.map((service) => (
            <div key={service.title} className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition bg-white">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl mb-6">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
