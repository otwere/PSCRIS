import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Settings, Shield, Database, Server, Globe, Clock, Calendar, Bell, Check, AlertTriangle, Save } from "lucide-react";
type SystemConfig = {
  system: {
    name: string;
    version: string;
    environment: "Production" | "Staging" | "Development";
    timezone: string;
    dateFormat: string;
    language: string;
    maxLoginAttempts: number;
    sessionTimeout: number;
  };
  integration: {
    apiEndpoint: string;
    apiKey: string;
    webhookUrl: string;
    enableSSO: boolean;
    ssoProvider: string;
    maxRequests: number;
    timeout: number;
  };
  backup: {
    schedule: "daily" | "weekly" | "monthly";
    time: string;
    retention: number;
    location: string;
    compress: boolean;
    encrypted: boolean;
    lastBackup: string;
    nextBackup: string;
  };
  maintenance: {
    schedule: "weekly" | "monthly" | "quarterly";
    window: string;
    duration: number;
    notificationTime: number;
    autoRestart: boolean;
    lastMaintenance: string;
    nextMaintenance: string;
  };
};
export const SystemSettings = () => {
  const {
    hasPermission
  } = useAuth();
  const [config, setConfig] = useState<SystemConfig>({
    system: {
      name: "Police Crime Reporting System",
      version: "2.1.0",
      environment: "Production",
      timezone: "UTC-05:00",
      dateFormat: "MM/DD/YYYY",
      language: "English",
      maxLoginAttempts: 5,
      sessionTimeout: 30
    },
    integration: {
      apiEndpoint: "https://api.pcris.gov/v1",
      apiKey: "••••••••••••••••",
      webhookUrl: "https://pcris.gov/webhooks",
      enableSSO: true,
      ssoProvider: "Azure AD",
      maxRequests: 1000,
      timeout: 30
    },
    backup: {
      schedule: "daily",
      time: "00:00",
      retention: 30,
      location: "/backup/pcris",
      compress: true,
      encrypted: true,
      lastBackup: "2023-12-01 00:00:00",
      nextBackup: "2023-12-02 00:00:00"
    },
    maintenance: {
      schedule: "weekly",
      window: "Sunday 02:00",
      duration: 2,
      notificationTime: 24,
      autoRestart: true,
      lastMaintenance: "2023-11-26 02:00:00",
      nextMaintenance: "2023-12-03 02:00:00"
    }
  });
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };
  if (!hasPermission("canManageSystem")) {
    return <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Access Denied</h2>
          <p className="text-gray-500 mt-2">
            You don't have permission to access system settings.
          </p>
        </div>
      </div>;
  }
  return <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">System Settings</h1>
          <p className="text-gray-500">Configure global system settings</p>
        </div>
        <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Parameters */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Settings className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">System Parameters</h2>
              <p className="text-sm text-gray-500">
                Basic system configuration
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  System Name
                </label>
                <input type="text" className="w-full p-2 border rounded" value={config.system.name} onChange={e => setConfig(prev => ({
                ...prev,
                system: {
                  ...prev.system,
                  name: e.target.value
                }
              }))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Version
                </label>
                <input type="text" className="w-full p-2 border rounded bg-gray-50" value={config.system.version} readOnly />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Time Zone
                </label>
                <select className="w-full p-2 border rounded" value={config.system.timezone} onChange={e => setConfig(prev => ({
                ...prev,
                system: {
                  ...prev.system,
                  timezone: e.target.value
                }
              }))}>
                  <option>UTC-05:00</option>
                  <option>UTC-06:00</option>
                  <option>UTC-07:00</option>
                  <option>UTC-08:00</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date Format
                </label>
                <select className="w-full p-2 border rounded" value={config.system.dateFormat} onChange={e => setConfig(prev => ({
                ...prev,
                system: {
                  ...prev.system,
                  dateFormat: e.target.value
                }
              }))}>
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Integration Settings */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Integration Settings</h2>
              <p className="text-sm text-gray-500">API and external services</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                API Endpoint
              </label>
              <input type="text" className="w-full p-2 border rounded" value={config.integration.apiEndpoint} onChange={e => setConfig(prev => ({
              ...prev,
              integration: {
                ...prev.integration,
                apiEndpoint: e.target.value
              }
            }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">API Key</label>
              <input type="password" className="w-full p-2 border rounded" value={config.integration.apiKey} onChange={e => setConfig(prev => ({
              ...prev,
              integration: {
                ...prev.integration,
                apiKey: e.target.value
              }
            }))} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Enable SSO
                </label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={config.integration.enableSSO} onChange={e => setConfig(prev => ({
                  ...prev,
                  integration: {
                    ...prev.integration,
                    enableSSO: e.target.checked
                  }
                }))} className="rounded border-gray-300 text-blue-600" />
                  <span className="text-sm text-gray-600">
                    Enable Single Sign-On
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  SSO Provider
                </label>
                <select className="w-full p-2 border rounded" value={config.integration.ssoProvider} onChange={e => setConfig(prev => ({
                ...prev,
                integration: {
                  ...prev.integration,
                  ssoProvider: e.target.value
                }
              }))} disabled={!config.integration.enableSSO}>
                  <option>Azure AD</option>
                  <option>Okta</option>
                  <option>Google</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Backup Configuration */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-green-50 rounded-lg">
              <Database className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Backup Configuration</h2>
              <p className="text-sm text-gray-500">System backup settings</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Schedule
                </label>
                <select className="w-full p-2 border rounded" value={config.backup.schedule} onChange={e => setConfig(prev => ({
                ...prev,
                backup: {
                  ...prev.backup,
                  schedule: e.target.value as "daily" | "weekly" | "monthly"
                }
              }))}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Retention (days)
                </label>
                <input type="number" className="w-full p-2 border rounded" value={config.backup.retention} onChange={e => setConfig(prev => ({
                ...prev,
                backup: {
                  ...prev.backup,
                  retention: parseInt(e.target.value)
                }
              }))} />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Last Backup</p>
                <p className="text-sm text-gray-500">
                  {config.backup.lastBackup}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Next Backup</p>
                <p className="text-sm text-gray-500">
                  {config.backup.nextBackup}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* System Maintenance */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Server className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">System Maintenance</h2>
              <p className="text-sm text-gray-500">
                Maintenance schedule and settings
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Schedule
                </label>
                <select className="w-full p-2 border rounded" value={config.maintenance.schedule} onChange={e => setConfig(prev => ({
                ...prev,
                maintenance: {
                  ...prev.maintenance,
                  schedule: e.target.value as "weekly" | "monthly" | "quarterly"
                }
              }))}>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration (hours)
                </label>
                <input type="number" className="w-full p-2 border rounded" value={config.maintenance.duration} onChange={e => setConfig(prev => ({
                ...prev,
                maintenance: {
                  ...prev.maintenance,
                  duration: parseInt(e.target.value)
                }
              }))} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={config.maintenance.autoRestart} onChange={e => setConfig(prev => ({
              ...prev,
              maintenance: {
                ...prev.maintenance,
                autoRestart: e.target.checked
              }
            }))} className="rounded border-gray-300 text-blue-600" />
              <span className="text-sm text-gray-600">
                Enable automatic system restart
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Last Maintenance</p>
                <p className="text-sm text-gray-500">
                  {config.maintenance.lastMaintenance}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Next Maintenance</p>
                <p className="text-sm text-gray-500">
                  {config.maintenance.nextMaintenance}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};