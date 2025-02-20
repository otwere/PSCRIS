import React, { useState } from "react";
import { Search, UserPlus, Shield, Edit, Trash2, Lock, MoreVertical, CheckCircle, XCircle, AlertCircle, Filter, Download, Users, Building2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Pagination } from "../components/Pagination";
type UserRole = "admin" | "detective" | "officer" | "dispatcher" | "analyst";
type UserStatus = "active" | "inactive" | "suspended" | "pending";
type PasswordPolicy = {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecial: boolean;
};
const passwordPolicy: PasswordPolicy = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecial: true
};
export const UserManagement = () => {
  const {
    hasPermission
  } = useAuth();
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showActions, setShowActions] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<UserRole | "all">("all");
  const [filterStatus, setFilterStatus] = useState<UserStatus | "all">("all");
  const [filterDepartment, setFilterDepartment] = useState<string>("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showPasswordPolicy, setShowPasswordPolicy] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: "disable" | "delete" | "enable" | null;
    userId: string | null;
  }>({
    type: null,
    userId: null
  });
  const [bulkAction, setBulkAction] = useState<{
    type: "activate" | "deactivate" | "delete" | null;
    count: number;
  }>({
    type: null,
    count: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const handleBulkSelect = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map(u => u.id));
    } else {
      setSelectedUsers([]);
    }
  };
  const handleBulkAction = (action: "activate" | "deactivate" | "delete") => {
    console.log(`Bulk ${action} for users:`, selectedUsers);
  };
  const validatePassword = (password: string): boolean => {
    if (password.length < passwordPolicy.minLength) return false;
    if (passwordPolicy.requireUppercase && !/[A-Z]/.test(password)) return false;
    if (passwordPolicy.requireLowercase && !/[a-z]/.test(password)) return false;
    if (passwordPolicy.requireNumbers && !/[0-9]/.test(password)) return false;
    if (passwordPolicy.requireSpecial && !/[!@#$%^&*]/.test(password)) return false;
    return true;
  };
  const ConfirmationDialog = () => {
    if (!confirmAction.type || !confirmAction.userId) return null;
    const user = mockUsers.find(u => u.id === confirmAction.userId);
    if (!user) return null;
    return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to{" "}
            {confirmAction.type === "disable" ? "disable" : confirmAction.type === "enable" ? "enable" : "delete"}{" "}
            the account for {user.name}?
          </p>
          <div className="flex justify-end gap-4">
            <button onClick={() => setConfirmAction({
            type: null,
            userId: null
          })} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button onClick={() => {
            console.log(`${confirmAction.type} user ${confirmAction.userId}`);
            setConfirmAction({
              type: null,
              userId: null
            });
          }} className={`px-4 py-2 text-white rounded-lg ${confirmAction.type === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}>
              Confirm
            </button>
          </div>
        </div>
      </div>;
  };
  const BulkActionConfirmation = () => {
    if (!bulkAction.type) return null;
    return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4">Confirm Bulk Action</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to {bulkAction.type} {bulkAction.count}{" "}
            selected users?
          </p>
          <div className="flex justify-end gap-4">
            <button onClick={() => setBulkAction({
            type: null,
            count: 0
          })} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button onClick={() => {
            handleBulkAction(bulkAction.type as any);
            setBulkAction({
              type: null,
              count: 0
            });
          }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Confirm
            </button>
          </div>
        </div>
      </div>;
  };
  const ResetPasswordModal = ({
    user,
    onClose
  }: {
    user: User;
    onClose: () => void;
  }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (!validatePassword(password)) {
        setError("Password does not meet requirements");
        return;
      }
      console.log(`Reset password for user ${user.id}`);
      onClose();
    };
    return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-full max-w-md p-6">
          <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                New Password
              </label>
              <input type="password" className="w-full px-4 py-2 border rounded-lg" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input type="password" className="w-full px-4 py-2 border rounded-lg" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>}
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                Password Requirements:
              </h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Minimum {passwordPolicy.minLength} characters</li>
                <li>• At least one uppercase letter</li>
                <li>• At least one lowercase letter</li>
                <li>• At least one number</li>
                <li>• At least one special character (!@#$%^&*)</li>
              </ul>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>;
  };
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    const matchesDepartment = filterDepartment === "all" || user.department === filterDepartment;
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  if (!hasPermission("canManageUsers")) {
    return <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">Access Denied</h2>
          <p className="text-gray-500 mt-2">
            You don't have permission to manage users.
          </p>
        </div>
      </div>;
  }
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">User Management</h1>
        <p className="text-gray-500">
          Manage system users and their permissions
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold">Active Users</h3>
          </div>
          <p className="text-2xl font-semibold">
            {mockUsers.filter(u => u.status === "active").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="font-semibold">Inactive Users</h3>
          </div>
          <p className="text-2xl font-semibold">
            {mockUsers.filter(u => u.status === "inactive").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold">Departments</h3>
          </div>
          <p className="text-2xl font-semibold">{departments.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold">Total Roles</h3>
          </div>
          <p className="text-2xl font-semibold">{roles.length}</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search users..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={filterRole} onChange={e => setFilterRole(e.target.value as UserRole | "all")}>
                <option value="all">All Roles</option>
                {roles.map(role => <option key={role} value={role}>
                    {role}
                  </option>)}
              </select>
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={filterStatus} onChange={e => setFilterStatus(e.target.value as UserStatus | "all")}>
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
              <select className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={filterDepartment} onChange={e => setFilterDepartment(e.target.value)}>
                <option value="all">All Departments</option>
                {departments.map(dept => <option key={dept} value={dept}>
                    {dept}
                  </option>)}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsNewUserModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <UserPlus className="h-4 w-4" />
                Add User
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
          {selectedUsers.length > 0 && <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedUsers.length} users selected
              </span>
              <div className="flex gap-2">
                <button onClick={() => setBulkAction({
              type: "activate",
              count: selectedUsers.length
            })} className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                  Activate
                </button>
                <button onClick={() => setBulkAction({
              type: "deactivate",
              count: selectedUsers.length
            })} className="px-3 py-1 text-sm text-orange-600 hover:bg-orange-50 rounded">
                  Deactivate
                </button>
                <button onClick={() => setBulkAction({
              type: "delete",
              count: selectedUsers.length
            })} className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                  Delete
                </button>
              </div>
            </div>}
        </div>
        <div className="p-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th className="pb-4 px-4">
                  <input type="checkbox" onChange={e => handleBulkSelect(e.target.checked)} />
                </th>
                <th className="pb-4">User</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Department</th>
                <th className="pb-4">Last Active</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {paginatedUsers.map(user => <tr key={user.id} className="border-t border-gray-100">
                  <td className="py-4 px-4">
                    <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={e => {
                  if (e.target.checked) {
                    setSelectedUsers([...selectedUsers, user.id]);
                  } else {
                    setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                  }
                }} />
                  </td>
                  <td className="py-4">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-gray-500">{user.email}</p>
                      {user.badgeNumber && <p className="text-xs text-gray-400">
                          Badge: {user.badgeNumber}
                        </p>}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      {user.department}
                    </div>
                  </td>
                  <td className="py-4 text-gray-500">{user.lastActive}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${user.status === "active" ? "bg-green-50 text-green-600" : user.status === "inactive" ? "bg-red-50 text-red-600" : user.status === "suspended" ? "bg-orange-50 text-orange-600" : "bg-gray-50 text-gray-600"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="relative">
                      <button onClick={() => setShowActions(showActions === user.id ? null : user.id)} className="p-2 hover:bg-gray-50 rounded-lg">
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>
                      {showActions === user.id && <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
                          <button onClick={() => {
                      setSelectedUser(user);
                      setIsEditUserModalOpen(true);
                    }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <Edit className="h-4 w-4" />
                            Edit User
                          </button>
                          <button onClick={() => {
                      setSelectedUser(user);
                      setIsResetPasswordModalOpen(true);
                    }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
                            <Lock className="h-4 w-4" />
                            Reset Password
                          </button>
                          <button onClick={() => {
                      setConfirmAction({
                        type: user.status === "active" ? "disable" : "enable",
                        userId: user.id
                      });
                    }} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600">
                            <AlertCircle className="h-4 w-4" />
                            {user.status === "active" ? "Disable Account" : "Enable Account"}
                          </button>
                        </div>}
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
          <Pagination currentPage={currentPage} totalItems={filteredUsers.length} pageSize={pageSize} onPageChange={setCurrentPage} onPageSizeChange={setPageSize} />
        </div>
      </div>
      {isNewUserModalOpen && <NewUserModal onClose={() => setIsNewUserModalOpen(false)} departments={departments} roles={roles} />}
      {isEditUserModalOpen && selectedUser && <EditUserModal user={selectedUser} onClose={() => {
      setIsEditUserModalOpen(false);
      setSelectedUser(null);
    }} departments={departments} roles={roles} />}
      {isResetPasswordModalOpen && selectedUser && <ResetPasswordModal user={selectedUser} onClose={() => {
      setIsResetPasswordModalOpen(false);
      setSelectedUser(null);
    }} />}
      {showPasswordPolicy && <PasswordPolicyModal onClose={() => setShowPasswordPolicy(false)} policy={passwordPolicy} />}
      <ConfirmationDialog />
      <BulkActionConfirmation />
    </div>;
};
const NewUserModal = ({
  onClose,
  departments,
  roles
}: {
  onClose: () => void;
  departments: string[];
  roles: UserRole[];
}) => {
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Create New User</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select className="w-full px-4 py-2 border rounded-lg">
              {roles.map(role => <option key={role} value={role}>
                  {role}
                </option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <select className="w-full px-4 py-2 border rounded-lg">
              {departments.map(dept => <option key={dept} value={dept}>
                  {dept}
                </option>)}
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>;
};
const EditUserModal = ({
  user,
  onClose,
  departments,
  roles
}: {
  user: any;
  onClose: () => void;
  departments: string[];
  roles: UserRole[];
}) => {
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg" defaultValue={user.name} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg" defaultValue={user.email} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select className="w-full px-4 py-2 border rounded-lg" defaultValue={user.role}>
              {roles.map(role => <option key={role} value={role}>
                  {role}
                </option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Department</label>
            <select className="w-full px-4 py-2 border rounded-lg" defaultValue={user.department}>
              {departments.map(dept => <option key={dept} value={dept}>
                  {dept}
                </option>)}
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>;
};
const ResetPasswordModal = ({
  user,
  onClose
}: {
  user: any;
  onClose: () => void;
}) => {
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>
            <input type="password" className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input type="password" className="w-full px-4 py-2 border rounded-lg" required />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>;
};
const PasswordPolicyModal = ({
  onClose,
  policy
}: {
  onClose: () => void;
  policy: PasswordPolicy;
}) => {
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">Password Policy</h3>
        <p className="text-gray-600 mb-6">
          The password must meet the following requirements:
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Minimum Length:</span>
            <span className="text-sm">{policy.minLength}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Uppercase:</span>
            <span className="text-sm">
              {policy.requireUppercase ? "Required" : "Not Required"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Lowercase:</span>
            <span className="text-sm">
              {policy.requireLowercase ? "Required" : "Not Required"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Numbers:</span>
            <span className="text-sm">
              {policy.requireNumbers ? "Required" : "Not Required"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Special Characters:</span>
            <span className="text-sm">
              {policy.requireSpecial ? "Required" : "Not Required"}
            </span>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>;
};