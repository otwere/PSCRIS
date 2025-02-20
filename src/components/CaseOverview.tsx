import React from "react";
import { FileText, Scale, Clock, CheckCircle } from "lucide-react";
export const CaseOverview = () => {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard icon={<FileText className="h-6 w-6 text-blue-600" />} label="Total Cases" value="1,284" trend="+12%" />
      <StatCard icon={<Scale className="h-6 w-6 text-purple-600" />} label="Civil Cases" value="495" trend="+5%" />
      <StatCard icon={<Clock className="h-6 w-6 text-orange-600" />} label="Pending Cases" value="328" trend="-3%" />
      <StatCard icon={<CheckCircle className="h-6 w-6 text-green-600" />} label="Resolved Cases" value="956" trend="+8%" />
    </div>;
};
const StatCard = ({
  icon,
  label,
  value,
  trend
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}) => <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <span className={`text-sm ${trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
        {trend}
      </span>
    </div>
    <h3 className="text-gray-500 text-sm mb-1">{label}</h3>
    <p className="text-2xl font-semibold">{value}</p>
  </div>;