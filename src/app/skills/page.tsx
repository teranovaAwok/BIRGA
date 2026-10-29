import skills from "@/data/skills.json";
import SkillCard from "@/components/SkillCard";
import { GraduationCap, Star } from "lucide-react";

export default function SkillsPage() {
  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🎓 Foydali qobiliyatlar
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Kelajak <span className="text-purple-600">lideri</span> bo'ling
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            BIRGA platformasi orqali rivojlantirishingiz mumkin bo'lgan ko'nikmalar
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <GraduationCap className="text-purple-600" /> Rivojlantirish dasturi
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Liderlik treninglari", desc: "Har oy 1 marta" },
              { title: "Debat mashg'ulotlari", desc: "Haftada 1 marta" },
              { title: "Loyiha boshqaruvi", desc: "Amaliy mashqlar" },
              { title: "Konfliktlarni hal qilish", desc: "Seminars" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                <Star className="text-purple-600 flex-shrink-0" size={20} />
                <div>
                  <div className="font-semibold text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
