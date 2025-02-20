import React, { useState, createContext, useContext } from "react";
export type InmateStatus = "Booked" | "In Custody" | "Released" | "Transferred" | "Court Appearance" | "Medical Hold";
export type MedicalStatus = {
  conditions: string[];
  medications: string[];
  allergies: string[];
  lastCheckup: string;
  specialNeeds: string[];
};
export type PropertyItem = {
  id: string;
  type: string;
  description: string;
  value?: string;
  status: "Stored" | "Released" | "Confiscated";
};
export type VisitationRecord = {
  id: string;
  date: string;
  visitorName: string;
  relationship: string;
  type: "Personal" | "Legal" | "Professional";
  duration: string;
  notes?: string;
};
export type Inmate = {
  id: string;
  bookingNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  race: string;
  height: string;
  weight: string;
  eyeColor: string;
  hairColor: string;
  identifyingMarks: string[];
  status: InmateStatus;
  bookingDate: string;
  releaseDate?: string;
  charges: Array<{
    id: string;
    charge: string;
    severity: "Felony" | "Misdemeanor";
    status: "Pending" | "Convicted" | "Dismissed";
    court: string;
  }>;
  cellBlock: string;
  cellNumber: string;
  medicalInfo: MedicalStatus;
  property: PropertyItem[];
  visits: VisitationRecord[];
  securityLevel: "Minimum" | "Medium" | "Maximum";
  attorney?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  notes: Array<{
    id: string;
    date: string;
    type: string;
    content: string;
    officer: string;
  }>;
};
type InmateContextType = {
  inmates: Inmate[];
  addInmate: (inmate: Omit<Inmate, "id">) => void;
  updateInmate: (id: string, updates: Partial<Inmate>) => void;
  addVisitation: (inmateId: string, visit: Omit<VisitationRecord, "id">) => void;
  addNote: (inmateId: string, note: Omit<Inmate["notes"][0], "id">) => void;
};
const InmateContext = createContext<InmateContextType | undefined>(undefined);
export const InmateProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [inmates, setInmates] = useState<Inmate[]>(mockInmates);
  const addInmate = (inmate: Omit<Inmate, "id">) => {
    const id = `INM-${Date.now()}`;
    setInmates(prev => [...prev, {
      ...inmate,
      id
    }]);
  };
  const updateInmate = (id: string, updates: Partial<Inmate>) => {
    setInmates(prev => prev.map(inmate => inmate.id === id ? {
      ...inmate,
      ...updates
    } : inmate));
  };
  const addVisitation = (inmateId: string, visit: Omit<VisitationRecord, "id">) => {
    setInmates(prev => prev.map(inmate => {
      if (inmate.id === inmateId) {
        return {
          ...inmate,
          visits: [...inmate.visits, {
            ...visit,
            id: `VIS-${Date.now()}`
          }]
        };
      }
      return inmate;
    }));
  };
  const addNote = (inmateId: string, note: Omit<Inmate["notes"][0], "id">) => {
    setInmates(prev => prev.map(inmate => {
      if (inmate.id === inmateId) {
        return {
          ...inmate,
          notes: [...inmate.notes, {
            ...note,
            id: `NOTE-${Date.now()}`
          }]
        };
      }
      return inmate;
    }));
  };
  return <InmateContext.Provider value={{
    inmates,
    addInmate,
    updateInmate,
    addVisitation,
    addNote
  }}>
      {children}
    </InmateContext.Provider>;
};
export const useInmate = () => {
  const context = useContext(InmateContext);
  if (context === undefined) {
    throw new Error("useInmate must be used within an InmateProvider");
  }
  return context;
};
const mockInmates: Inmate[] = [{
  id: "INM-001",
  bookingNumber: "B2023-1201",
  firstName: "John",
  lastName: "Smith",
  dateOfBirth: "1985-06-15",
  gender: "Male",
  race: "Caucasian",
  height: "5'10\"",
  weight: "180",
  eyeColor: "Brown",
  hairColor: "Black",
  identifyingMarks: ["Tattoo on right arm", "Scar on left cheek"],
  status: "In Custody",
  bookingDate: "2023-12-01",
  charges: [{
    id: "CHG-001",
    charge: "Aggravated Assault",
    severity: "Felony",
    status: "Pending",
    court: "District Court"
  }],
  cellBlock: "A",
  cellNumber: "A-123",
  medicalInfo: {
    conditions: ["Hypertension"],
    medications: ["Lisinopril"],
    allergies: ["Penicillin"],
    lastCheckup: "2023-12-02",
    specialNeeds: []
  },
  property: [{
    id: "PROP-001",
    type: "Clothing",
    description: "Black leather jacket",
    status: "Stored"
  }, {
    id: "PROP-002",
    type: "Valuables",
    description: "Gold watch",
    value: "$500",
    status: "Stored"
  }],
  visits: [{
    id: "VIS-001",
    date: "2023-12-03",
    visitorName: "Jane Smith",
    relationship: "Wife",
    type: "Personal",
    duration: "30 minutes"
  }],
  securityLevel: "Medium",
  attorney: "James Wilson",
  emergencyContact: {
    name: "Jane Smith",
    relationship: "Wife",
    phone: "555-0123"
  },
  notes: [{
    id: "NOTE-001",
    date: "2023-12-01",
    type: "Behavioral",
    content: "Cooperative during booking process",
    officer: "Ofc. Johnson"
  }]
}, {
  id: "INM-002",
  bookingNumber: "B2023-1202",
  firstName: "Maria",
  lastName: "Garcia",
  dateOfBirth: "1990-03-22",
  gender: "Female",
  race: "Hispanic",
  height: "5'5\"",
  weight: "135",
  eyeColor: "Brown",
  hairColor: "Brown",
  identifyingMarks: [],
  status: "In Custody",
  bookingDate: "2023-12-02",
  charges: [{
    id: "CHG-002",
    charge: "Drug Possession",
    severity: "Misdemeanor",
    status: "Pending",
    court: "Municipal Court"
  }],
  cellBlock: "B",
  cellNumber: "B-105",
  medicalInfo: {
    conditions: [],
    medications: [],
    allergies: [],
    lastCheckup: "2023-12-02",
    specialNeeds: []
  },
  property: [{
    id: "PROP-003",
    type: "Personal",
    description: "Purse with personal items",
    status: "Stored"
  }],
  visits: [],
  securityLevel: "Minimum",
  attorney: "Sarah Rodriguez",
  emergencyContact: {
    name: "Carlos Garcia",
    relationship: "Brother",
    phone: "555-0124"
  },
  notes: [{
    id: "NOTE-002",
    date: "2023-12-02",
    type: "Medical",
    content: "Initial health screening completed",
    officer: "Nurse Williams"
  }]
}];