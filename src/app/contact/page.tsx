"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Xabaringiz yuborildi! Tez orada javob beramiz.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            ✉️ Aloqa
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Biz bilan <span className="text-purple-600">bog'laning</span>
          </h1>
          <p className="text-gray-600">Savol, taklif yoki g'oyalaringizni yuboring</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Mail className="text-purple-600" />
              </div>
              <div>
                <div className="font-semibold">Email</div>
                <div className="text-gray-600 text-sm">birga@maktab.uz</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Phone className="text-purple-600" />
              </div>
              <div>
                <div className="font-semibold">Telefon</div>
                <div className="text-gray-600 text-sm">+998 90 123 45 67</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="text-purple-600" />
              </div>
              <div>
                <div className="font-semibold">Manzil</div>
                <div className="text-gray-600 text-sm">Qo'shko'pir tumani, 2-sonli maktab</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 space-y-4">
            <input
              type="text"
              placeholder="Ismingiz"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
            <textarea
              placeholder="Xabaringiz"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              Yuborish <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
