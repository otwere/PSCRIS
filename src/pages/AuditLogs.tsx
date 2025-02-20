import React, { useState } from "react";
import { Search, Filter, Download, AlertCircle } from "lucide-react";
import { useAudit } from "../contexts/AuditContext";
import { useAuth } from "../contexts/AuthContext";
export const AuditLogs = () => {
  const {
    logs
  } = useAudit();
  const {
    hasPermission
  } = useAuth();
  const [dateRange, setDateRange] = useState({
    start: "",
    end: ""
  });
  if (!hasPermission("canViewAudit")) {
    return <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Access Denied</h2>
          <p className="text-gray-500 mt-2">
            You don't have permission to view audit logs.
          </p>
        </div>
      </div>;
  }
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Audit Logs</h1>
        <p className="text-gray-500">View system activity and security logs</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold">Security Events</h3>
          </div>
          <p className="text-2xl font-semibold">
            {logs.filter(log => log.action === "Login" || log.action === "Logout").length}
          </p>
          <p className="text-sm text-gray-500">Last 24 hours</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold">Failed Actions</h3>
          </div>
          <p className="text-2xl font-semibold">
            {logs.filter(log => !log.success).length}
          </p>
          <p className="text-sm text-gray-500">Last 24 hours</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold">User Activities</h3>
          </div>
          <p className="text-2xl font-semibold">{logs.length}</p>
          <p className="text-sm text-gray-500">Total records</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search logs..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input type="date" className="px-3 py-2 border border-gray-200 rounded-lg" value={dateRange.start} onChange={e => setDateRange(prev => ({
                ...prev,
                start: e.target.value
              }))} />
                <span>to</span>
                <input type="date" className="px-3 py-2 border border-gray-200 rounded-lg" value={dateRange.end} onChange={e => setDateRange(prev => ({
                ...prev,
                end: e.target.value
              }))} />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th className="pb-4">Timestamp</th>
                <th className="pb-4">User</th>
                <th className="pb-4">Action</th>
                <th className="pb-4">Resource</th>
                <th className="pb-4">IP Address</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => <tr key={log.id} className="border-t border-gray-100">
                  <td className="py-4 text-sm">{log.timestamp}</td>
                  <td className="py-4">
                    <div>
                      <p className="text-sm font-medium">{log.userName}</p>
                      <p className="text-xs text-gray-500">{log.userRole}</p>
                    </div>
                  </td>
                  <td className="py-4 text-sm">{log.action}</td>
                  <td className="py-4 text-sm">
                    {log.resource} #{log.resourceId}
                  </td>
                  <td className="py-4 text-sm">{log.ipAddress}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${log.success ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                      {log.success ? "Success" : "Failed"}
                    </span>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};