import React, { useState, createContext, useContext } from "react";
export type Department = {
  id: string;
  name: string;
  head: string;
  totalOfficers: number;
  activeCases: number;
  location: {
    county: string;
    area: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  budget: number;
  performance: {
    solvedCases: number;
    pendingCases: number;
    successRate: number;
  };
};
type DepartmentContextType = {
  departments: Department[];
  statistics: {
    totalDepartments: number;
    totalOfficers: number;
    totalActiveCases: number;
    averageSuccessRate: number;
  };
};
const DepartmentContext = createContext<DepartmentContextType | undefined>(undefined);
export const DepartmentProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [departments] = useState<Department[]>(mockDepartments);
  const statistics = {
    totalDepartments: departments.length,
    totalOfficers: departments.reduce((acc, dept) => acc + dept.totalOfficers, 0),
    totalActiveCases: departments.reduce((acc, dept) => acc + dept.activeCases, 0),
    averageSuccessRate: departments.reduce((acc, dept) => acc + dept.performance.successRate, 0) / departments.length
  };
  return <DepartmentContext.Provider value={{
    departments,
    statistics
  }}>
      {children}
    </DepartmentContext.Provider>;
};
export const useDepartment = () => {
  const context = useContext(DepartmentContext);
  if (context === undefined) {
    throw new Error("useDepartment must be used within a DepartmentProvider");
  }
  return context;
};
const mockDepartments: Department[] = [{
  id: "DEPT001",
  name: "Violent Crimes Unit",
  head: "Chief Inspector Sarah Johnson",
  totalOfficers: 45,
  activeCases: 28,
  location: {
    county: "Metropolitan County",
    area: "Central District",
    address: "HQ - 3rd Floor, 123 Main Street",
    coordinates: {
      lat: 40.7128,
      lng: -74.006
    }
  },
  budget: 1500000,
  performance: {
    solvedCases: 142,
    pendingCases: 28,
    successRate: 83.5
  }
}, {
  id: "DEPT002",
  name: "Cybercrime Unit",
  head: "Inspector David Chen",
  totalOfficers: 25,
  activeCases: 35,
  location: {
    county: "Metropolitan County",
    area: "Tech District",
    address: "Tech Wing - 2nd Floor, 456 Innovation Ave",
    coordinates: {
      lat: 40.7589,
      lng: -73.9851
    }
  },
  budget: 2000000,
  performance: {
    solvedCases: 98,
    pendingCases: 35,
    successRate: 78.4
  }
}, {
  id: "DEPT003",
  name: "Community Policing Unit",
  head: "Captain Maria Rodriguez",
  totalOfficers: 30,
  activeCases: 22,
  location: {
    county: "Suburban County",
    area: "Residential District",
    address: "Community Center - 789 Oak Road",
    coordinates: {
      lat: 40.8224,
      lng: -73.9483
    }
  },
  budget: 1200000,
  performance: {
    solvedCases: 115,
    pendingCases: 22,
    successRate: 81.2
  }
}];