import React from "react";
import { Search, Filter, FileText, Clock, AlertCircle } from "lucide-react";
import { useCourt } from "../contexts/CourtContext";
export const CourtFiles = () => {
  const {
    courtCases
  } = useCourt();
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Court Files</h1>
        <p className="text-gray-500">
          Manage and track court cases and related documents
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FileText className="h-6 w-6 text-blue-600" />} label="Total Court Cases" value={courtCases.length} trend="+2 this month" />
        <StatCard icon={<Clock className="h-6 w-6 text-purple-600" />} label="Pending Hearings" value={courtCases.reduce((acc, c) => acc + c.hearings.filter(h => h.status === "Scheduled").length, 0)} trend="Next: Tomorrow" />
        <StatCard icon={<AlertCircle className="h-6 w-6 text-orange-600" />} label="Cases In Progress" value={courtCases.filter(c => c.status === "In Progress").length} trend="Updated today" />
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search court cases..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {courtCases.map(courtCase => <div key={courtCase.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{courtCase.title}</h3>
                    <p className="text-gray-500 text-sm">
                      Case #{courtCase.caseNumber} | {courtCase.court}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${courtCase.status === "In Progress" ? "bg-blue-50 text-blue-600" : courtCase.status === "Closed" ? "bg-gray-50 text-gray-600" : "bg-yellow-50 text-yellow-600"}`}>
                    {courtCase.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Judge</p>
                    <p className="font-medium">{courtCase.judge}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Filing Date</p>
                    <p className="font-medium">{courtCase.filingDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium">{courtCase.type}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm border-t pt-4">
                  <div>
                    <p className="text-gray-500 mb-2">Plaintiff</p>
                    <p className="font-medium">{courtCase.plaintiff.name}</p>
                    <p className="text-sm text-gray-500">
                      Rep: {courtCase.plaintiff.representative}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-2">Defendant</p>
                    <p className="font-medium">{courtCase.defendant.name}</p>
                    <p className="text-sm text-gray-500">
                      Rep: {courtCase.defendant.representative}
                    </p>
                  </div>
                </div>
              </div>)}
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
  value: number | string;
  trend: string;
}) => <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <span className="text-sm text-gray-500">{trend}</span>
    </div>
    <h3 className="text-gray-500 text-sm mb-1">{label}</h3>
    <p className="text-2xl font-semibold">{value}</p>
  </div>;