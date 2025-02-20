import React, { useState } from "react";
import { X, Save, Clock, Users, FileText } from "lucide-react";
import { useInmate } from "../../contexts/InmateContext";
import type { Inmate, VisitationRecord } from "../../contexts/InmateContext";
type NewVisitationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  inmate: Inmate;
};
export const NewVisitationModal = ({
  isOpen,
  onClose,
  inmate
}: NewVisitationModalProps) => {
  const {
    addVisitation
  } = useInmate();
  const [formData, setFormData] = useState({
    visitorName: "",
    relationship: "",
    type: "Personal" as VisitationRecord["type"],
    date: new Date().toISOString().split("T")[0],
    time: "10:00",
    duration: "30",
    visitorId: "",
    contactNumber: "",
    address: "",
    notes: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVisitation(inmate.id, {
      date: `${formData.date}T${formData.time}`,
      visitorName: formData.visitorName,
      relationship: formData.relationship,
      type: formData.type,
      duration: `${formData.duration} minutes`,
      notes: formData.notes
    });
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">Schedule Visitation</h2>
            <p className="text-sm text-gray-500 mt-1">
              For Inmate: {inmate.firstName} {inmate.lastName} (
              {inmate.bookingNumber})
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Visitor Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Visitor Name
                </label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" required value={formData.visitorName} onChange={e => setFormData(prev => ({
                ...prev,
                visitorName: e.target.value
              }))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Relationship to Inmate
                </label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" required value={formData.relationship} onChange={e => setFormData(prev => ({
                ...prev,
                relationship: e.target.value
              }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Visitor ID
                </label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg" required value={formData.visitorId} onChange={e => setFormData(prev => ({
                ...prev,
                visitorId: e.target.value
              }))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Number
                </label>
                <input type="tel" className="w-full px-4 py-2 border rounded-lg" required value={formData.contactNumber} onChange={e => setFormData(prev => ({
                ...prev,
                contactNumber: e.target.value
              }))} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.address} onChange={e => setFormData(prev => ({
              ...prev,
              address: e.target.value
            }))} />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Visit Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Visit Type
                </label>
                <select className="w-full px-4 py-2 border rounded-lg" value={formData.type} onChange={e => setFormData(prev => ({
                ...prev,
                type: e.target.value as VisitationRecord["type"]
              }))}>
                  <option value="Personal">Personal</option>
                  <option value="Legal">Legal</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration (minutes)
                </label>
                <select className="w-full px-4 py-2 border rounded-lg" value={formData.duration} onChange={e => setFormData(prev => ({
                ...prev,
                duration: e.target.value
              }))}>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input type="date" className="w-full px-4 py-2 border rounded-lg" required value={formData.date} onChange={e => setFormData(prev => ({
                ...prev,
                date: e.target.value
              }))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <input type="time" className="w-full px-4 py-2 border rounded-lg" required value={formData.time} onChange={e => setFormData(prev => ({
                ...prev,
                time: e.target.value
              }))} />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea className="w-full px-4 py-2 border rounded-lg" rows={3} value={formData.notes} onChange={e => setFormData(prev => ({
            ...prev,
            notes: e.target.value
          }))} />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Schedule Visit
            </button>
          </div>
        </form>
      </div>
    </div>;
};