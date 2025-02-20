import React from "react";
import { X, Save } from "lucide-react";
export const ITModal = ({
  onClose
}: {
  onClose: () => void;
}) => {
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">New Support Ticket</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Issue Type</label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>Hardware</option>
              <option>Software</option>
              <option>Network</option>
              <option>Security</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea className="w-full px-3 py-2 border rounded-lg" rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Requestor</label>
            <input type="text" className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>;
};