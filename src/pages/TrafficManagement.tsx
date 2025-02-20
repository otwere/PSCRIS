import React, { useState } from "react";
import { Car, AlertTriangle, FileText, Calendar, MapPin, Search, Plus, Filter, Clock, CheckCircle, XCircle } from "lucide-react";
import { useTraffic, TrafficIncident, AccidentReport } from "../contexts/TrafficContext";
import { NewTrafficIncidentModal } from "../components/traffic/NewTrafficIncidentModal";
import { NewAccidentReportModal } from "../components/traffic/NewAccidentReportModal";
import { NewEquipmentModal } from "../components/traffic/NewEquipmentModal";
import { Pagination } from "../components/Pagination";
export const TrafficManagement = () => {
  const {
    incidents,
    accidentReports,
    equipment
  } = useTraffic();
  const [activeTab, setActiveTab] = useState<"incidents" | "reports" | "equipment">("incidents");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isNewIncidentModalOpen, setIsNewIncidentModalOpen] = useState(false);
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
  const [isNewEquipmentModalOpen, setIsNewEquipmentModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const getFilteredItems = () => {
    let items = [];
    if (activeTab === "incidents") {
      items = incidents;
    } else if (activeTab === "reports") {
      items = accidentReports;
    } else {
      items = equipment;
    }
    return items.filter(item => item.type.toLowerCase().includes(searchTerm.toLowerCase()) && (statusFilter === "all" || item.status.toLowerCase() === statusFilter));
  };
  const filteredItems = getFilteredItems();
  const paginatedItems = filteredItems.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Traffic Management</h1>
        <p className="text-gray-500">
          Manage traffic incidents, accident reports, and equipment
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold">Active Incidents</h3>
          </div>
          <p className="text-2xl font-semibold">
            {incidents.filter(i => i.status !== "Closed").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Car className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold">Accident Reports</h3>
          </div>
          <p className="text-2xl font-semibold">{accidentReports.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold">Available Equipment</h3>
          </div>
          <p className="text-2xl font-semibold">
            {equipment.filter(e => e.status === "Available").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 rounded-lg">
              <div className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="font-semibold">Equipment in Maintenance</h3>
          </div>
          <p className="text-2xl font-semibold">
            {equipment.filter(e => e.status === "Maintenance").length}
          </p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b">
          <nav className="flex">
            <button className={`px-6 py-4 font-medium text-sm ${activeTab === "incidents" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("incidents")}>
              Incidents
            </button>
            <button className={`px-6 py-4 font-medium text-sm ${activeTab === "reports" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("reports")}>
              Accident Reports
            </button>
            <button className={`px-6 py-4 font-medium text-sm ${activeTab === "equipment" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab("equipment")}>
              Equipment
            </button>
          </nav>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <button onClick={() => {
            if (activeTab === "incidents") setIsNewIncidentModalOpen(true);else if (activeTab === "reports") setIsNewReportModalOpen(true);else setIsNewEquipmentModalOpen(true);
          }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              {activeTab === "incidents" ? "New Incident" : activeTab === "reports" ? "New Report" : "Add Equipment"}
            </button>
          </div>
          {activeTab === "incidents" && <div className="space-y-4">
              {paginatedItems.map(incident => <div key={incident.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">{incident.type}</h3>
                      <p className="text-sm text-gray-500">
                        {incident.description}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${incident.status === "Resolved" ? "bg-green-50 text-green-600" : incident.status === "In Progress" ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-600"}`}>
                      {incident.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{incident.location.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>
                        {new Date(incident.dateTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-gray-400" />
                      <span>{incident.severity}</span>
                    </div>
                  </div>
                </div>)}
            </div>}
          {activeTab === "reports" && <div className="space-y-4">
              {paginatedItems.map(report => <div key={report.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">{report.type}</h3>
                      <p className="text-sm text-gray-500">
                        {report.description}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${report.status === "Approved" ? "bg-green-50 text-green-600" : report.status === "Submitted" ? "bg-blue-50 text-blue-600" : "bg-gray-50 text-gray-600"}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span>{report.location.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>{new Date(report.dateTime).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span>{report.vehicles.length} Vehicles Involved</span>
                    </div>
                  </div>
                </div>)}
            </div>}
          {activeTab === "equipment" && <div className="space-y-4">
              {paginatedItems.map(item => <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium">{item.type}</h3>
                      <p className="text-sm text-gray-500">
                        SN: {item.serialNumber}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${item.status === "Available" ? "bg-green-50 text-green-600" : item.status === "In Use" ? "bg-blue-50 text-blue-600" : "bg-red-50 text-red-600"}`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Last Maintenance: {item.lastMaintenance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 text-gray-400" />
                      <span>Next Maintenance: {item.nextMaintenance}</span>
                    </div>
                  </div>
                </div>)}
            </div>}
        </div>
      </div>
      <NewTrafficIncidentModal isOpen={isNewIncidentModalOpen} onClose={() => setIsNewIncidentModalOpen(false)} />
      <NewAccidentReportModal isOpen={isNewReportModalOpen} onClose={() => setIsNewReportModalOpen(false)} />
      <NewEquipmentModal isOpen={isNewEquipmentModalOpen} onClose={() => setIsNewEquipmentModalOpen(false)} />
      <div className="mt-6">
        <Pagination currentPage={currentPage} totalItems={filteredItems.length} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />
      </div>
    </div>;
};