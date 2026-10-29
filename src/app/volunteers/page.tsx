import volunteers from "@/data/volunteers.json";
import VolunteerCard from "@/components/VolunteerCard";
import { UserPlus, Target, Heart } from "lucide-react";

export default function VolunteersPage() {
  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            👥 Ko'ngillilar jamoasi
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Faol <span className="text-purple-600">o'quvchilarni</span> toping
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            BIRGA elchilari — maktab hayotini yaxshilashga tayyor yosh liderlar
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <UserPlus className="mx-auto text-purple-600 mb-3" size={40} />
            <div className="text-3xl font-bold text-gray-900">100+</div>
            <div className="text-gray-600">Jami ko'ngillilar</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <Target className="mx-auto text-purple-600 mb-3" size={40} />
            <div className="text-3xl font-bold text-gray-900">37</div>
            <div className="text-gray-600">Faol a'zolar</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <Heart className="mx-auto text-purple-600 mb-3" size={40} />
            <div className="text-3xl font-bold text-gray-900">10</div>
            <div className="text-gray-600">Loyihalar</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sinf guruhlari</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {volunteers.map((group) => (
            <VolunteerCard key={group.id} group={group} />
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Siz ham qo'shiling!</h2>
          <p className="mb-6 text-purple-100">
            5-11 sinf o'quvchilari uchun ochiq. Faqat istak va g'oya kerak!
          </p>
          <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Ariza topshirish
          </button>
        </div>
      </div>
    </div>
  );
}
