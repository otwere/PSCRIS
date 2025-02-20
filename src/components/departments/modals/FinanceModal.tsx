import React from "react";
import { X, Save } from "lucide-react";
export const FinanceModal = ({
  onClose
}: {
  onClose: () => void;
}) => {
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">New Transaction</h3>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select className="w-full px-3 py-2 border rounded-lg">
              <option>Payroll</option>
              <option>Equipment Purchase</option>
              <option>Utilities</option>
              <option>Maintenance</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input type="number" className="w-full px-3 py-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea className="w-full px-3 py-2 border rounded-lg" rows={3} />
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>;
};