import { useSiteContext } from "../context/SiteContext";

export default function About() {
  const { siteData } = useSiteContext();

  return (
    <section id="about" className="py-20 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">About Me</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {siteData.about.text1}
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {siteData.about.text2}
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">My Expertise</h3>
          <div className="flex flex-wrap gap-3">
            {['Logo Design', 'Flyer & Poster Design', 'Social Media Graphics', 'Brand Identity', 'Content Creation', 'Social Media Management'].map((skill) => (
              <span key={skill} className="bg-gray-50 border border-gray-200 text-blue-600 px-4 py-2 rounded-full font-medium shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
