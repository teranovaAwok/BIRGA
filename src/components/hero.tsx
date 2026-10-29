import Link from "next/link";
import { ArrowRight, Users, Lightbulb, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="gradient-bg text-white pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
            🎯 Ijtimoiy Tashabbus Koordinatori
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            BIR<span className="text-purple-200">GA</span>
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-purple-100">
            Onlaynda hurmat, hayotda hamjihatlik!
          </p>
          <p className="text-lg text-purple-200 mb-8">
            O'quvchilar g'oyasi + jamoaviy harakat + foydali texnologiya
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link
              href="/volunteers"
              className="bg-white text-purple-700 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2"
            >
              Ko'ngilli bo'lish <ArrowRight size={18} />
            </Link>
            <Link
              href="/webinar"
              className="bg-white/20 backdrop-blur-sm border-2 border-white/50 px-8 py-3 rounded-full font-bold hover:bg-white/30 transition-colors"
            >
              Vebinarlarga qo'shilish
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <Users className="mx-auto mb-3" size={32} />
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm text-purple-200">Faol o'quvchi</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <Lightbulb className="mx-auto mb-3" size={32} />
              <div className="text-3xl font-bold">30+</div>
              <div className="text-sm text-purple-200">G'oyalar</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
              <Heart className="mx-auto mb-3" size={32} />
              <div className="text-3xl font-bold">4</div>
              <div className="text-sm text-purple-200">Bosqichli reja</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
