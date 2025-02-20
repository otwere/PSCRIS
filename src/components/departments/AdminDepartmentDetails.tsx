import React, { useState } from "react";
import { DollarSign, ShoppingCart, Sword, Users, Cpu, Truck, Plus, Edit, Trash2, Eye } from "lucide-react";
import { FinanceModal } from "./modals/FinanceModal";
import { ProcurementModal } from "./modals/ProcurementModal";
import { ArmoryModal } from "./modals/ArmoryModal";
import { HRModal } from "./modals/HRModal";
import { ITModal } from "./modals/ITModal";
import { LogisticsModal } from "./modals/LogisticsModal";
export const AdminDepartmentDetails = ({
  department,
  onClose
}: {
  department: string;
  onClose: () => void;
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const getTableData = () => {
    switch (department) {
      case "Finance & Accounts":
        return {
          headers: ["Transaction ID", "Type", "Amount", "Date", "Status"],
          data: [{
            id: "TRX001",
            type: "Payroll",
            amount: "$45,000",
            date: "2024-01-15",
            status: "Completed"
          }, {
            id: "TRX002",
            type: "Equipment Purchase",
            amount: "$12,500",
            date: "2024-01-14",
            status: "Pending"
          }, {
            id: "TRX003",
            type: "Utilities",
            amount: "$3,200",
            date: "2024-01-13",
            status: "Completed"
          }]
        };
      case "Procurement":
        return {
          headers: ["Order ID", "Item", "Vendor", "Amount", "Status"],
          data: [{
            id: "PO001",
            item: "Office Supplies",
            vendor: "OfficeMax",
            amount: "$2,500",
            status: "Delivered"
          }, {
            id: "PO002",
            item: "Computer Equipment",
            vendor: "Dell",
            amount: "$15,000",
            status: "In Transit"
          }, {
            id: "PO003",
            item: "Uniforms",
            vendor: "UniformPro",
            amount: "$8,800",
            status: "Processing"
          }]
        };
      case "Armory":
        return {
          headers: ["Weapon ID", "Type", "Status", "Last Maintenance", "Assigned To"],
          data: [{
            id: "WPN001",
            type: "Glock 19",
            status: "In Service",
            maintenance: "2024-01-10",
            assigned: "Officer Smith"
          }, {
            id: "WPN002",
            type: "Remington 870",
            status: "Maintenance",
            maintenance: "2024-01-15",
            assigned: "Unassigned"
          }, {
            id: "WPN003",
            type: "AR-15",
            status: "In Service",
            maintenance: "2024-01-05",
            assigned: "Officer Johnson"
          }]
        };
      case "Human Resources":
        return {
          headers: ["Employee ID", "Name", "Position", "Department", "Status"],
          data: [{
            id: "EMP001",
            name: "John Smith",
            position: "Detective",
            department: "Criminal Investigation",
            status: "Active"
          }, {
            id: "EMP002",
            name: "Sarah Johnson",
            position: "Officer",
            department: "Patrol",
            status: "Active"
          }, {
            id: "EMP003",
            name: "Mike Wilson",
            position: "Dispatcher",
            department: "Communications",
            status: "On Leave"
          }]
        };
      case "IT Department":
        return {
          headers: ["Ticket ID", "Issue", "Priority", "Requestor", "Status"],
          data: [{
            id: "TKT001",
            issue: "Network Down",
            priority: "High",
            requestor: "Dispatch Center",
            status: "In Progress"
          }, {
            id: "TKT002",
            issue: "Software Update",
            priority: "Medium",
            requestor: "Records Dept",
            status: "Open"
          }, {
            id: "TKT003",
            issue: "Printer Issue",
            priority: "Low",
            requestor: "Admin Office",
            status: "Resolved"
          }]
        };
      case "Logistics":
        return {
          headers: ["Vehicle ID", "Type", "Status", "Last Service", "Assigned To"],
          data: [{
            id: "VEH001",
            type: "Patrol Car",
            status: "Active",
            service: "2024-01-05",
            assigned: "Squad A"
          }, {
            id: "VEH002",
            type: "SUV",
            status: "Maintenance",
            service: "2024-01-15",
            assigned: "Unassigned"
          }, {
            id: "VEH003",
            type: "Van",
            status: "Active",
            service: "2024-01-10",
            assigned: "SWAT"
          }]
        };
      default:
        return {
          headers: [],
          data: []
        };
    }
  };
  const {
    headers,
    data
  } = getTableData();
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-auto">
        <div className="p-6 border-b sticky top-0 bg-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-blue-50">
              {department === "Finance & Accounts" && <DollarSign className="h-6 w-6 text-blue-600" />}
              {department === "Procurement" && <ShoppingCart className="h-6 w-6 text-blue-600" />}
              {department === "Armory" && <Sword className="h-6 w-6 text-blue-600" />}
              {department === "Human Resources" && <Users className="h-6 w-6 text-blue-600" />}
              {department === "IT Department" && <Cpu className="h-6 w-6 text-blue-600" />}
              {department === "Logistics" && <Truck className="h-6 w-6 text-blue-600" />}
            </div>
            <h2 className="text-xl font-semibold">{department}</h2>
          </div>
          <button onClick={() => setActiveModal("create")} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Add New
          </button>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  {headers.map(header => <th key={header} className="pb-3 font-medium">
                      {header}
                    </th>)}
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => <tr key={item.id} className="border-b">
                    {Object.values(item).map((value, index) => <td key={index} className="py-4">
                        {value}
                      </td>)}
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="h-4 w-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="h-4 w-4 text-blue-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {activeModal === "create" && department === "Finance & Accounts" && <FinanceModal onClose={() => setActiveModal(null)} />}
      {activeModal === "create" && department === "Procurement" && <ProcurementModal onClose={() => setActiveModal(null)} />}
      {activeModal === "create" && department === "Armory" && <ArmoryModal onClose={() => setActiveModal(null)} />}
      {activeModal === "create" && department === "Human Resources" && <HRModal onClose={() => setActiveModal(null)} />}
      {activeModal === "create" && department === "IT Department" && <ITModal onClose={() => setActiveModal(null)} />}
      {activeModal === "create" && department === "Logistics" && <LogisticsModal onClose={() => setActiveModal(null)} />}
    </div>;
};