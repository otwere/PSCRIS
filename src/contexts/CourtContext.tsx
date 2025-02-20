import React, { useState, createContext, useContext } from "react";
export type CourtCaseStatus = "Filed" | "Scheduled" | "In Progress" | "Under Review" | "Judgment Pending" | "Closed" | "Appealed";
export type CourtDocument = {
  id: string;
  title: string;
  type: string;
  fileNumber: string;
  dateSubmitted: string;
  submittedBy: string;
  status: "Pending" | "Approved" | "Rejected";
  description: string;
  url: string;
};
export type CourtHearing = {
  id: string;
  date: string;
  time: string;
  type: string;
  judge: string;
  courtRoom: string;
  status: "Scheduled" | "Completed" | "Postponed" | "Cancelled";
  notes?: string;
  participants: string[];
};
export type CourtCase = {
  id: string;
  caseNumber: string;
  relatedCaseId: string;
  title: string;
  type: "Criminal" | "Civil";
  court: string;
  judge: string;
  status: CourtCaseStatus;
  filingDate: string;
  plaintiff: {
    name: string;
    representative: string;
  };
  defendant: {
    name: string;
    representative: string;
  };
  hearings: CourtHearing[];
  documents: CourtDocument[];
  updates: Array<{
    id: string;
    date: string;
    description: string;
    by: string;
  }>;
};
type CourtContextType = {
  courtCases: CourtCase[];
  addCourtCase: (courtCase: Omit<CourtCase, "id">) => void;
  updateCourtCase: (id: string, updates: Partial<CourtCase>) => void;
  addHearing: (caseId: string, hearing: Omit<CourtHearing, "id">) => void;
  addDocument: (caseId: string, document: Omit<CourtDocument, "id">) => void;
};
const CourtContext = createContext<CourtContextType | undefined>(undefined);
export const CourtProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [courtCases, setCourtCases] = useState<CourtCase[]>(mockCourtCases);
  const addCourtCase = (courtCase: Omit<CourtCase, "id">) => {
    const id = `CRT-${Date.now()}`;
    setCourtCases(prev => [...prev, {
      ...courtCase,
      id
    }]);
  };
  const updateCourtCase = (id: string, updates: Partial<CourtCase>) => {
    setCourtCases(prev => prev.map(case_ => case_.id === id ? {
      ...case_,
      ...updates
    } : case_));
  };
  const addHearing = (caseId: string, hearing: Omit<CourtHearing, "id">) => {
    setCourtCases(prev => prev.map(case_ => {
      if (case_.id === caseId) {
        return {
          ...case_,
          hearings: [...case_.hearings, {
            ...hearing,
            id: `HRG-${Date.now()}`
          }]
        };
      }
      return case_;
    }));
  };
  const addDocument = (caseId: string, document: Omit<CourtDocument, "id">) => {
    setCourtCases(prev => prev.map(case_ => {
      if (case_.id === caseId) {
        return {
          ...case_,
          documents: [...case_.documents, {
            ...document,
            id: `DOC-${Date.now()}`
          }]
        };
      }
      return case_;
    }));
  };
  return <CourtContext.Provider value={{
    courtCases,
    addCourtCase,
    updateCourtCase,
    addHearing,
    addDocument
  }}>
      {children}
    </CourtContext.Provider>;
};
export const useCourt = () => {
  const context = useContext(CourtContext);
  if (context === undefined) {
    throw new Error("useCourt must be used within a CourtProvider");
  }
  return context;
};
const mockCourtCases: CourtCase[] = [{
  id: "CRT-001",
  caseNumber: "2023-CR-001",
  relatedCaseId: "CR-2023-001",
  title: "State vs. John Doe",
  type: "Criminal",
  court: "High Court",
  judge: "Hon. Justice Sarah Williams",
  status: "In Progress",
  filingDate: "2023-12-05",
  plaintiff: {
    name: "State",
    representative: "District Attorney Michael Brown"
  },
  defendant: {
    name: "John Doe",
    representative: "Adv. James Wilson"
  },
  hearings: [{
    id: "HRG-001",
    date: "2023-12-15",
    time: "10:00 AM",
    type: "Initial Hearing",
    judge: "Hon. Justice Sarah Williams",
    courtRoom: "Court Room 3A",
    status: "Scheduled",
    participants: ["District Attorney", "Defense Counsel", "Defendant"]
  }],
  documents: [{
    id: "DOC-001",
    title: "Charge Sheet",
    type: "Legal Document",
    fileNumber: "CS-2023-001",
    dateSubmitted: "2023-12-05",
    submittedBy: "District Attorney Office",
    status: "Approved",
    description: "Official charge sheet detailing criminal charges",
    url: "https://example.com/documents/charge-sheet.pdf"
  }],
  updates: [{
    id: "UPD-001",
    date: "2023-12-05",
    description: "Case filed and registered",
    by: "Court Registry"
  }]
}, {
  id: "CRT-002",
  caseNumber: "2023-CV-045",
  relatedCaseId: "CV-2023-045",
  title: "Smith vs. Johnson Property Dispute",
  type: "Civil",
  court: "Civil Court",
  judge: "Hon. Justice Robert Chen",
  status: "Scheduled",
  filingDate: "2023-12-02",
  plaintiff: {
    name: "John Smith",
    representative: "Adv. Maria Garcia"
  },
  defendant: {
    name: "Mary Johnson",
    representative: "Adv. David Kim"
  },
  hearings: [],
  documents: [],
  updates: [{
    id: "UPD-002",
    date: "2023-12-02",
    description: "Civil suit filed",
    by: "Court Registry"
  }]
}];