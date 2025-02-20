import React from "react";
import { useCase } from "../contexts/CaseContext";
import { CaseList } from "../components/CaseList";
export const CriminalCases = () => {
  const {
    cases
  } = useCase();
  const criminalCases = cases.filter(case_ => case_.type === "Crime");
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Criminal Cases</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{criminalCases.length} total cases</span>
          <span>•</span>
          <span>
            {criminalCases.filter(c => c.status === "Under Investigation").length}{" "}
            under investigation
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Criminal Cases" value={criminalCases.length} trend="+8% from last month" trendUp={true} />
        <StatCard label="High Priority" value={criminalCases.filter(c => c.priority === "High").length} trend="+2 new cases" trendUp={true} />
        <StatCard label="Under Investigation" value={criminalCases.filter(c => c.status === "Under Investigation").length} trend="-3 from last week" trendUp={false} />
        <StatCard label="Resolved Cases" value={criminalCases.filter(c => c.status === "Resolved").length} trend="+5 this month" trendUp={true} />
      </div>
      <CaseList initialType="Crime" />
    </div>;
};
const StatCard = ({
  label,
  value,
  trend,
  trendUp
}: {
  label: string;
  value: number;
  trend: string;
  trendUp: boolean;
}) => <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-gray-500 text-sm">{label}</h3>
      <span className={`text-sm ${trendUp ? "text-green-600" : "text-red-600"}`}>
        {trend}
      </span>
    </div>
    <p className="text-2xl font-semibold">{value}</p>
  </div>;