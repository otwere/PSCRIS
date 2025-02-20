import React, { useState, createContext, useContext } from "react";
export type Shift = "Morning" | "Afternoon" | "Night";
export type DutyStatus = "On Duty" | "Off Duty" | "On Leave" | "Training";
export type RosterEntry = {
  id: string;
  officerId: string;
  officerName: string;
  rank: string;
  department: string;
  shift: Shift;
  status: DutyStatus;
  startTime: string;
  endTime: string;
  location: string;
  notes?: string;
};
type DutyRosterContextType = {
  roster: RosterEntry[];
  updateRoster: (officerId: string, updates: Partial<RosterEntry>) => void;
  getCurrentShift: () => Shift;
  getOfficersOnDuty: () => RosterEntry[];
};
const DutyRosterContext = createContext<DutyRosterContextType | undefined>(undefined);
export const DutyRosterProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [roster, setRoster] = useState<RosterEntry[]>(mockRoster);
  const updateRoster = (officerId: string, updates: Partial<RosterEntry>) => {
    setRoster(prev => prev.map(entry => entry.officerId === officerId ? {
      ...entry,
      ...updates
    } : entry));
  };
  const getCurrentShift = (): Shift => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) return "Morning";
    if (hour >= 14 && hour < 22) return "Afternoon";
    return "Night";
  };
  const getOfficersOnDuty = () => {
    return roster.filter(entry => entry.status === "On Duty");
  };
  return <DutyRosterContext.Provider value={{
    roster,
    updateRoster,
    getCurrentShift,
    getOfficersOnDuty
  }}>
      {children}
    </DutyRosterContext.Provider>;
};
export const useRoster = () => {
  const context = useContext(DutyRosterContext);
  if (context === undefined) {
    throw new Error("useRoster must be used within a DutyRosterProvider");
  }
  return context;
};
const mockRoster: RosterEntry[] = [{
  id: "DUTY001",
  officerId: "OFF001",
  officerName: "Sarah Johnson",
  rank: "Detective",
  department: "Violent Crimes Unit",
  shift: "Morning",
  status: "On Duty",
  startTime: "06:00",
  endTime: "14:00",
  location: "HQ - Investigation Room",
  notes: "Leading investigation on Case CR-2023-001"
}, {
  id: "DUTY002",
  officerId: "OFF002",
  officerName: "Robert Chen",
  rank: "Officer",
  department: "Community Relations",
  shift: "Morning",
  status: "On Duty",
  startTime: "06:00",
  endTime: "14:00",
  location: "Downtown Precinct",
  notes: "Community outreach program"
}
// Add more roster entries...
];