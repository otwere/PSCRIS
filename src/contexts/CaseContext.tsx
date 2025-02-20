import React, { useState, createContext, useContext } from "react";
export type CaseType = "Civil" | "Crime";
export type CaseStatus = "Open" | "Under Investigation" | "Pending Review" | "Court Proceeding" | "Resolved" | "Closed";
export type CasePriority = "Low" | "Medium" | "High" | "Critical";
export type Case = {
  id: string;
  type: CaseType;
  title: string;
  description: string;
  status: CaseStatus;
  priority: CasePriority;
  location: string;
  dateReported: string;
  dateOfIncident: string;
  assignedOfficer: string;
  department: string;
  victims: string[];
  suspects: string[];
  evidence: Array<{
    id: string;
    type: string;
    description: string;
    dateCollected: string;
  }>;
  updates: Array<{
    id: string;
    date: string;
    officer: string;
    description: string;
  }>;
};
type CaseContextType = {
  cases: Case[];
  addCase: (newCase: Omit<Case, "id">) => void;
  updateCase: (id: string, updates: Partial<Case>) => void;
};
const CaseContext = createContext<CaseContextType | undefined>(undefined);
export const CaseProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const addCase = (newCase: Omit<Case, "id">) => {
    const caseId = newCase.type === "Civil" ? `CV-${new Date().getFullYear()}-${String(cases.length + 1).padStart(3, "0")}` : `CR-${new Date().getFullYear()}-${String(cases.length + 1).padStart(3, "0")}`;
    setCases(prev => [...prev, {
      ...newCase,
      id: caseId
    }]);
  };
  const updateCase = (id: string, updates: Partial<Case>) => {
    setCases(prev => prev.map(case_ => case_.id === id ? {
      ...case_,
      ...updates
    } : case_));
  };
  return <CaseContext.Provider value={{
    cases,
    addCase,
    updateCase
  }}>
      {children}
    </CaseContext.Provider>;
};
export const useCase = () => {
  const context = useContext(CaseContext);
  if (context === undefined) {
    throw new Error("useCase must be used within a CaseProvider");
  }
  return context;
};
const mockCases: Case[] = [{
  id: "CR-2023-001",
  type: "Crime",
  title: "Armed Robbery at Local Store",
  description: "Armed robbery at convenience store on Main Street. Two suspects, one armed with handgun.",
  status: "Under Investigation",
  priority: "High",
  location: "123 Main Street",
  dateReported: "2023-12-01",
  dateOfIncident: "2023-12-01",
  assignedOfficer: "Det. Sarah Johnson",
  department: "Violent Crimes Unit",
  victims: ["Store Owner", "Store Clerk"],
  suspects: ["Unknown Male 1", "Unknown Male 2"],
  evidence: [{
    id: "E001",
    type: "Video",
    description: "CCTV footage from store",
    dateCollected: "2023-12-01"
  }, {
    id: "E002",
    type: "Physical",
    description: "Shell casing found at scene",
    dateCollected: "2023-12-01"
  }],
  updates: [{
    id: "U001",
    date: "2023-12-01",
    officer: "Ofc. Mike Smith",
    description: "Initial response and scene secured"
  }, {
    id: "U002",
    date: "2023-12-02",
    officer: "Det. Sarah Johnson",
    description: "CCTV footage collected and witness statements taken"
  }]
}, {
  id: "CV-2023-045",
  type: "Civil",
  title: "Property Boundary Dispute",
  description: "Ongoing dispute between neighbors regarding property boundary line",
  status: "Pending Review",
  priority: "Medium",
  location: "456 Oak Avenue",
  dateReported: "2023-12-02",
  dateOfIncident: "2023-11-30",
  assignedOfficer: "Ofc. Robert Chen",
  department: "Community Relations",
  victims: ["John Smith", "Mary Johnson"],
  suspects: [],
  evidence: [{
    id: "E003",
    type: "Document",
    description: "Property survey documents",
    dateCollected: "2023-12-02"
  }],
  updates: [{
    id: "U003",
    date: "2023-12-02",
    officer: "Ofc. Robert Chen",
    description: "Initial complaint filed and documentation collected"
  }]
}];
export const departmentsList = ["Violent Crimes Unit", "Property Crimes Unit", "Narcotics", "Traffic Division", "Community Relations", "Special Victims Unit", "Cybercrime Unit", "Homicide"];
export const evidenceTypes = ["Physical", "Digital", "Document", "Photo", "Video", "Audio", "Forensic", "Statement"];