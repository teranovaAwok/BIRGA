import { Calendar, MapPin, Clock } from "lucide-react";

const events = [
  {
    id: 1,
    title: '"Maktab ovozi" so\'rovnomasi',
    date: '2026-10-15',
    location: 'Onlayn',
    category: 'So\'rovnoma',
    description: 'Maktab muhiti haqida anonim so\'rovnoma',
  },
  {
    id: 2,
    title: '"Raqamli hurmat" haftaligi',
    date: '2026-11-01',
    location: 'Maktab',
    category: 'Aksiya',
    description: 'Kiberbullingga qarshi tadbirlar haftaligi',
  },
  {
    id: 3,
    title: 'Ijtimoiy Hackathon',
    date: '2027-03-15',
    location: 'Akt zali',
    category: 'Tanlov',
    description: 'Maktab muammolariga yechim topish musobaqasi',
  },
  {
    id: 4,
    title: 'BIRGA Festivali',
    date: '2027-05-20',
    location: 'Maktab hovlisi',
    category: 'Festival',
    description: 'Yillik natijalar ko\'rgazmasi va mukofotlash',
  },
];

export default function EventsPage() {
  return (
    <div className="pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            📅 Tadbirlar
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Yaqinlashayotgan <span className="text-purple-600">tadbirlar</span>
          </h1>
          <p className="text-gray-600">BIRGA loyihasi doirasidagi barcha tadbirlar</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl p-6 shadow-lg card-hover border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-purple-600" />
                  <span>{new Date(event.date).toLocaleDateString('uz-UZ')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-purple-600" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
