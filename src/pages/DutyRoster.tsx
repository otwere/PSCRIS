import React from "react";
import { useRoster } from "../contexts/DutyRosterContext";
import { Search, Calendar } from "lucide-react";
export const DutyRoster = () => {
  const {
    roster,
    getCurrentShift
  } = useRoster();
  const currentShift = getCurrentShift();
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Duty Roster</h1>
        <p className="text-gray-500">Current Shift: {currentShift}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input type="text" placeholder="Search roster..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Calendar className="h-4 w-4" />
              Schedule Shift
            </button>
          </div>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th className="pb-4">Officer</th>
                <th className="pb-4">Rank</th>
                <th className="pb-4">Department</th>
                <th className="pb-4">Shift</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Location</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {roster.map(entry => <tr key={entry.id} className="border-t border-gray-100">
                  <td className="py-4">{entry.officerName}</td>
                  <td className="py-4">{entry.rank}</td>
                  <td className="py-4">{entry.department}</td>
                  <td className="py-4">{entry.shift}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${entry.status === "On Duty" ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-4">{entry.location}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};