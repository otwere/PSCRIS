import React, { useEffect, useState, createContext, useContext } from "react";
type UserRole = "super_admin" | "admin" | "officer" | "dispatcher";
type Permissions = {
  canManageUsers: boolean;
  canManageDepartments: boolean;
  canViewAudit: boolean;
  canManageSystem: boolean;
  canAssignRoles: boolean;
};
type User = {
  id: string;
  name: string;
  role: UserRole;
  permissions: Permissions;
  department?: string;
};
type AuthContextType = {
  user: User | null;
  login: (credentials: {
    username: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  hasPermission: (permission: keyof Permissions) => boolean;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const getPermissionsForRole = (role: UserRole): Permissions => {
  switch (role) {
    case "super_admin":
      return {
        canManageUsers: true,
        canManageDepartments: true,
        canViewAudit: true,
        canManageSystem: true,
        canAssignRoles: true
      };
    case "admin":
      return {
        canManageUsers: true,
        canManageDepartments: true,
        canViewAudit: true,
        canManageSystem: false,
        canAssignRoles: false
      };
    case "officer":
      return {
        canManageUsers: false,
        canManageDepartments: false,
        canViewAudit: false,
        canManageSystem: false,
        canAssignRoles: false
      };
    default:
      return {
        canManageUsers: false,
        canManageDepartments: false,
        canViewAudit: false,
        canManageSystem: false,
        canAssignRoles: false
      };
  }
};
const getStoredUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  const login = async (credentials: {
    username: string;
    password: string;
  }) => {
    // Simulate API call
    if (credentials.username === "admin" && credentials.password === "admin") {
      const userData: User = {
        id: "1",
        name: "John Doe",
        role: "super_admin",
        permissions: getPermissionsForRole("super_admin")
      };
      setUser(userData);
    } else {
      throw new Error("Invalid credentials");
    }
  };
  const logout = () => {
    setUser(null);
  };
  const hasPermission = (permission: keyof Permissions): boolean => {
    return user?.permissions?.[permission] || false;
  };
  return <AuthContext.Provider value={{
    user,
    login,
    logout,
    hasPermission
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};