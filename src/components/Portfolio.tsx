import { useSiteContext } from "../context/SiteContext";

export default function Portfolio() {
  const { siteData } = useSiteContext();
  const projects = siteData.portfolio;

  return (
    <section id="portfolio" className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Featured Projects</h2>
          <p className="text-gray-600">A selection of my recent design work.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project: any) => (
            <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition">
              <img src={project.image} alt={project.title} className="w-full h-60 object-cover" />
              <div className="p-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{project.category}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
