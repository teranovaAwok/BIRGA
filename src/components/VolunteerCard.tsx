import { Users, CheckCircle, FolderKanban } from "lucide-react";

interface Volunteer {
  id: number;
  name: string;
  members: number;
  activeMembers: number;
  projects: number;
  description: string;
  status: string;
}

export default function VolunteerCard({ group }: { group: Volunteer }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg card-hover border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          group.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
        }`}>
          {group.status === "active" ? "Faol" : "Kutilmoqda"}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4">{group.description}</p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <Users size={20} className="mx-auto mb-1 text-purple-600" />
          <div className="font-bold text-lg">{group.members}</div>
          <div className="text-xs text-gray-500">A'zolar</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <CheckCircle size={20} className="mx-auto mb-1 text-green-600" />
          <div className="font-bold text-lg">{group.activeMembers}</div>
          <div className="text-xs text-gray-500">Faol</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-lg">
          <FolderKanban size={20} className="mx-auto mb-1 text-orange-600" />
          <div className="font-bold text-lg">{group.projects}</div>
          <div className="text-xs text-gray-500">Loyiha</div>
        </div>
      </div>

      <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors">
        Qo'shilish
      </button>
    </div>
  );
}
