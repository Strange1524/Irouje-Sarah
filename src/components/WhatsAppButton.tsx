import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2348109295400"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all z-50 flex items-center justify-center group"
      title="Chat with AI Assistant"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-16 bg-white text-green-600 px-3 py-1 rounded-full shadow-md text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        AI Assistant
      </span>
    </a>
  );
}
