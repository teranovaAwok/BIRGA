import webinars from "@/data/webinars.json";
import WebinarCard from "@/components/WebinarCard";
import { Video, Bell } from "lucide-react";

export default function WebinarPage() {
  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🎥 Ota-onalar uchun vebinarlar
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bilimli ota-ona — <span className="text-purple-600">baxtli farzand</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mutaxassislar bilan onlayn uchrashuvlar, amaliy maslahatlar va zamonaviy tarbiya haqida
          </p>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl p-8 text-white mb-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Bell size={40} />
            <div>
              <h3 className="text-xl font-bold">Keyingi vebinar</h3>
              <p className="text-purple-100">15-noyabr, 19:00 — "Farzandingiz va Internet xavfsizligi"</p>
            </div>
          </div>
          <button className="bg-white text-purple-700 px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Ro'yxatdan o'tish
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webinars.map((webinar) => (
            <WebinarCard key={webinar.id} webinar={webinar} />
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Video className="text-purple-600" /> Vebinar mavzulari
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Kiberbulling va onlayn xavfsizlik",
              "O'smirlik davri psixologiyasi",
              "Raqamli vaqt boshqaruvi",
              "Farzand bilan ochiq muloqot",
              "Ijtimoiy tarmoqlar ta'siri",
              "Maktabdagi muammolarni birgalikda hal qilish",
            ].map((topic, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                <span className="text-gray-700">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
