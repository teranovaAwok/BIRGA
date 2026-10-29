import { Calendar, Clock, User, Tag } from "lucide-react";

interface Webinar {
  id: number;
  title: string;
  date: string;
  time: string;
  speaker: string;
  description: string;
  category: string;
  link: string;
}

export default function WebinarCard({ webinar }: { webinar: Webinar }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg card-hover border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <Tag size={14} /> {webinar.category}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">{webinar.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{webinar.description}</p>

      <div className="space-y-2 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-purple-600" />
          <span>{new Date(webinar.date).toLocaleDateString('uz-UZ')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-purple-600" />
          <span>{webinar.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <User size={16} className="text-purple-600" />
          <span>{webinar.speaker}</span>
        </div>
      </div>

      <a
        href={webinar.link}
        className="block w-full bg-purple-600 text-white text-center py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
      >
        Ro'yxatdan o'tish
      </a>
    </div>
  );
}
