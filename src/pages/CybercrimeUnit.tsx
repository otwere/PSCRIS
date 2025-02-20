import React, { useState } from "react";
import { Shield, AlertTriangle, Clock, Search, Filter, Plus, Activity, Server, Globe, Lock } from "lucide-react";
import { useCybercrime } from "../contexts/CybercrimeContext";
import { CurrentDateTime } from "../components/CurrentDateTime";
import { Pagination } from "../components/Pagination";
export const CybercrimeUnit = () => {
  const {
    incidents,
    statistics
  } = useCybercrime();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) || incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || incident.status === filterStatus;
    const matchesSeverity = filterSeverity === "all" || incident.severity === filterSeverity;
    return matchesSearch && matchesStatus && matchesSeverity;
  });
  const paginatedIncidents = filteredIncidents.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Cybercrime Unit</h1>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <p className="text-gray-500">
            Monitor and investigate cyber incidents and threats
          </p>
          <CurrentDateTime />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold">Total Incidents</h3>
          </div>
          <p className="text-2xl font-semibold">{statistics.totalIncidents}</p>
          <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="font-semibold">Active Threats</h3>
          </div>
          <p className="text-2xl font-semibold">{statistics.activeThreats}</p>
          <p className="text-sm text-red-600 mt-1">Requires immediate action</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <Lock className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold">Resolved Cases</h3>
          </div>
          <p className="text-2xl font-semibold">{statistics.resolvedCases}</p>
          <p className="text-sm text-green-600 mt-1">Successfully contained</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold">Avg Resolution Time</h3>
          </div>
          <p className="text-2xl font-semibold">
            {statistics.averageResolutionTime}h
          </p>
          <p className="text-sm text-purple-600 mt-1">Response efficiency</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search incidents..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Contained">Contained</option>
                <option value="Resolved">Resolved</option>
              </select>
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)}>
                <option value="all">All Severity</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              New Incident
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {paginatedIncidents.map(incident => <div key={incident.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-lg">{incident.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${incident.severity === "Critical" ? "bg-red-50 text-red-600" : incident.severity === "High" ? "bg-orange-50 text-orange-600" : incident.severity === "Medium" ? "bg-yellow-50 text-yellow-600" : "bg-green-50 text-green-600"}`}>
                        {incident.severity}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      {incident.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${incident.status === "Active" ? "bg-red-50 text-red-600" : incident.status === "Under Investigation" ? "bg-blue-50 text-blue-600" : incident.status === "Contained" ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"}`}>
                    {incident.status}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium">{incident.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Investigator</p>
                    <p className="font-medium">{incident.investigator}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Reported</p>
                    <p className="font-medium">
                      {new Date(incident.reportedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Updated</p>
                    <p className="font-medium">
                      {new Date(incident.lastUpdated).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {incident.timeline.length > 0 && <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Recent Activity</h4>
                    <div className="space-y-2">
                      {incident.timeline.slice(0, 2).map(entry => <div key={entry.id} className="text-sm">
                          <p className="text-gray-500">
                            {new Date(entry.date).toLocaleString()} -{" "}
                            {entry.performer}
                          </p>
                          <p>{entry.description}</p>
                        </div>)}
                    </div>
                  </div>}
              </div>)}
          </div>
          <div className="mt-6">
            <Pagination currentPage={currentPage} totalItems={filteredIncidents.length} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />
          </div>
        </div>
      </div>
    </div>;
};