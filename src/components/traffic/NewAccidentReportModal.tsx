import React, { useState } from "react";
import { X, Car, Save, Plus, Trash2 } from "lucide-react";
import { useTraffic, AccidentType, WeatherCondition, RoadCondition } from "../../contexts/TrafficContext";
export const NewAccidentReportModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    addAccidentReport
  } = useTraffic();
  const [formData, setFormData] = useState({
    incidentId: "",
    type: "Vehicle-Vehicle" as AccidentType,
    dateTime: new Date().toISOString().slice(0, 16),
    location: {
      address: "",
      coordinates: {
        lat: 0,
        lng: 0
      },
      intersection: ""
    },
    vehicles: [{
      id: "VEH-1",
      make: "",
      model: "",
      year: "",
      color: "",
      licensePlate: "",
      state: "",
      damage: "",
      insuranceInfo: "",
      driverInfo: {
        name: "",
        license: "",
        address: "",
        phone: "",
        injuries: ""
      }
    }],
    weather: "Clear" as WeatherCondition,
    roadCondition: "Dry" as RoadCondition,
    description: "",
    injuries: false,
    fatalities: false,
    propertyDamage: false,
    citations: [] as string[],
    photos: [] as string[],
    diagram: "",
    witnesses: [] as {
      name: string;
      contact: string;
      statement: string;
    }[],
    officerNotes: ""
  });
  const addVehicle = () => {
    setFormData(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, {
        id: `VEH-${prev.vehicles.length + 1}`,
        make: "",
        model: "",
        year: "",
        color: "",
        licensePlate: "",
        state: "",
        damage: "",
        insuranceInfo: "",
        driverInfo: {
          name: "",
          license: "",
          address: "",
          phone: "",
          injuries: ""
        }
      }]
    }));
  };
  const removeVehicle = (index: number) => {
    setFormData(prev => ({
      ...prev,
      vehicles: prev.vehicles.filter((_, i) => i !== index)
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAccidentReport(formData);
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">New Accident Report</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Accident Type
              </label>
              <select className="w-full px-4 py-2 border rounded-lg" value={formData.type} onChange={e => setFormData(prev => ({
              ...prev,
              type: e.target.value as AccidentType
            }))}>
                <option value="Vehicle-Vehicle">Vehicle-Vehicle</option>
                <option value="Vehicle-Pedestrian">Vehicle-Pedestrian</option>
                <option value="Vehicle-Property">Vehicle-Property</option>
                <option value="Single Vehicle">Single Vehicle</option>
                <option value="Multi-Vehicle">Multi-Vehicle</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Date & Time
              </label>
              <input type="datetime-local" className="w-full px-4 py-2 border rounded-lg" value={formData.dateTime} onChange={e => setFormData(prev => ({
              ...prev,
              dateTime: e.target.value
            }))} />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Vehicles Involved</h3>
              <button type="button" onClick={addVehicle} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                <Plus className="h-4 w-4" /> Add Vehicle
              </button>
            </div>
            {formData.vehicles.map((vehicle, index) => <div key={vehicle.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Vehicle #{index + 1}</h4>
                  {index > 0 && <button type="button" onClick={() => removeVehicle(index)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </button>}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <input type="text" placeholder="Make" className="px-4 py-2 border rounded-lg" value={vehicle.make} onChange={e => setFormData(prev => ({
                ...prev,
                vehicles: prev.vehicles.map((v, i) => i === index ? {
                  ...v,
                  make: e.target.value
                } : v)
              }))} />
                  <input type="text" placeholder="Model" className="px-4 py-2 border rounded-lg" value={vehicle.model} onChange={e => setFormData(prev => ({
                ...prev,
                vehicles: prev.vehicles.map((v, i) => i === index ? {
                  ...v,
                  model: e.target.value
                } : v)
              }))} />
                  <input type="text" placeholder="Year" className="px-4 py-2 border rounded-lg" value={vehicle.year} onChange={e => setFormData(prev => ({
                ...prev,
                vehicles: prev.vehicles.map((v, i) => i === index ? {
                  ...v,
                  year: e.target.value
                } : v)
              }))} />
                </div>
              </div>)}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Weather Conditions
              </label>
              <select className="w-full px-4 py-2 border rounded-lg" value={formData.weather} onChange={e => setFormData(prev => ({
              ...prev,
              weather: e.target.value as WeatherCondition
            }))}>
                <option value="Clear">Clear</option>
                <option value="Rain">Rain</option>
                <option value="Snow">Snow</option>
                <option value="Fog">Fog</option>
                <option value="Wind">Wind</option>
                <option value="Ice">Ice</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Road Conditions
              </label>
              <select className="w-full px-4 py-2 border rounded-lg" value={formData.roadCondition} onChange={e => setFormData(prev => ({
              ...prev,
              roadCondition: e.target.value as RoadCondition
            }))}>
                <option value="Dry">Dry</option>
                <option value="Wet">Wet</option>
                <option value="Icy">Icy</option>
                <option value="Snow Covered">Snow Covered</option>
                <option value="Under Construction">Under Construction</option>
                <option value="Debris">Debris</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>;
};