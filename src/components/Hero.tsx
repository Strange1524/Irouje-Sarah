import { motion } from "framer-motion";
import { useSiteContext } from "../context/SiteContext";

export default function Hero() {
  const { siteData } = useSiteContext();

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content */}
        <div className="text-center md:text-left z-10 w-full pt-10 md:pt-0">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4"
          >
            {siteData.hero.role}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6"
          >
            {siteData.hero.name.split(' ').slice(0, -1).join(' ')} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {siteData.hero.name.split(' ').slice(-1)}
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg mx-auto md:mx-0"
          >
            {siteData.hero.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <a href="#portfolio" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 hover:shadow-lg transition">View Portfolio</a>
            <a href="#contact" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition">Hire Me</a>
          </motion.div>
        </div>

        {/* Right Side: Image */}
        {siteData.hero.image && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative flex justify-center items-center mt-12 md:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-50 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
            <img 
              src={siteData.hero.image} 
              alt="Hero Portrait" 
              className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] object-cover rounded-[3rem] shadow-2xl border-4 border-white"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}
