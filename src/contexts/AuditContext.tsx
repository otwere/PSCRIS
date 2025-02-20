import React, { useState, createContext, useContext } from "react";
export type AuditAction = "Create" | "Update" | "Delete" | "View" | "Export" | "Print" | "Login" | "Logout" | "Permission Change" | "Setting Change" | "System Update" | "Backup" | "Maintenance" | "Security Alert";
export type AuditSeverity = "Low" | "Medium" | "High" | "Critical";
export type AuditEntry = {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  action: AuditAction;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  success: boolean;
  severity?: AuditSeverity;
  metadata?: Record<string, any>;
  location?: string;
  deviceInfo?: string;
  sessionId?: string;
};
type AuditContextType = {
  logs: AuditEntry[];
  addLog: (entry: Omit<AuditEntry, "id" | "timestamp">) => void;
  getLogs: (filters: Partial<AuditEntry>) => AuditEntry[];
  getLogsByDateRange: (startDate: string, endDate: string) => AuditEntry[];
  getSecurityAlerts: () => AuditEntry[];
  getSystemEvents: () => AuditEntry[];
};
const AuditContext = createContext<AuditContextType | undefined>(undefined);
export const AuditProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [logs, setLogs] = useState<AuditEntry[]>(mockAuditLogs);
  const addLog = (entry: Omit<AuditEntry, "id" | "timestamp">) => {
    const newLog: AuditEntry = {
      ...entry,
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setLogs(prev => [...prev, newLog]);
  };
  const getLogs = (filters: Partial<AuditEntry>) => {
    return logs.filter(log => Object.entries(filters).every(([key, value]) => log[key as keyof AuditEntry] === value));
  };
  const getLogsByDateRange = (startDate: string, endDate: string) => {
    return logs.filter(log => log.timestamp >= startDate && log.timestamp <= endDate);
  };
  const getSecurityAlerts = () => {
    return logs.filter(log => log.action === "Security Alert");
  };
  const getSystemEvents = () => {
    return logs.filter(log => log.action === "System Update");
  };
  return <AuditContext.Provider value={{
    logs,
    addLog,
    getLogs,
    getLogsByDateRange,
    getSecurityAlerts,
    getSystemEvents
  }}>
      {children}
    </AuditContext.Provider>;
};
export const useAudit = () => {
  const context = useContext(AuditContext);
  if (context === undefined) {
    throw new Error("useAudit must be used within an AuditProvider");
  }
  return context;
};
const mockAuditLogs: AuditEntry[] = [{
  id: "LOG-001",
  timestamp: "2023-12-01T08:30:00Z",
  userId: "1",
  userName: "Fadhili Nuru",
  userRole: "admin",
  action: "Login",
  resource: "System",
  resourceId: "SYS-001",
  details: "Successful login attempt",
  ipAddress: "192.168.1.100",
  success: true,
  severity: "Low",
  deviceInfo: "Chrome/Windows",
  sessionId: "SESSION-001",
  location: "HQ Building"
}, {
  id: "LOG-002",
  timestamp: "2023-12-01T09:15:00Z",
  userId: "2",
  userName: "Sarah Johnson",
  userRole: "system_admin",
  action: "Setting Change",
  resource: "System Configuration",
  resourceId: "CFG-001",
  details: "Updated backup schedule",
  ipAddress: "192.168.1.101",
  success: true,
  severity: "Medium",
  metadata: {
    setting: "backup_schedule",
    oldValue: "daily",
    newValue: "twice_daily"
  }
}, {
  id: "LOG-003",
  timestamp: "2023-12-01T10:00:00Z",
  userId: "3",
  userName: "Security System",
  userRole: "system",
  action: "Security Alert",
  resource: "Authentication",
  resourceId: "AUTH-001",
  details: "Multiple failed login attempts detected",
  ipAddress: "192.168.1.150",
  success: false,
  severity: "High",
  metadata: {
    attempts: 5,
    timeframe: "5 minutes",
    blocked: true
  }
}, {
  id: "LOG-004",
  timestamp: "2023-12-01T11:30:00Z",
  userId: "4",
  userName: "System",
  userRole: "system",
  action: "Backup",
  resource: "Database",
  resourceId: "BCK-001",
  details: "Automated system backup completed",
  ipAddress: "192.168.1.1",
  success: true,
  severity: "Low",
  metadata: {
    size: "2.5GB",
    duration: "15 minutes",
    files: 1250
  }
}, {
  id: "LOG-005",
  timestamp: "2023-12-01T12:45:00Z",
  userId: "5",
  userName: "Mike Wilson",
  userRole: "officer",
  action: "View",
  resource: "Case File",
  resourceId: "CASE-123",
  details: "Accessed sensitive case information",
  ipAddress: "192.168.1.102",
  success: true,
  severity: "Medium",
  location: "Remote Access",
  deviceInfo: "Mobile/iOS"
}];