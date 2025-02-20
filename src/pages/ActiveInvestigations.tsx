import React from "react";
import { Search, Filter, Clock, AlertCircle } from "lucide-react";
import { useCase } from "../contexts/CaseContext";
export const ActiveInvestigations = () => {
  const {
    cases
  } = useCase();
  const activeInvestigations = cases.filter(c => c.status === "Under Investigation");
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Active Investigations</h1>
        <p className="text-gray-500">
          Monitor and manage ongoing investigations
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search investigations..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
            {activeInvestigations.map(investigation => <div key={investigation.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">
                      {investigation.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {investigation.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {investigation.priority === "High" && <span className="flex items-center gap-1 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        High Priority
                      </span>}
                    <span className="flex items-center gap-1 text-gray-500 text-sm">
                      <Clock className="h-4 w-4" />
                      {investigation.dateReported}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Lead Investigator</p>
                    <p className="font-medium">
                      {investigation.assignedOfficer}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Department</p>
                    <p className="font-medium">{investigation.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Evidence Items</p>
                    <p className="font-medium">
                      {investigation.evidence.length}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Recent Updates</h4>
                  <div className="space-y-2">
                    {investigation.updates.map(update => <div key={update.id} className="text-sm">
                        <p className="text-gray-500">
                          {update.date} - {update.officer}
                        </p>
                        <p>{update.description}</p>
                      </div>)}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};