import React from "react";
import { Search, Clock, Flag, AlertCircle } from "lucide-react";
import { useCase } from "../contexts/CaseContext";
export const CaseTimeline = () => {
  const {
    cases
  } = useCase();
  const activeCase = cases[0]; // For demonstration, using first case
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Case Timeline</h1>
        <p className="text-gray-500">
          Chronological view of case events and updates
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input type="text" placeholder="Search case by ID or title..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">{activeCase.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
              <span>Case #{activeCase.id}</span>
              <span>•</span>
              <span>{activeCase.type}</span>
              <span>•</span>
              <span>{activeCase.status}</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-8 relative">
              {/* Evidence Collection */}
              {activeCase.evidence.map(item => <div key={item.id} className="flex gap-4 items-start ml-8">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 -ml-12">
                    <Flag className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {item.type} Evidence Collected
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.dateCollected}
                    </p>
                    <p className="text-sm mt-2">{item.description}</p>
                  </div>
                </div>)}
              {/* Case Updates */}
              {activeCase.updates.map(update => <div key={update.id} className="flex gap-4 items-start ml-8">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 -ml-12">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Update by {update.officer}</p>
                    <p className="text-sm text-gray-500 mt-1">{update.date}</p>
                    <p className="text-sm mt-2">{update.description}</p>
                  </div>
                </div>)}
              {/* Case Creation */}
              <div className="flex gap-4 items-start ml-8">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 -ml-12">
                  <AlertCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Case Created</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {activeCase.dateReported}
                  </p>
                  <p className="text-sm mt-2">
                    Case opened and assigned to {activeCase.assignedOfficer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};