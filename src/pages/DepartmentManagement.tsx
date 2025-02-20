import React, { useMemo, useState } from "react";
import { useDepartment } from "../contexts/DepartmentContext";
import { Search, Building, MapPin, Phone, Mail, Users, Calendar, Shield, Clock, AlertCircle, Plus, X, Save, Check, DollarSign, ShoppingCart, Briefcase, Cpu, Truck, GraduationCap, Sword } from "lucide-react";
import { AdminDepartmentDetails } from "../components/departments/AdminDepartmentDetails";
export const DepartmentManagement = () => {
  const {
    departments
  } = useDepartment();
  const [isNewStationModalOpen, setIsNewStationModalOpen] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const administrativeDepartments = {
    "Finance & Accounts": {
      head: "John Smith",
      staff: 15,
      budget: 1500000,
      location: "HQ - 3rd Floor",
      responsibilities: ["Budget Management", "Payroll", "Financial Reporting", "Audit Compliance"],
      metrics: {
        budgetUtilization: "87%",
        pendingTransactions: 24,
        monthlyExpenses: 125000
      }
    },
    Procurement: {
      head: "Sarah Johnson",
      staff: 8,
      budget: 800000,
      location: "HQ - 2nd Floor",
      responsibilities: ["Equipment Procurement", "Vendor Management", "Inventory Control", "Purchase Orders"],
      metrics: {
        activeContracts: 12,
        pendingOrders: 8,
        monthlySpending: 95000
      }
    },
    Armory: {
      head: "Michael Rodriguez",
      staff: 10,
      budget: 1200000,
      location: "Secure Wing - B",
      responsibilities: ["Weapons Management", "Ammunition Control", "Equipment Maintenance", "Training Support"],
      metrics: {
        totalWeapons: 450,
        maintenanceQueue: 15,
        certifiedOfficers: 180
      }
    },
    "Human Resources": {
      head: "Emily Chen",
      staff: 12,
      budget: 600000,
      location: "HQ - 4th Floor",
      responsibilities: ["Recruitment", "Training Management", "Employee Relations", "Benefits Administration"],
      metrics: {
        activeRecruitment: 8,
        trainingPrograms: 5,
        employeeCount: 342
      }
    },
    "IT Department": {
      head: "David Kumar",
      staff: 18,
      budget: 2000000,
      location: "Tech Wing - A",
      responsibilities: ["Systems Management", "Cybersecurity", "Technical Support", "Software Development"],
      metrics: {
        systemUptime: "99.9%",
        activeTickets: 15,
        securityIncidents: 0
      }
    },
    Logistics: {
      head: "Lisa Martinez",
      staff: 14,
      budget: 900000,
      location: "Operations Center",
      responsibilities: ["Fleet Management", "Supply Chain", "Asset Tracking", "Warehouse Operations"],
      metrics: {
        activeVehicles: 85,
        inventoryValue: 1200000,
        deliveryEfficiency: "94%"
      }
    }
  };
  const renderAdministrativeDepartments = () => <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
        Administrative Departments
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(administrativeDepartments).map(([name, dept]) => <div key={name} className="border rounded-lg p-6 hover:border-blue-500 cursor-pointer transition-colors" onClick={() => setSelectedDepartment(name)}>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-lg bg-blue-50">
                {name === "Finance & Accounts" && <DollarSign className="h-6 w-6 text-blue-600" />}
                {name === "Procurement" && <ShoppingCart className="h-6 w-6 text-blue-600" />}
                {name === "Armory" && <Sword className="h-6 w-6 text-blue-600" />}
                {name === "Human Resources" && <Users className="h-6 w-6 text-blue-600" />}
                {name === "IT Department" && <Cpu className="h-6 w-6 text-blue-600" />}
                {name === "Logistics" && <Truck className="h-6 w-6 text-blue-600" />}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-gray-500">Head: {dept.head}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Staff</p>
                <p className="font-medium">{dept.staff}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{dept.location}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Key Responsibilities</p>
              <div className="flex flex-wrap gap-2">
                {dept.responsibilities.map(resp => <span key={resp} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                    {resp}
                  </span>)}
              </div>
            </div>
            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-3">Key Metrics</p>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(dept.metrics).map(([key, value]) => <div key={key}>
                    <p className="text-xs text-gray-500">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                    </p>
                    <p className="font-medium">{value}</p>
                  </div>)}
              </div>
            </div>
          </div>)}
      </div>
    </div>;
  const groupedDepartments = useMemo(() => {
    const grouped = departments.reduce((acc, dept) => {
      const county = dept.location.county;
      const area = dept.location.area;
      if (!acc[county]) {
        acc[county] = {};
      }
      if (!acc[county][area]) {
        acc[county][area] = [];
      }
      acc[county][area].push(dept);
      return acc;
    }, {} as Record<string, Record<string, typeof departments>>);
    return grouped;
  }, [departments]);
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Department Management</h1>
        <p className="text-gray-500">Manage police departments and units</p>
      </div>
      {showSuccessAlert && <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <div className="p-1 bg-green-100 rounded-full">
            <Check className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-green-600">Station successfully created</p>
        </div>}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input type="text" placeholder="Search departments..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button onClick={() => setIsNewStationModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add Station
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-12">
            {renderAdministrativeDepartments()}
            <div className="space-y-8">
              {Object.entries(groupedDepartments).map(([county, areas]) => <div key={county} className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                    {county}
                  </h2>
                  {Object.entries(areas).map(([area, depts]) => <div key={area} className="space-y-4">
                      <h3 className="text-md font-medium text-gray-600 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {area}
                      </h3>
                      <div className="grid gap-4">
                        {depts.map(department => <div key={department.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-medium text-lg">
                                  {department.name}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                  Head: {department.head}
                                </p>
                              </div>
                              <div className="text-sm text-gray-500">
                                {department.location.address}
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Total Officers</p>
                                <p className="font-medium">
                                  {department.totalOfficers}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Active Cases</p>
                                <p className="font-medium">
                                  {department.activeCases}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Success Rate</p>
                                <p className="font-medium">
                                  {department.performance.successRate}%
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Budget</p>
                                <p className="font-medium">
                                  ${department.budget.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>)}
                      </div>
                    </div>)}
                </div>)}
            </div>
          </div>
        </div>
      </div>
      <NewStationModal isOpen={isNewStationModalOpen} onClose={() => setIsNewStationModalOpen(false)} onSuccess={() => {
      setShowSuccessAlert(true);
      setTimeout(() => setShowSuccessAlert(false), 3000);
    }} />
      {selectedDepartment && <AdminDepartmentDetails department={selectedDepartment} onClose={() => setSelectedDepartment(null)} />}
    </div>;
};
const NewStationModal = ({
  isOpen,
  onClose,
  onSuccess
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const [formData, setFormData] = useState({
    basicInfo: {
      name: "",
      type: "district",
      jurisdiction: "",
      stationCode: ""
    },
    location: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      county: "",
      area: "",
      coordinates: {
        latitude: "",
        longitude: ""
      }
    },
    contact: {
      phone: "",
      emergency: "",
      fax: "",
      email: "",
      website: ""
    },
    resources: {
      vehicles: 0,
      holding_cells: 0,
      interview_rooms: 0,
      equipment: [] as string[]
    },
    staffing: {
      capacity: 0,
      minimum_officers: 0,
      current_officers: 0,
      civilian_staff: 0
    },
    operations: {
      hours: "24/7",
      emergency_response: true,
      specialized_units: [] as string[],
      services: [] as string[]
    }
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSuccess();
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Add New Police Station</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Station Name
                </label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.basicInfo.name} onChange={e => setFormData(prev => ({
                ...prev,
                basicInfo: {
                  ...prev.basicInfo,
                  name: e.target.value
                }
              }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Station Type
                </label>
                <select className="w-full px-4 py-2 border rounded-lg" value={formData.basicInfo.type} onChange={e => setFormData(prev => ({
                ...prev,
                basicInfo: {
                  ...prev.basicInfo,
                  type: e.target.value
                }
              }))}>
                  <option value="district">District Station</option>
                  <option value="headquarters">Headquarters</option>
                  <option value="substation">Substation</option>
                  <option value="special">Special Unit</option>
                </select>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Location Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Street Address
                </label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.location.street} onChange={e => setFormData(prev => ({
                ...prev,
                location: {
                  ...prev.location,
                  street: e.target.value
                }
              }))} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.location.city} onChange={e => setFormData(prev => ({
                ...prev,
                location: {
                  ...prev.location,
                  city: e.target.value
                }
              }))} required />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Resources & Capacity</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Number of Vehicles
                </label>
                <input type="number" className="w-full px-4 py-2 border rounded-lg" value={formData.resources.vehicles} onChange={e => setFormData(prev => ({
                ...prev,
                resources: {
                  ...prev.resources,
                  vehicles: parseInt(e.target.value)
                }
              }))} min="0" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Holding Cells
                </label>
                <input type="number" className="w-full px-4 py-2 border rounded-lg" value={formData.resources.holding_cells} onChange={e => setFormData(prev => ({
                ...prev,
                resources: {
                  ...prev.resources,
                  holding_cells: parseInt(e.target.value)
                }
              }))} min="0" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Main Phone
                </label>
                <input type="tel" className="w-full px-4 py-2 border rounded-lg" value={formData.contact.phone} onChange={e => setFormData(prev => ({
                ...prev,
                contact: {
                  ...prev.contact,
                  phone: e.target.value
                }
              }))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Emergency Line
                </label>
                <input type="tel" className="w-full px-4 py-2 border rounded-lg" value={formData.contact.emergency} onChange={e => setFormData(prev => ({
                ...prev,
                contact: {
                  ...prev.contact,
                  emergency: e.target.value
                }
              }))} />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Create Station
            </button>
          </div>
        </form>
      </div>
    </div>;
};