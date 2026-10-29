import Hero from "@/components/Hero";
import Link from "next/link";
import { BookOpen, Users, Calendar, Award } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Ota-onalar vebinari",
      desc: "Mutaxassislar bilan onlayn suhbatlar va amaliy maslahatlar",
      link: "/webinar",
    },
    {
      icon: Users,
      title: "Ko'ngillilar jamoasi",
      desc: "Faol o'quvchilarni toping va jamoaga qo'shiling",
      link: "/volunteers",
    },
    {
      icon: Calendar,
      title: "Tadbirlar",
      desc: "Hackathon, festival va ijtimoiy aksiyalar",
      link: "/events",
    },
    {
      icon: Award,
      title: "Qobiliyatlar",
      desc: "Liderlik, jamoaviy ish va raqamli ko'nikmalar",
      link: "/skills",
    },
  ];

  return (
    <>
      <Hero />

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Platforma <span className="text-purple-600">imkoniyatlari</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              BIRGA — o'quvchilar, ota-onalar va o'qituvchilar uchun yagona ijtimoiy tashabbus platformasi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Link key={idx} href={feature.link} className="block">
                <div className="bg-white p-6 rounded-2xl shadow-lg card-hover border border-gray-100 h-full">
                  <feature.icon className="text-purple-600 mb-4" size={36} />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            "Men bir o'zim hammani o'zgartira olmayman. Lekin har bir o'quvchining g'oyasini eshitib, ularni bir jamoaga birlashtira olaman."
          </h2>
          <p className="text-purple-700 font-semibold">
            — Sadullayev Arslon, Ijtimoiy Tashabbus Koordinatori
          </p>
        </div>
      </section>
    </>
  );
}
