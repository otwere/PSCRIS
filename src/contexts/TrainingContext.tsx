import React, { useState, createContext, useContext } from "react";
export type TrainingStatus = "Scheduled" | "In Progress" | "Completed" | "Cancelled";
export type TrainingType = "Field" | "Classroom" | "Online" | "Simulation";
export type Training = {
  id: string;
  title: string;
  type: TrainingType;
  status: TrainingStatus;
  startDate: string;
  endDate: string;
  instructor: string;
  department: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  description: string;
  requirements: string[];
  participants: Array<{
    officerId: string;
    name: string;
    status: "Enrolled" | "Completed" | "Failed" | "Withdrawn";
  }>;
};
type TrainingContextType = {
  trainings: Training[];
  addTraining: (training: Omit<Training, "id">) => void;
  updateTraining: (id: string, updates: Partial<Training>) => void;
  enrollOfficer: (trainingId: string, officerId: string, name: string) => void;
};
const TrainingContext = createContext<TrainingContextType | undefined>(undefined);
export const TrainingProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [trainings, setTrainings] = useState<Training[]>(mockTrainings);
  const addTraining = (training: Omit<Training, "id">) => {
    const id = `TRN${Date.now()}`;
    setTrainings(prev => [...prev, {
      ...training,
      id
    }]);
  };
  const updateTraining = (id: string, updates: Partial<Training>) => {
    setTrainings(prev => prev.map(training => training.id === id ? {
      ...training,
      ...updates
    } : training));
  };
  const enrollOfficer = (trainingId: string, officerId: string, name: string) => {
    setTrainings(prev => prev.map(training => {
      if (training.id === trainingId && training.currentParticipants < training.maxParticipants) {
        return {
          ...training,
          currentParticipants: training.currentParticipants + 1,
          participants: [...training.participants, {
            officerId,
            name,
            status: "Enrolled"
          }]
        };
      }
      return training;
    }));
  };
  return <TrainingContext.Provider value={{
    trainings,
    addTraining,
    updateTraining,
    enrollOfficer
  }}>
      {children}
    </TrainingContext.Provider>;
};
export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (context === undefined) {
    throw new Error("useTraining must be used within a TrainingProvider");
  }
  return context;
};
const mockTrainings: Training[] = [{
  id: "TRN001",
  title: "Advanced Investigation Techniques",
  type: "Classroom",
  status: "In Progress",
  startDate: "2023-12-01",
  endDate: "2023-12-15",
  instructor: "Chief Inspector James Wilson",
  department: "Investigation Bureau",
  location: "Police Academy - Room 301",
  maxParticipants: 30,
  currentParticipants: 25,
  description: "Advanced course covering modern investigation techniques and procedures",
  requirements: ["Minimum 2 years experience", "Basic Investigation Certificate"],
  participants: [{
    officerId: "OFF001",
    name: "Sarah Johnson",
    status: "Enrolled"
  }]
}, {
  id: "TRN002",
  title: "Cybercrime Investigation",
  type: "Online",
  status: "Scheduled",
  startDate: "2023-12-10",
  endDate: "2023-12-20",
  instructor: "Tech Specialist Maria Garcia",
  department: "Cybercrime Unit",
  location: "Virtual Training Platform",
  maxParticipants: 50,
  currentParticipants: 15,
  description: "Digital forensics and cyber investigation techniques",
  requirements: ["Basic Computer Skills", "Security Clearance"],
  participants: []
}, {
  id: "TRN003",
  title: "Emergency Response Tactics",
  type: "Simulation",
  status: "In Progress",
  startDate: "2023-12-05",
  endDate: "2023-12-08",
  instructor: "Sgt. Mike Smith",
  department: "Special Response Team",
  location: "Training Facility B",
  maxParticipants: 20,
  currentParticipants: 18,
  description: "Tactical response and emergency situation management",
  requirements: ["Physical Fitness Test", "Weapons Certification"],
  participants: []
}];