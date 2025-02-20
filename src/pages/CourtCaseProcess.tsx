import React, { useState } from "react";
import { Search, Calendar, FileText, AlertCircle } from "lucide-react";
import { useCourt } from "../contexts/CourtContext";
import { Pagination } from "../components/Pagination";
export const CourtCaseProcess = () => {
  const {
    courtCases
  } = useCourt();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCases = courtCases.filter(courtCase => courtCase.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) || courtCase.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const paginatedCases = filteredCases.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Court Case Process</h1>
        <p className="text-gray-500">Track and manage court proceedings</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input type="text" placeholder="Search by case number..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="p-6">
          {paginatedCases.map(courtCase => <div key={courtCase.id} className="mb-8 last:mb-0">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">{courtCase.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                  <span>Case #{courtCase.caseNumber}</span>
                  <span>•</span>
                  <span>{courtCase.type}</span>
                  <span>•</span>
                  <span>{courtCase.status}</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-8 relative">
                  {/* Hearings */}
                  {courtCase.hearings.map(hearing => <div key={hearing.id} className="flex gap-4 items-start ml-8">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 -ml-12">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {hearing.type} - {hearing.status}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {hearing.date} at {hearing.time} | {hearing.courtRoom}
                        </p>
                        {hearing.notes && <p className="text-sm mt-2">{hearing.notes}</p>}
                      </div>
                    </div>)}
                  {/* Documents */}
                  {courtCase.documents.map(doc => <div key={doc.id} className="flex gap-4 items-start ml-8">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 -ml-12">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Submitted on {doc.dateSubmitted} by {doc.submittedBy}
                        </p>
                        <p className="text-sm mt-2">{doc.description}</p>
                      </div>
                    </div>)}
                  {/* Case Updates */}
                  {courtCase.updates.map(update => <div key={update.id} className="flex gap-4 items-start ml-8">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 -ml-12">
                        <AlertCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Update by {update.by}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {update.date}
                        </p>
                        <p className="text-sm mt-2">{update.description}</p>
                      </div>
                    </div>)}
                </div>
              </div>
            </div>)}
          <div className="mt-6">
            <Pagination currentPage={currentPage} totalItems={filteredCases.length} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />
          </div>
        </div>
      </div>
    </div>;
};