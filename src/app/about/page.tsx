import { Target, Eye, Heart, Shield } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            ℹ️ Loyiha haqida
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            BIRGA <span className="text-purple-600">loyihasi</span>
          </h1>
          <p className="text-gray-600">
            Maktabdagi ijtimoiy muammolarga o'quvchilar boshchiligida amaliy yechim
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <Target className="text-purple-600 mb-3" size={36} />
            <h3 className="text-xl font-bold mb-2">Maqsad</h3>
            <p className="text-gray-600">
              O'quvchilarda vatanparvarlik, mas'uliyat, kreativlik va mustaqil fikrlash qobiliyatlarini shakllantirish.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <Eye className="text-purple-600 mb-3" size={36} />
            <h3 className="text-xl font-bold mb-2">Vazifa</h3>
            <p className="text-gray-600">
              Ijtimoiy, ekologik, madaniy va sport loyihalarini amalga oshirish, ochiq muloqot ko'prigini yaratish.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <Heart className="text-purple-600 mb-3" size={36} />
            <h3 className="text-xl font-bold mb-2">Qadriyatlar</h3>
            <p className="text-gray-600">
              O'zaro hurmat, hamjihatlik, halollik, fidoyilik va jamoa manfaatlari.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <Shield className="text-purple-600 mb-3" size={36} />
            <h3 className="text-xl font-bold mb-2">Tamoyillar</h3>
            <p className="text-gray-600">
              "Tengdosh-tengdoshga" — o'quvchilar o'zini o'zi boshqarish tizimi.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Asoschisi</h2>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl">
              👤
            </div>
            <div>
              <div className="text-xl font-bold">Sadullayev Arslon</div>
              <div className="text-purple-100">Ijtimoiy Tashabbus Koordinatori</div>
              <div className="text-sm text-purple-200">Qo'shko'pir tumani, 2-sonli maktab • 8-"A" sinf</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
