import React, { useState } from "react";
import { Shield, Lock, Settings, AlertTriangle, Check, X, ChevronDown, User, Users, FileText, Database, Bell, Search, Plus, Save } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
type Permission = {
  id: string;
  name: string;
  description: string;
  category: string;
  enabled: boolean;
};
type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  users: number;
  level: number;
};
type SecurityRule = {
  id: string;
  name: string;
  description: string;
  type: "password" | "session" | "access" | "authentication";
  status: "active" | "inactive";
  threshold: number;
  action: string;
};
export const AccessControl = () => {
  const {
    hasPermission
  } = useAuth();
  const [activeTab, setActiveTab] = useState<"roles" | "permissions" | "policies" | "rules">("roles");
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const roles: Role[] = [{
    id: "role_1",
    name: "System Administrator",
    description: "Full system access with all permissions",
    permissions: ["all"],
    users: 3,
    level: 1
  }, {
    id: "role_2",
    name: "Department Manager",
    description: "Department-level access and management",
    permissions: ["dept_manage", "user_view", "case_manage"],
    users: 8,
    level: 2
  }, {
    id: "role_3",
    name: "Officer",
    description: "Standard officer access level",
    permissions: ["case_view", "case_create", "evidence_manage"],
    users: 45,
    level: 3
  }];
  const permissions: Permission[] = [{
    id: "perm_1",
    name: "User Management",
    description: "Create, edit, and delete user accounts",
    category: "Administration",
    enabled: true
  }, {
    id: "perm_2",
    name: "Case Management",
    description: "Manage case files and investigations",
    category: "Operations",
    enabled: true
  }, {
    id: "perm_3",
    name: "Evidence Handling",
    description: "Track and manage evidence",
    category: "Operations",
    enabled: true
  }, {
    id: "perm_4",
    name: "System Configuration",
    description: "Configure system settings",
    category: "Administration",
    enabled: false
  }];
  const securityRules: SecurityRule[] = [{
    id: "rule_1",
    name: "Password Complexity",
    description: "Minimum requirements for password strength",
    type: "password",
    status: "active",
    threshold: 8,
    action: "Enforce minimum length and complexity"
  }, {
    id: "rule_2",
    name: "Session Timeout",
    description: "Auto logout after inactivity",
    type: "session",
    status: "active",
    threshold: 30,
    action: "Logout user after 30 minutes"
  }, {
    id: "rule_3",
    name: "Failed Login Attempts",
    description: "Maximum failed login attempts",
    type: "authentication",
    status: "active",
    threshold: 5,
    action: "Lock account after 5 failed attempts"
  }];
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
  const renderRolesTab = () => <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input type="text" placeholder="Search roles..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          Create Role
        </button>
      </div>
      <div className="space-y-4">
        {roles.map(role => <div key={role.id} className="border rounded-lg">
            <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setExpandedRole(expandedRole === role.id ? null : role.id)}>
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{role.name}</h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">
                  {role.users} users
                </span>
                <ChevronDown className={`h-5 w-5 text-gray-400 transform transition-transform ${expandedRole === role.id ? "rotate-180" : ""}`} />
              </div>
            </div>
            {expandedRole === role.id && <div className="border-t p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Permissions</h4>
                    <div className="space-y-2">
                      {permissions.map(permission => <label key={permission.id} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={permission.enabled} />
                          <span className="text-sm">{permission.name}</span>
                        </label>)}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Access Level</h4>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option>Level 1 (Highest)</option>
                      <option>Level 2</option>
                      <option>Level 3</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                </div>
              </div>}
          </div>)}
      </div>
    </div>;
  const renderPermissionsTab = () => <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {["Administration", "Operations"].map(category => <div key={category} className="border rounded-lg p-4">
            <h3 className="font-medium mb-4">{category}</h3>
            <div className="space-y-4">
              {permissions.filter(p => p.category === category).map(permission => <div key={permission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{permission.name}</p>
                      <p className="text-sm text-gray-500">
                        {permission.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={permission.enabled} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>)}
            </div>
          </div>)}
      </div>
    </div>;
  const renderSecurityRulesTab = () => <div className="space-y-6">
      {securityRules.map(rule => <div key={rule.id} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${rule.status === "active" ? "bg-green-50" : "bg-gray-50"}`}>
                <AlertTriangle className={`h-5 w-5 ${rule.status === "active" ? "text-green-600" : "text-gray-400"}`} />
              </div>
              <div>
                <h3 className="font-medium">{rule.name}</h3>
                <p className="text-sm text-gray-500">{rule.description}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={rule.status === "active"} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Threshold
              </label>
              <input type="number" className="w-full px-3 py-2 border rounded-lg" value={rule.threshold} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Action</label>
              <input type="text" className="w-full px-3 py-2 border rounded-lg" value={rule.action} />
            </div>
          </div>
        </div>)}
    </div>;
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Access Control</h1>
        <p className="text-gray-500">
          Manage system access and security policies
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold">Total Roles</h3>
          </div>
          <p className="text-2xl font-semibold">{roles.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold">Active Permissions</h3>
          </div>
          <p className="text-2xl font-semibold">
            {permissions.filter(p => p.enabled).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold">Security Rules</h3>
          </div>
          <p className="text-2xl font-semibold">
            {securityRules.filter(r => r.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Bell className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold">Policy Updates</h3>
          </div>
          <p className="text-2xl font-semibold">2</p>
          <p className="text-sm text-gray-500">Last 24 hours</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b">
          <nav className="flex">
            {(["roles", "permissions", "rules"] as const).map(tab => <button key={tab} className={`px-6 py-4 font-medium text-sm ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`} onClick={() => setActiveTab(tab)}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>)}
          </nav>
        </div>
        <div className="p-6">
          {activeTab === "roles" && renderRolesTab()}
          {activeTab === "permissions" && renderPermissionsTab()}
          {activeTab === "rules" && renderSecurityRulesTab()}
        </div>
      </div>
    </div>;
};