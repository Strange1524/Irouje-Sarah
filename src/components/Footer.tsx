import { MessageCircle, Phone, Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 text-center">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <h3 className="text-2xl font-bold mb-6 tracking-wider">SARAH<span className="text-blue-600">.</span></h3>
        <div className="flex space-x-6 mb-8">
          <a href="https://wa.me/2348109295400" target="_blank" rel="noopener noreferrer" title="WhatsApp" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-500 transition relative group">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-10 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">WhatsApp</span>
          </a>
          <a href="tel:08109295400" title="Contact" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition relative group">
            <Phone className="w-5 h-5" />
            <span className="absolute -top-10 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">Contact</span>
          </a>
          <a href="https://docs.google.com/presentation/d/12Z32SRmj5TbWTCV-uZGt_vdTgPa49gi2/edit?usp=drivesdk&ouid=108576303938066101334&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" title="Portfolio" className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition relative group">
            <Briefcase className="w-5 h-5" />
            <span className="absolute -top-10 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">Portfolio</span>
          </a>
        </div>
        <div className="w-full border-t border-gray-800 pt-8 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Irouje Sarah Temitope. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
