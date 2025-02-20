import React, { useState, createContext, useContext } from "react";
export type Officer = {
  id: string;
  name: string;
  badge: string;
  rank: string;
  department: string;
  status: "On Duty" | "Off Duty";
};
type OfficerContextType = {
  officers: Officer[];
};
const OfficerContext = createContext<OfficerContextType | undefined>(undefined);
export const OfficerProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [officers] = useState<Officer[]>(mockOfficers);
  return <OfficerContext.Provider value={{
    officers
  }}>
      {children}
    </OfficerContext.Provider>;
};
export const useOfficer = () => {
  const context = useContext(OfficerContext);
  if (context === undefined) {
    throw new Error("useOfficer must be used within an OfficerProvider");
  }
  return context;
};
const mockOfficers: Officer[] = [{
  id: "OFF001",
  name: "Sarah Johnson",
  badge: "1234",
  rank: "Detective",
  department: "Violent Crimes Unit",
  status: "On Duty"
}, {
  id: "OFF002",
  name: "Robert Chen",
  badge: "1235",
  rank: "Officer",
  department: "Community Relations",
  status: "On Duty"
}, {
  id: "OFF003",
  name: "Mike Smith",
  badge: "1236",
  rank: "Officer",
  department: "Patrol",
  status: "On Duty"
}, {
  id: "OFF004",
  name: "Emily Rodriguez",
  badge: "1237",
  rank: "Sergeant",
  department: "Special Victims Unit",
  status: "On Duty"
}, {
  id: "OFF005",
  name: "James Wilson",
  badge: "1238",
  rank: "Lieutenant",
  department: "Homicide",
  status: "Off Duty"
}, {
  id: "OFF006",
  name: "Maria Garcia",
  badge: "1239",
  rank: "Detective",
  department: "Cybercrime Unit",
  status: "On Duty"
}, {
  id: "OFF007",
  name: "David Kim",
  badge: "1240",
  rank: "Officer",
  department: "Traffic Division",
  status: "Off Duty"
}, {
  id: "OFF008",
  name: "Lisa Thompson",
  badge: "1241",
  rank: "Sergeant",
  department: "Narcotics",
  status: "On Duty"
}];