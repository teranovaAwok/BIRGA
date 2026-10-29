import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-3">BIR<span className="text-purple-400">GA</span></h3>
            <p className="text-gray-400 text-sm">
              Onlaynda hurmat, hayotda hamjihatlik! Ijtimoiy tashabbuslar platformasi.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Sahifalar</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-purple-400">Haqida</Link></li>
              <li><Link href="/webinar" className="hover:text-purple-400">Vebinarlar</Link></li>
              <li><Link href="/volunteers" className="hover:text-purple-400">Ko'ngillilar</Link></li>
              <li><Link href="/skills" className="hover:text-purple-400">Qobiliyatlar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Aloqa</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2"><Mail size={14} /> birga@maktab.uz</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +998 90 123 45 67</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> Qo'shko'pir, Xorazm</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Hamkorlar</h4>
            <p className="text-gray-400 text-sm">
              "Kelajak" markazlari<br />
              2-sonli maktab<br />
              O'quvchilar Kengashi
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          © 2026 BIRGA loyihasi • Sadullayev Arslon • "Kelajak" markazlari ko'magida
        </div>
      </div>
    </footer>
  );
}
