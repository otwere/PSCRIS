import React, { useState } from "react";
import { X, MapPin, Save } from "lucide-react";
import { useTraffic, TrafficIncidentType, TrafficIncidentSeverity } from "../../contexts/TrafficContext";
export const NewTrafficIncidentModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    addIncident
  } = useTraffic();
  const [formData, setFormData] = useState({
    type: "Traffic Violation" as TrafficIncidentType,
    location: {
      address: "",
      coordinates: {
        lat: 0,
        lng: 0
      },
      intersection: ""
    },
    dateTime: new Date().toISOString().slice(0, 16),
    severity: "Minor" as TrafficIncidentSeverity,
    description: "",
    reportingOfficer: "",
    assignedUnits: [] as string[],
    photos: [] as string[],
    witnesses: [] as string[],
    notes: [] as string[]
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addIncident(formData);
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Report Traffic Incident</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Incident Type
              </label>
              <select className="w-full px-4 py-2 border rounded-lg" value={formData.type} onChange={e => setFormData(prev => ({
              ...prev,
              type: e.target.value as TrafficIncidentType
            }))}>
                <option value="Traffic Violation">Traffic Violation</option>
                <option value="Accident">Accident</option>
                <option value="Road Hazard">Road Hazard</option>
                <option value="Traffic Signal Issue">
                  Traffic Signal Issue
                </option>
                <option value="Construction">Construction</option>
                <option value="Special Event">Special Event</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Severity</label>
              <select className="w-full px-4 py-2 border rounded-lg" value={formData.severity} onChange={e => setFormData(prev => ({
              ...prev,
              severity: e.target.value as TrafficIncidentSeverity
            }))}>
                <option value="Minor">Minor</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <div className="space-y-4">
              <input type="text" placeholder="Street Address" className="w-full px-4 py-2 border rounded-lg" value={formData.location.address} onChange={e => setFormData(prev => ({
              ...prev,
              location: {
                ...prev.location,
                address: e.target.value
              }
            }))} />
              <input type="text" placeholder="Nearest Intersection" className="w-full px-4 py-2 border rounded-lg" value={formData.location.intersection} onChange={e => setFormData(prev => ({
              ...prev,
              location: {
                ...prev.location,
                intersection: e.target.value
              }
            }))} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea className="w-full px-4 py-2 border rounded-lg" rows={4} value={formData.description} onChange={e => setFormData(prev => ({
            ...prev,
            description: e.target.value
          }))} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Date & Time
              </label>
              <input type="datetime-local" className="w-full px-4 py-2 border rounded-lg" value={formData.dateTime} onChange={e => setFormData(prev => ({
              ...prev,
              dateTime: e.target.value
            }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Reporting Officer
              </label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.reportingOfficer} onChange={e => setFormData(prev => ({
              ...prev,
              reportingOfficer: e.target.value
            }))} />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Create Incident
            </button>
          </div>
        </form>
      </div>
    </div>;
};