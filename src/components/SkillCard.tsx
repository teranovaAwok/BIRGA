import { Users, Handshake, Mic, Briefcase, Laptop, Scale } from "lucide-react";

const iconMap: Record<string, any> = {
  Users, Handshake, Mic, Briefcase, Laptop, Scale,
};

interface Skill {
  id: number;
  title: string;
  icon: string;
  description: string;
  level: string;
}

export default function SkillCard({ skill }: { skill: Skill }) {
  const Icon = iconMap[skill.icon] || Users;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg card-hover border border-gray-100 text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon size={32} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{skill.description}</p>
      <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
        {skill.level}
      </span>
    </div>
  );
}
