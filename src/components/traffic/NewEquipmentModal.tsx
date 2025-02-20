import React, { useState } from "react";
import { X, Save } from "lucide-react";
import { useTraffic } from "../../contexts/TrafficContext";
export const NewEquipmentModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    addEquipment
  } = useTraffic();
  const [formData, setFormData] = useState({
    type: "Radar Gun",
    serialNumber: "",
    status: "Available",
    lastMaintenance: new Date().toISOString().split("T")[0],
    nextMaintenance: "",
    notes: [] as string[]
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEquipment(formData);
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add New Equipment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Equipment Type
            </label>
            <select className="w-full px-4 py-2 border rounded-lg" value={formData.type} onChange={e => setFormData(prev => ({
            ...prev,
            type: e.target.value
          }))}>
              <option value="Radar Gun">Radar Gun</option>
              <option value="Breathalyzer">Breathalyzer</option>
              <option value="Camera">Camera</option>
              <option value="Barrier">Barrier</option>
              <option value="Signage">Signage</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Serial Number
            </label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg" value={formData.serialNumber} onChange={e => setFormData(prev => ({
            ...prev,
            serialNumber: e.target.value
          }))} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select className="w-full px-4 py-2 border rounded-lg" value={formData.status} onChange={e => setFormData(prev => ({
            ...prev,
            status: e.target.value
          }))}>
              <option value="Available">Available</option>
              <option value="In Use">In Use</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Out of Service">Out of Service</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Last Maintenance
            </label>
            <input type="date" className="w-full px-4 py-2 border rounded-lg" value={formData.lastMaintenance} onChange={e => setFormData(prev => ({
            ...prev,
            lastMaintenance: e.target.value
          }))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Next Maintenance
            </label>
            <input type="date" className="w-full px-4 py-2 border rounded-lg" value={formData.nextMaintenance} onChange={e => setFormData(prev => ({
            ...prev,
            nextMaintenance: e.target.value
          }))} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Notes</label>
            <textarea className="w-full px-4 py-2 border rounded-lg" rows={3} value={formData.notes.join("\n")} onChange={e => setFormData(prev => ({
            ...prev,
            notes: e.target.value.split("\n").filter(Boolean)
          }))} />
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Add Equipment
            </button>
          </div>
        </form>
      </div>
    </div>;
};