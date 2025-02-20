import React, { useState, createContext, useContext } from "react";
export type EvidenceType = "Physical" | "Digital" | "Document" | "Photo" | "Video" | "Audio" | "Forensic" | "Statement";
export type EvidenceStatus = "Collected" | "In Analysis" | "Analyzed" | "Stored" | "Released" | "Destroyed";
export type Evidence = {
  id: string;
  caseId: string;
  type: EvidenceType;
  description: string;
  status: EvidenceStatus;
  dateCollected: string;
  collectedBy: string;
  location: string;
  storageLocation: string;
  chainOfCustody: Array<{
    id: string;
    date: string;
    action: string;
    handler: string;
    notes: string;
  }>;
  tags: string[];
  photos: Array<{
    id: string;
    url: string;
    caption: string;
  }>;
  analysis: Array<{
    id: string;
    date: string;
    analyst: string;
    findings: string;
    status: "Pending" | "In Progress" | "Completed";
  }>;
};
type EvidenceContextType = {
  evidence: Evidence[];
  addEvidence: (evidence: Omit<Evidence, "id">) => void;
  updateEvidence: (id: string, updates: Partial<Evidence>) => void;
  updateChainOfCustody: (evidenceId: string, entry: Omit<Evidence["chainOfCustody"][0], "id">) => void;
  getEvidenceByCase: (caseId: string) => Evidence[];
};
const EvidenceContext = createContext<EvidenceContextType | undefined>(undefined);
export const EvidenceProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [evidence, setEvidence] = useState<Evidence[]>(mockEvidence);
  const addEvidence = (newEvidence: Omit<Evidence, "id">) => {
    const id = `EVD-${Date.now()}`;
    setEvidence(prev => [...prev, {
      ...newEvidence,
      id
    }]);
  };
  const updateEvidence = (id: string, updates: Partial<Evidence>) => {
    setEvidence(prev => prev.map(item => item.id === id ? {
      ...item,
      ...updates
    } : item));
  };
  const updateChainOfCustody = (evidenceId: string, entry: Omit<Evidence["chainOfCustody"][0], "id">) => {
    setEvidence(prev => prev.map(item => {
      if (item.id === evidenceId) {
        return {
          ...item,
          chainOfCustody: [...item.chainOfCustody, {
            ...entry,
            id: `COC-${Date.now()}`
          }]
        };
      }
      return item;
    }));
  };
  const getEvidenceByCase = (caseId: string) => {
    return evidence.filter(item => item.caseId === caseId);
  };
  return <EvidenceContext.Provider value={{
    evidence,
    addEvidence,
    updateEvidence,
    updateChainOfCustody,
    getEvidenceByCase
  }}>
      {children}
    </EvidenceContext.Provider>;
};
export const useEvidence = () => {
  const context = useContext(EvidenceContext);
  if (context === undefined) {
    throw new Error("useEvidence must be used within an EvidenceProvider");
  }
  return context;
};
const mockEvidence: Evidence[] = [{
  id: "EVD-001",
  caseId: "CR-2023-001",
  type: "Physical",
  description: "Shell casing found at crime scene",
  status: "In Analysis",
  dateCollected: "2023-12-01",
  collectedBy: "Det. Sarah Johnson",
  location: "123 Main Street",
  storageLocation: "Evidence Locker B-12",
  chainOfCustody: [{
    id: "COC-001",
    date: "2023-12-01",
    action: "Collected",
    handler: "Det. Sarah Johnson",
    notes: "Found near entrance"
  }, {
    id: "COC-002",
    date: "2023-12-02",
    action: "Transferred",
    handler: "Evidence Tech John Smith",
    notes: "Transferred to forensics lab"
  }],
  tags: ["Weapon", "Ballistics", "Priority"],
  photos: [{
    id: "PHT-001",
    url: "https://example.com/evidence/photo1.jpg",
    caption: "Shell casing in situ"
  }],
  analysis: [{
    id: "ANL-001",
    date: "2023-12-03",
    analyst: "Dr. Jane Wilson",
    findings: "Matches 9mm Glock",
    status: "Completed"
  }]
}];