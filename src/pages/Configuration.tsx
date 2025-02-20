import React from "react";
import { Settings, Database, Server, Globe } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
export const Configuration = () => {
  const {
    hasPermission
  } = useAuth();
  if (!hasPermission("canManageSystem")) {
    return <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Access Denied</h2>
          <p className="text-gray-500 mt-2">
            You don't have permission to access this page.
          </p>
        </div>
      </div>;
  }
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">System Configuration</h1>
        <p className="text-gray-500">Manage global system settings</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">System Parameters</h2>
              <p className="text-sm text-gray-500">
                Configure core system settings
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block font-medium mb-2">System Name</label>
              <input type="text" className="w-full p-2 border rounded" defaultValue="Police Crime Reporting System" />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block font-medium mb-2">Time Zone</label>
              <select className="w-full p-2 border rounded">
                <option>UTC-05:00 Eastern Time</option>
                <option>UTC-06:00 Central Time</option>
                <option>UTC-07:00 Mountain Time</option>
                <option>UTC-08:00 Pacific Time</option>
              </select>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block font-medium mb-2">Date Format</label>
              <select className="w-full p-2 border rounded">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Integration Settings</h2>
              <p className="text-sm text-gray-500">
                Manage external system connections
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block font-medium mb-2">API Endpoint</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="https://api.example.com" />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block font-medium mb-2">API Key</label>
              <input type="password" className="w-full p-2 border rounded" placeholder="Enter API key" />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block font-medium mb-2">Webhook URL</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="https://webhook.example.com" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-green-50 rounded-lg">
              <Database className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Backup Configuration</h2>
              <p className="text-sm text-gray-500">
                Configure system backup settings
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Automatic Backups</p>
                  <p className="text-sm text-gray-500">
                    Schedule regular system backups
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block font-medium mb-2">Backup Frequency</label>
              <select className="w-full p-2 border rounded">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block font-medium mb-2">Retention Period</label>
              <select className="w-full p-2 border rounded">
                <option>30 days</option>
                <option>60 days</option>
                <option>90 days</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Server className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">System Maintenance</h2>
              <p className="text-sm text-gray-500">
                Manage system maintenance tasks
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-gray-500">
                    Enable system maintenance mode
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block font-medium mb-2">
                Maintenance Schedule
              </label>
              <input type="datetime-local" className="w-full p-2 border rounded" />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="block font-medium mb-2">
                Maintenance Duration
              </label>
              <select className="w-full p-2 border rounded">
                <option>1 hour</option>
                <option>2 hours</option>
                <option>4 hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>;
};