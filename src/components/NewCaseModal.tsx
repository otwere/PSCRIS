import React, { useState } from "react";
import { X, Upload, Printer } from "lucide-react";
import { useCase } from "../contexts/CaseContext";
import { useOfficer } from "../contexts/OfficerContext";
type PhotoExhibit = {
  id: string;
  file: File;
  preview: string;
};
export const NewCaseModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    addCase
  } = useCase();
  const {
    officers
  } = useOfficer();
  const [photos, setPhotos] = useState<PhotoExhibit[]>([]);
  const [formData, setFormData] = useState({
    type: "civil",
    priority: "low",
    title: "",
    description: "",
    location: "",
    dateOfIncident: "",
    complainant: {
      name: "",
      contact: "",
      address: ""
    },
    defendant: {
      name: "",
      contact: "",
      address: ""
    },
    assignedOfficer: ""
  });
  const generateOBNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
    return `OB-${year}${month}${day}-${random}`;
  };
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = files.map((file, index) => ({
      id: `EXH-${Date.now()}-${index + 1}`,
      file,
      preview: URL.createObjectURL(file)
    }));
    setPhotos(prev => [...prev, ...newPhotos]);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const obNumber = generateOBNumber();
    // Add case logic here
    // Print functionality would go here
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Create New Case</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Case Type
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.type} onChange={e => setFormData(prev => ({
              ...prev,
              type: e.target.value
            }))}>
                <option value="civil">Civil</option>
                <option value="crime">Crime</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.priority} onChange={e => setFormData(prev => ({
              ...prev,
              priority: e.target.value
            }))}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Complainant Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.complainant.name} onChange={e => setFormData(prev => ({
                ...prev,
                complainant: {
                  ...prev.complainant,
                  name: e.target.value
                }
              }))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact
                </label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.complainant.contact} onChange={e => setFormData(prev => ({
                ...prev,
                complainant: {
                  ...prev.complainant,
                  contact: e.target.value
                }
              }))} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.complainant.address} onChange={e => setFormData(prev => ({
                ...prev,
                complainant: {
                  ...prev.complainant,
                  address: e.target.value
                }
              }))} />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Defendant Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.defendant.name} onChange={e => setFormData(prev => ({
                ...prev,
                defendant: {
                  ...prev.defendant,
                  name: e.target.value
                }
              }))} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact
                </label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.defendant.contact} onChange={e => setFormData(prev => ({
                ...prev,
                defendant: {
                  ...prev.defendant,
                  contact: e.target.value
                }
              }))} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.defendant.address} onChange={e => setFormData(prev => ({
                ...prev,
                defendant: {
                  ...prev.defendant,
                  address: e.target.value
                }
              }))} />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Case Title
              </label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.title} onChange={e => setFormData(prev => ({
              ...prev,
              title: e.target.value
            }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea rows={4} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.description} onChange={e => setFormData(prev => ({
              ...prev,
              description: e.target.value
            }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.location} onChange={e => setFormData(prev => ({
              ...prev,
              location: e.target.value
            }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Officer on Duty
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.assignedOfficer} onChange={e => setFormData(prev => ({
              ...prev,
              assignedOfficer: e.target.value
            }))}>
                <option value="">Select Officer</option>
                {officers.filter(o => o.status === "On Duty").map(officer => <option key={officer.id} value={officer.id}>
                      {officer.rank} {officer.name} ({officer.badge})
                    </option>)}
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Photo Exhibits</h3>
            <div className="grid grid-cols-4 gap-4">
              {photos.map(photo => <div key={photo.id} className="relative">
                  <img src={photo.preview} alt="Exhibit" className="w-full h-32 object-cover rounded-lg" />
                  <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    {photo.id}
                  </span>
                </div>)}
              <label className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-blue-500">
                <input type="file" className="hidden" accept="image/*" multiple onChange={handlePhotoUpload} />
                <Upload className="h-6 w-6 text-gray-400" />
              </label>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Create & Print
            </button>
          </div>
        </form>
      </div>
    </div>;
};