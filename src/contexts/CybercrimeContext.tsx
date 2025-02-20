import React, { useState, createContext, useContext } from "react";
export type CyberIncidentType = "Malware" | "Phishing" | "Data Breach" | "Ransomware" | "DDoS" | "Identity Theft" | "Social Engineering" | "Cyber Fraud";
export type CyberIncidentStatus = "Active" | "Under Investigation" | "Contained" | "Resolved" | "Archived";
export type CyberIncidentSeverity = "Critical" | "High" | "Medium" | "Low";
export type CyberIncident = {
  id: string;
  type: CyberIncidentType;
  title: string;
  description: string;
  status: CyberIncidentStatus;
  severity: CyberIncidentSeverity;
  reportedDate: string;
  lastUpdated: string;
  affectedSystems: string[];
  ipAddresses: string[];
  targetedEntity: string;
  estimatedImpact: string;
  investigator: string;
  evidenceFiles: Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
  }>;
  timeline: Array<{
    id: string;
    date: string;
    action: string;
    description: string;
    performer: string;
  }>;
};
type CybercrimeContextType = {
  incidents: CyberIncident[];
  statistics: {
    totalIncidents: number;
    activeThreats: number;
    resolvedCases: number;
    averageResolutionTime: number;
  };
  addIncident: (incident: Omit<CyberIncident, "id">) => void;
  updateIncident: (id: string, updates: Partial<CyberIncident>) => void;
};
const CybercrimeContext = createContext<CybercrimeContextType | undefined>(undefined);
const mockIncidents: CyberIncident[] = [{
  id: "CYB-2024-001",
  type: "Ransomware",
  title: "Municipal Systems Ransomware Attack",
  description: "Critical ransomware attack targeting municipal systems, affecting multiple departments",
  status: "Active",
  severity: "Critical",
  reportedDate: "2024-01-15T08:30:00",
  lastUpdated: "2024-01-15T14:45:00",
  affectedSystems: ["File Servers", "Email Systems", "Payment Processing", "Database Servers"],
  ipAddresses: ["192.168.1.100", "192.168.1.120", "192.168.1.150"],
  targetedEntity: "City Administration",
  estimatedImpact: "High - Multiple Critical Services Affected",
  investigator: "Sarah Chen",
  evidenceFiles: [{
    id: "EV-001",
    name: "ransom_note.txt",
    type: "text/plain",
    size: "2.5 KB",
    uploadedAt: "2024-01-15T09:15:00"
  }, {
    id: "EV-002",
    name: "system_logs.zip",
    type: "application/zip",
    size: "156 MB",
    uploadedAt: "2024-01-15T10:30:00"
  }],
  timeline: [{
    id: "TL-001",
    date: "2024-01-15T08:30:00",
    action: "Initial Detection",
    description: "Ransomware detected in municipal systems",
    performer: "System Monitor"
  }, {
    id: "TL-002",
    date: "2024-01-15T09:00:00",
    action: "Investigation Started",
    description: "Cybercrime unit deployed to assess the situation",
    performer: "Sarah Chen"
  }]
}, {
  id: "CYB-2024-002",
  type: "Data Breach",
  title: "Healthcare Provider Data Breach",
  description: "Unauthorized access to patient records detected at local healthcare provider",
  status: "Under Investigation",
  severity: "High",
  reportedDate: "2024-01-14T15:20:00",
  lastUpdated: "2024-01-15T11:30:00",
  affectedSystems: ["Patient Records", "Billing Systems"],
  ipAddresses: ["10.0.0.50", "10.0.0.51"],
  targetedEntity: "City General Hospital",
  estimatedImpact: "Medium - Patient Data Potentially Compromised",
  investigator: "Michael Wong",
  evidenceFiles: [{
    id: "EV-003",
    name: "access_logs.csv",
    type: "text/csv",
    size: "45 MB",
    uploadedAt: "2024-01-14T16:00:00"
  }],
  timeline: [{
    id: "TL-003",
    date: "2024-01-14T15:20:00",
    action: "Breach Detected",
    description: "Unusual data access patterns detected",
    performer: "Security System"
  }]
}];
export const CybercrimeProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [incidents, setIncidents] = useState<CyberIncident[]>(mockIncidents);
  const statistics = {
    totalIncidents: incidents.length,
    activeThreats: incidents.filter(i => i.status === "Active").length,
    resolvedCases: incidents.filter(i => i.status === "Resolved").length,
    averageResolutionTime: 72 // hours
  };
  const addIncident = (incident: Omit<CyberIncident, "id">) => {
    const newIncident = {
      ...incident,
      id: `CYB-${new Date().getFullYear()}-${String(incidents.length + 1).padStart(3, "0")}`
    };
    setIncidents(prev => [...prev, newIncident]);
  };
  const updateIncident = (id: string, updates: Partial<CyberIncident>) => {
    setIncidents(prev => prev.map(incident => incident.id === id ? {
      ...incident,
      ...updates
    } : incident));
  };
  return <CybercrimeContext.Provider value={{
    incidents,
    statistics,
    addIncident,
    updateIncident
  }}>
      {children}
    </CybercrimeContext.Provider>;
};
export const useCybercrime = () => {
  const context = useContext(CybercrimeContext);
  if (context === undefined) {
    throw new Error("useCybercrime must be used within a CybercrimeProvider");
  }
  return context;
};