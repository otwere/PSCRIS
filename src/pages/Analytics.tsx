import React from "react";
import { BarChart3, TrendingUp, Users, AlertCircle } from "lucide-react";
export const Analytics = () => {
  const stats = {
    caseResolutionRate: "76%",
    averageResponseTime: "45 mins",
    activeOfficers: 85,
    criticalCases: 12
  };
  const monthlyStats = [{
    month: "Jan",
    civil: 45,
    criminal: 32
  }, {
    month: "Feb",
    civil: 52,
    criminal: 28
  }, {
    month: "Mar",
    civil: 48,
    criminal: 40
  }, {
    month: "Apr",
    civil: 61,
    criminal: 35
  }, {
    month: "May",
    civil: 55,
    criminal: 38
  }, {
    month: "Jun",
    civil: 67,
    criminal: 42
  }];
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-gray-500">
          Comprehensive overview of department performance
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<TrendingUp className="h-6 w-6 text-green-600" />} label="Case Resolution Rate" value={stats.caseResolutionRate} trend="+5.2% from last month" />
        <StatCard icon={<BarChart3 className="h-6 w-6 text-blue-600" />} label="Avg. Response Time" value={stats.averageResponseTime} trend="-12% from last month" />
        <StatCard icon={<Users className="h-6 w-6 text-purple-600" />} label="Active Officers" value={stats.activeOfficers} trend="+3 from last month" />
        <StatCard icon={<AlertCircle className="h-6 w-6 text-red-600" />} label="Critical Cases" value={stats.criticalCases} trend="+2 from last month" />
      </div>
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Monthly Case Distribution
        </h2>
        <div className="h-64 flex items-end justify-between gap-2">
          {monthlyStats.map(stat => <div key={stat.month} className="flex flex-col items-center gap-2">
              <div className="flex flex-col gap-1 w-16">
                <div className="bg-blue-500 rounded-t-sm" style={{
              height: `${stat.criminal * 2}px`
            }} />
                <div className="bg-purple-500 rounded-t-sm" style={{
              height: `${stat.civil * 2}px`
            }} />
              </div>
              <span className="text-sm text-gray-600">{stat.month}</span>
            </div>)}
        </div>
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-sm" />
            <span className="text-sm text-gray-600">Criminal Cases</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-sm" />
            <span className="text-sm text-gray-600">Civil Cases</span>
          </div>
        </div>
      </div>
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
  value: string | number;
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