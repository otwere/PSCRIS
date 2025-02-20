import React from "react";
import { Shield, Plus, Edit, Trash2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
export const RoleManagement = () => {
  const {
    hasPermission
  } = useAuth();
  const mockRoles = [{
    id: "ROLE001",
    name: "Super Admin",
    description: "Full system access with all permissions",
    users: 2,
    permissions: ["User Management", "Role Management", "System Configuration", "Audit Logs", "Case Management"],
    lastModified: "2023-12-01"
  }, {
    id: "ROLE002",
    name: "Department Admin",
    description: "Department-level administrative access",
    users: 5,
    permissions: ["Case Management", "Officer Management", "Department Reports"],
    lastModified: "2023-12-01"
  }];
  if (!hasPermission("canManageRoles")) {
    return <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Access Denied</h2>
          <p className="text-gray-500 mt-2">
            You don't have permission to manage roles.
          </p>
        </div>
      </div>;
  }
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Role Management</h1>
        <p className="text-gray-500">Manage system roles and permissions</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Create Role
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {mockRoles.map(role => <div key={role.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium text-lg">{role.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">
                      {role.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-50 rounded">
                      <Edit className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-50 rounded">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Active Users</p>
                    <p className="font-medium">{role.users}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Last Modified</p>
                    <p className="font-medium">{role.lastModified}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-2">Permissions</p>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map(permission => <span key={permission} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                        {permission}
                      </span>)}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};