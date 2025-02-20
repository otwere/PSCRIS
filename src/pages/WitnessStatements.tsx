import React from "react";
import { Search, Filter, Plus } from "lucide-react";
import { useWitness } from "../contexts/WitnessContext";
export const WitnessStatements = () => {
  const {
    statements
  } = useWitness();
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Witness Statements</h1>
        <p className="text-gray-500">Manage and record witness statements</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search statements..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              Record Statement
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {statements.map(statement => <div key={statement.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">
                      {statement.witness.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {statement.witness.type} - Case #{statement.caseId}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${statement.statement.status === "Verified" ? "bg-green-50 text-green-600" : statement.statement.status === "Pending" ? "bg-yellow-50 text-yellow-600" : "bg-gray-50 text-gray-600"}`}>
                    {statement.statement.status}
                  </span>
                </div>
                <div className="text-sm space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-gray-500">Recorded By</p>
                      <p className="font-medium">
                        {statement.statement.recordedBy}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p className="font-medium">{statement.statement.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Credibility</p>
                      <p className="font-medium">
                        {statement.witness.credibility}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Statement</p>
                    <p className="bg-gray-50 p-3 rounded-lg">
                      {statement.statement.content}
                    </p>
                  </div>
                  {statement.followUp.length > 0 && <div className="border-t pt-4 mt-4">
                      <h4 className="font-medium mb-2">Follow-up Actions</h4>
                      <div className="space-y-2">
                        {statement.followUp.map(action => <div key={action.id}>
                            <p className="text-gray-500">
                              {action.date} - {action.officer}
                            </p>
                            <p>{action.notes}</p>
                          </div>)}
                      </div>
                    </div>}
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};