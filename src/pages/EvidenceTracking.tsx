import React from "react";
import { Search, Filter, Plus } from "lucide-react";
import { useEvidence } from "../contexts/EvidenceContext";
export const EvidenceTracking = () => {
  const {
    evidence
  } = useEvidence();
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Evidence Tracking</h1>
        <p className="text-gray-500">Track and manage case evidence</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search evidence..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Add Evidence
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {evidence.map(item => <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">Evidence #{item.id}</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${item.status === "In Analysis" ? "bg-blue-50 text-blue-600" : item.status === "Analyzed" ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"}`}>
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium">{item.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Collected By</p>
                    <p className="font-medium">{item.collectedBy}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date Collected</p>
                    <p className="font-medium">{item.dateCollected}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Storage Location</p>
                    <p className="font-medium">{item.storageLocation}</p>
                  </div>
                </div>
                {item.chainOfCustody.length > 0 && <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Chain of Custody</h4>
                    <div className="space-y-2">
                      {item.chainOfCustody.map(entry => <div key={entry.id} className="text-sm">
                          <p className="text-gray-500">
                            {entry.date} - {entry.handler}
                          </p>
                          <p>
                            {entry.action}: {entry.notes}
                          </p>
                        </div>)}
                    </div>
                  </div>}
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};