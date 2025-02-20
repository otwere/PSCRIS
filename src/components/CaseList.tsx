import React, { useState } from "react";
import { Search, Plus, ChevronDown } from "lucide-react";
import { NewCaseModal } from "./NewCaseModal";
import { useCase, Case } from "../contexts/CaseContext";
export const CaseList = ({
  initialType
}: {
  initialType?: "All" | "Civil" | "Crime";
}) => {
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"All" | "Civil" | "Crime">(initialType || "All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const {
    cases
  } = useCase();
  const searchTerm = "";
  const filteredCases = cases.filter(case_ => selectedType === "All" ? true : case_.type === selectedType).filter(case_ => case_.title.toLowerCase().includes(searchTerm.toLowerCase()) || case_.id.toLowerCase().includes(searchTerm.toLowerCase()));
  const paginatedCases = filteredCases.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Cases</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input type="text" placeholder="Search cases..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <button onClick={() => setIsNewCaseModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              New Case (OB)
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button className={`px-4 py-2 rounded-lg font-medium ${selectedType === "All" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`} onClick={() => setSelectedType("All")}>
            All Cases
          </button>
          <button className={`px-4 py-2 rounded-lg font-medium ${selectedType === "Civil" ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:bg-gray-50"}`} onClick={() => setSelectedType("Civil")}>
            Civil
          </button>
          <button className={`px-4 py-2 rounded-lg font-medium ${selectedType === "Crime" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"}`} onClick={() => setSelectedType("Crime")}>
            Crime
          </button>
        </div>
      </div>
      <div className="p-6">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="pb-4">Case ID</th>
              <th className="pb-4">Type</th>
              <th className="pb-4">Title</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Priority</th>
              <th className="pb-4">Assigned To</th>
              <th className="pb-4">Date Reported</th>
              <th className="pb-4"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {paginatedCases.map(case_ => <CaseRow key={case_.id} case={case_} />)}
          </tbody>
        </table>
        <div className="mt-6">
          <Pagination currentPage={currentPage} totalItems={filteredCases.length} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />
        </div>
      </div>
      <NewCaseModal isOpen={isNewCaseModalOpen} onClose={() => setIsNewCaseModalOpen(false)} />
    </div>;
};
const CaseRow = ({
  case: case_
}: {
  case: Case;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return <>
      <tr key={case_.id} className="border-t border-gray-100">
        <td className="py-4">{case_.id}</td>
        <td>
          <span className={`px-3 py-1 rounded-full text-xs ${case_.type === "Civil" ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}>
            {case_.type}
          </span>
        </td>
        <td className="py-4">{case_.title}</td>
        <td>
          <StatusBadge status={case_.status} />
        </td>
        <td>
          <PriorityBadge priority={case_.priority} />
        </td>
        <td className="py-4">{case_.assignedOfficer}</td>
        <td className="py-4 text-gray-500">{case_.dateReported}</td>
        <td>
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 hover:bg-gray-50 rounded-lg">
            <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "transform rotate-180" : ""}`} />
          </button>
        </td>
      </tr>
      {isExpanded && <tr>
          <td colSpan={8} className="bg-gray-50 p-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-600">{case_.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Evidence</h4>
                  <ul className="space-y-2">
                    {case_.evidence.map(item => <li key={item.id} className="text-gray-600">
                        {item.type}: {item.description}
                      </li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Updates</h4>
                  <ul className="space-y-2">
                    {case_.updates.map(update => <li key={update.id} className="text-gray-600">
                        {update.date}: {update.description}
                      </li>)}
                  </ul>
                </div>
              </div>
            </div>
          </td>
        </tr>}
    </>;
};
const StatusBadge = ({
  status
}: {
  status: string;
}) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-yellow-50 text-yellow-600";
      case "Under Investigation":
        return "bg-blue-50 text-blue-600";
      case "Pending Review":
        return "bg-purple-50 text-purple-600";
      case "Court Proceeding":
        return "bg-orange-50 text-orange-600";
      case "Resolved":
        return "bg-green-50 text-green-600";
      case "Closed":
        return "bg-gray-50 text-gray-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };
  return <span className={`px-3 py-1 rounded-full text-xs ${getStatusStyles(status)}`}>
      {status}
    </span>;
};
const PriorityBadge = ({
  priority
}: {
  priority: string;
}) => {
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-50 text-red-600";
      case "High":
        return "bg-orange-50 text-orange-600";
      case "Medium":
        return "bg-yellow-50 text-yellow-600";
      case "Low":
        return "bg-green-50 text-green-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };
  return <span className={`px-3 py-1 rounded-full text-xs ${getPriorityStyles(priority)}`}>
      {priority}
    </span>;
};
const Pagination = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange
}: {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageNumbers = Array.from({
    length: totalPages
  }, (_, i) => i + 1);
  return <div className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 rounded-lg text-gray-600 hover:bg-gray-100">
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 rounded-lg text-gray-600 hover:bg-gray-100">
          Next
        </button>
      </div>
      <div className="flex items-center">
        <select value={pageSize} onChange={e => onPageSizeChange(Number(e.target.value))} className="px-2 py-1 rounded-lg text-gray-600 hover:bg-gray-100">
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>;
};