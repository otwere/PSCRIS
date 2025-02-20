import React, { useState, createContext, useContext } from "react";
export type WitnessType = "Eyewitness" | "Character" | "Expert" | "Victim" | "Other";
export type StatementStatus = "Pending" | "Recorded" | "Verified" | "Retracted";
export type WitnessStatement = {
  id: string;
  caseId: string;
  witnessId: string;
  witness: {
    name: string;
    contact: string;
    address: string;
    type: WitnessType;
    credibility: "High" | "Medium" | "Low" | "Unknown";
    relationship: string;
  };
  statement: {
    date: string;
    location: string;
    content: string;
    recordedBy: string;
    status: StatementStatus;
    attachments: Array<{
      id: string;
      type: string;
      url: string;
      description: string;
    }>;
  };
  verificationDetails: {
    verifiedBy: string;
    date: string;
    notes: string;
    status: "Pending" | "Verified" | "Inconsistent";
  };
  followUp: Array<{
    id: string;
    date: string;
    officer: string;
    notes: string;
    outcome: string;
  }>;
};
type WitnessContextType = {
  statements: WitnessStatement[];
  addStatement: (statement: Omit<WitnessStatement, "id">) => void;
  updateStatement: (id: string, updates: Partial<WitnessStatement>) => void;
  getStatementsByCase: (caseId: string) => WitnessStatement[];
};
const WitnessContext = createContext<WitnessContextType | undefined>(undefined);
export const WitnessProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [statements, setStatements] = useState<WitnessStatement[]>(mockStatements);
  const addStatement = (statement: Omit<WitnessStatement, "id">) => {
    const id = `WS-${Date.now()}`;
    setStatements(prev => [...prev, {
      ...statement,
      id
    }]);
  };
  const updateStatement = (id: string, updates: Partial<WitnessStatement>) => {
    setStatements(prev => prev.map(statement => statement.id === id ? {
      ...statement,
      ...updates
    } : statement));
  };
  const getStatementsByCase = (caseId: string) => {
    return statements.filter(statement => statement.caseId === caseId);
  };
  return <WitnessContext.Provider value={{
    statements,
    addStatement,
    updateStatement,
    getStatementsByCase
  }}>
      {children}
    </WitnessContext.Provider>;
};
export const useWitness = () => {
  const context = useContext(WitnessContext);
  if (context === undefined) {
    throw new Error("useWitness must be used within a WitnessProvider");
  }
  return context;
};
const mockStatements: WitnessStatement[] = [{
  id: "WS-001",
  caseId: "CR-2023-001",
  witnessId: "W001",
  witness: {
    name: "Jane Smith",
    contact: "555-0123",
    address: "789 Oak St",
    type: "Eyewitness",
    credibility: "High",
    relationship: "Store Employee"
  },
  statement: {
    date: "2023-12-01",
    location: "Police Station",
    content: "I was working at the counter when two masked men entered...",
    recordedBy: "Det. Sarah Johnson",
    status: "Verified",
    attachments: [{
      id: "ATT-001",
      type: "Audio",
      url: "https://example.com/statements/audio1.mp3",
      description: "Original recorded statement"
    }]
  },
  verificationDetails: {
    verifiedBy: "Sgt. Mike Thompson",
    date: "2023-12-02",
    notes: "Statement matches security footage",
    status: "Verified"
  },
  followUp: [{
    id: "FU-001",
    date: "2023-12-03",
    officer: "Det. Sarah Johnson",
    notes: "Witness able to identify suspect from photo lineup",
    outcome: "Positive identification"
  }]
}];