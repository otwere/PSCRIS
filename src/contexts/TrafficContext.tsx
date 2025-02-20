import React, { useState, createContext, useContext } from "react";
export type TrafficIncidentType = "Accident" | "Traffic Violation" | "Road Hazard" | "Traffic Signal Issue" | "Construction" | "Special Event";
export type TrafficIncidentSeverity = "Minor" | "Moderate" | "Severe" | "Critical";
export type TrafficIncidentStatus = "Reported" | "In Progress" | "Resolved" | "Closed";
export type AccidentType = "Vehicle-Vehicle" | "Vehicle-Pedestrian" | "Vehicle-Property" | "Single Vehicle" | "Multi-Vehicle";
export type WeatherCondition = "Clear" | "Rain" | "Snow" | "Fog" | "Wind" | "Ice";
export type RoadCondition = "Dry" | "Wet" | "Icy" | "Snow Covered" | "Under Construction" | "Debris";
export type TrafficIncident = {
  id: string;
  type: TrafficIncidentType;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    intersection?: string;
  };
  dateTime: string;
  severity: TrafficIncidentSeverity;
  status: TrafficIncidentStatus;
  description: string;
  reportingOfficer: string;
  assignedUnits: string[];
  photos: string[];
  witnesses: string[];
  notes: string[];
};
export type AccidentReport = {
  id: string;
  incidentId: string;
  type: AccidentType;
  dateTime: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    intersection?: string;
  };
  vehicles: Array<{
    id: string;
    make: string;
    model: string;
    year: string;
    color: string;
    licensePlate: string;
    state: string;
    damage: string;
    insuranceInfo: string;
    driverInfo: {
      name: string;
      license: string;
      address: string;
      phone: string;
      injuries: string;
    };
  }>;
  weather: WeatherCondition;
  roadCondition: RoadCondition;
  description: string;
  injuries: boolean;
  fatalities: boolean;
  propertyDamage: boolean;
  citations: string[];
  photos: string[];
  diagram: string;
  witnesses: Array<{
    name: string;
    contact: string;
    statement: string;
  }>;
  officerNotes: string;
  status: "Draft" | "Submitted" | "Approved" | "Closed";
};
export type TrafficEquipment = {
  id: string;
  type: "Radar Gun" | "Breathalyzer" | "Camera" | "Barrier" | "Signage" | "Other";
  serialNumber: string;
  status: "Available" | "In Use" | "Maintenance" | "Out of Service";
  lastMaintenance: string;
  nextMaintenance: string;
  assignedTo?: string;
  notes: string[];
};
type TrafficContextType = {
  incidents: TrafficIncident[];
  accidentReports: AccidentReport[];
  equipment: TrafficEquipment[];
  addIncident: (incident: Omit<TrafficIncident, "id">) => void;
  updateIncident: (id: string, updates: Partial<TrafficIncident>) => void;
  addAccidentReport: (report: Omit<AccidentReport, "id">) => void;
  updateAccidentReport: (id: string, updates: Partial<AccidentReport>) => void;
  addEquipment: (equipment: Omit<TrafficEquipment, "id">) => void;
  updateEquipment: (id: string, updates: Partial<TrafficEquipment>) => void;
};
const TrafficContext = createContext<TrafficContextType | undefined>(undefined);
export const TrafficProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [incidents, setIncidents] = useState<TrafficIncident[]>(mockIncidents);
  const [accidentReports, setAccidentReports] = useState<AccidentReport[]>(mockAccidentReports);
  const [equipment, setEquipment] = useState<TrafficEquipment[]>(mockEquipment);
  const addIncident = (incident: Omit<TrafficIncident, "id">) => {
    const id = `INC-${Date.now()}`;
    setIncidents(prev => [...prev, {
      ...incident,
      id
    }]);
  };
  const updateIncident = (id: string, updates: Partial<TrafficIncident>) => {
    setIncidents(prev => prev.map(incident => incident.id === id ? {
      ...incident,
      ...updates
    } : incident));
  };
  const addAccidentReport = (report: Omit<AccidentReport, "id">) => {
    const id = `ACC-${Date.now()}`;
    setAccidentReports(prev => [...prev, {
      ...report,
      id
    }]);
  };
  const updateAccidentReport = (id: string, updates: Partial<AccidentReport>) => {
    setAccidentReports(prev => prev.map(report => report.id === id ? {
      ...report,
      ...updates
    } : report));
  };
  const addEquipment = (equipment: Omit<TrafficEquipment, "id">) => {
    const id = `EQP-${Date.now()}`;
    setEquipment(prev => [...prev, {
      ...equipment,
      id
    }]);
  };
  const updateEquipment = (id: string, updates: Partial<TrafficEquipment>) => {
    setEquipment(prev => prev.map(equipment => equipment.id === id ? {
      ...equipment,
      ...updates
    } : equipment));
  };
  return <TrafficContext.Provider value={{
    incidents,
    accidentReports,
    equipment,
    addIncident,
    updateIncident,
    addAccidentReport,
    updateAccidentReport,
    addEquipment,
    updateEquipment
  }}>
      {children}
    </TrafficContext.Provider>;
};
export const useTraffic = () => {
  const context = useContext(TrafficContext);
  if (context === undefined) {
    throw new Error("useTraffic must be used within a TrafficProvider");
  }
  return context;
};
const mockIncidents: TrafficIncident[] = [{
  id: "INC-001",
  type: "Accident",
  location: {
    address: "123 Main Street",
    coordinates: {
      lat: 40.7128,
      lng: -74.006
    },
    intersection: "Main St & 1st Ave"
  },
  dateTime: "2023-12-05T08:30:00",
  severity: "Moderate",
  status: "Resolved",
  description: "Two-vehicle collision at intersection",
  reportingOfficer: "Officer Johnson",
  assignedUnits: ["Unit-1", "Unit-3"],
  photos: ["photo1.jpg", "photo2.jpg"],
  witnesses: ["John Doe", "Jane Smith"],
  notes: ["Both vehicles towed from scene"]
}];
const mockAccidentReports: AccidentReport[] = [{
  id: "ACC-001",
  incidentId: "INC-001",
  type: "Vehicle-Vehicle",
  dateTime: "2023-12-05T08:30:00",
  location: {
    address: "123 Main Street",
    coordinates: {
      lat: 40.7128,
      lng: -74.006
    },
    intersection: "Main St & 1st Ave"
  },
  vehicles: [{
    id: "VEH-001",
    make: "Toyota",
    model: "Camry",
    year: "2020",
    color: "Silver",
    licensePlate: "ABC123",
    state: "NY",
    damage: "Front end damage",
    insuranceInfo: "Insurance Co #12345",
    driverInfo: {
      name: "John Doe",
      license: "DL123456",
      address: "456 Oak St",
      phone: "555-0123",
      injuries: "Minor cuts"
    }
  }],
  weather: "Clear",
  roadCondition: "Dry",
  description: "Vehicle 1 failed to stop at red light",
  injuries: true,
  fatalities: false,
  propertyDamage: true,
  citations: ["Citation-001"],
  photos: ["scene1.jpg", "scene2.jpg"],
  diagram: "diagram1.jpg",
  witnesses: [{
    name: "Jane Smith",
    contact: "555-0124",
    statement: "Witnessed Vehicle 1 run red light"
  }],
  officerNotes: "Clear violation of traffic signal",
  status: "Submitted"
}];
const mockEquipment: TrafficEquipment[] = [{
  id: "EQP-001",
  type: "Radar Gun",
  serialNumber: "RG123456",
  status: "Available",
  lastMaintenance: "2023-11-01",
  nextMaintenance: "2024-02-01",
  notes: ["Calibrated on 2023-11-01"]
}];