import React, { useState } from "react";
import { Search, Filter, Plus, FileText, AlertCircle, Clock, Users } from "lucide-react";
import { useInmate } from "../contexts/InmateContext";
import { NewBookingModal } from "../components/NewBookingModal";
import { NewVisitationModal } from "../components/inmates/NewVisitationModal";
export const InmateList = () => {
  const {
    inmates
  } = useInmate();
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [selectedInmate, setSelectedInmate] = useState<Inmate | null>(null);
  const [isVisitationModalOpen, setIsVisitationModalOpen] = useState(false);
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Inmate Management</h1>
        <p className="text-gray-500">Track and manage booked inmates</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<FileText className="h-6 w-6 text-blue-600" />} label="Total Inmates" value={inmates.length} trend="Current count" />
        <StatCard icon={<Clock className="h-6 w-6 text-purple-600" />} label="Recent Bookings" value={inmates.filter(i => new Date().getTime() - new Date(i.bookingDate).getTime() < 24 * 60 * 60 * 1000).length} trend="Last 24 hours" />
        <StatCard icon={<AlertCircle className="h-6 w-6 text-orange-600" />} label="Medical Attention" value={inmates.filter(i => i.medicalInfo.specialNeeds.length > 0).length} trend="Requiring care" />
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input type="text" placeholder="Search inmates..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <Filter className="h-4 w-4" />
                Filter
              </button>
            </div>
            <button onClick={() => setIsNewBookingModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              New Booking
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {inmates.map(inmate => <div key={inmate.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">
                      {inmate.firstName} {inmate.lastName}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Booking #{inmate.bookingNumber}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${inmate.status === "In Custody" ? "bg-blue-50 text-blue-600" : inmate.status === "Released" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                    {inmate.status}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-500">Cell Location</p>
                    <p className="font-medium">
                      Block {inmate.cellBlock}-{inmate.cellNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Booking Date</p>
                    <p className="font-medium">{inmate.bookingDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Security Level</p>
                    <p className="font-medium">{inmate.securityLevel}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Attorney</p>
                    <p className="font-medium">
                      {inmate.attorney || "Not assigned"}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Current Charges</h4>
                  <div className="space-y-2">
                    {inmate.charges.map(charge => <div key={charge.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${charge.severity === "Felony" ? "bg-red-400" : "bg-yellow-400"}`} />
                          <span>{charge.charge}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${charge.status === "Pending" ? "bg-yellow-50 text-yellow-600" : charge.status === "Convicted" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                          {charge.status}
                        </span>
                      </div>)}
                  </div>
                </div>
                {inmate.medicalInfo.conditions.length > 0 && <div className="border-t mt-4 pt-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      Medical Conditions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {inmate.medicalInfo.conditions.map(condition => <span key={condition} className="px-2 py-1 bg-red-50 text-red-600 rounded text-xs">
                          {condition}
                        </span>)}
                    </div>
                  </div>}
                <div className="border-t mt-4 pt-4">
                  <button onClick={() => {
                setSelectedInmate(inmate);
                setIsVisitationModalOpen(true);
              }} className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Schedule Visit
                  </button>
                </div>
              </div>)}
          </div>
        </div>
      </div>
      <NewBookingModal isOpen={isNewBookingModalOpen} onClose={() => setIsNewBookingModalOpen(false)} />
      {selectedInmate && <NewVisitationModal isOpen={isVisitationModalOpen} onClose={() => {
      setIsVisitationModalOpen(false);
      setSelectedInmate(null);
    }} inmate={selectedInmate} />}
    </div>;
};
const StatCard = ({
  icon,
  label,
  value,
  trend
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  trend: string;
}) => <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <span className="text-sm text-gray-500">{trend}</span>
    </div>
    <h3 className="text-gray-500 text-sm mb-1">{label}</h3>
    <p className="text-2xl font-semibold">{value}</p>
  </div>;