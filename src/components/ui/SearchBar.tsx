import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
export type SearchFilter = {
  id: string;
  label: string;
  type: "select" | "date" | "text";
  options?: {
    value: string;
    label: string;
  }[];
};
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onFilter?: (filters: Record<string, any>) => void;
  placeholder?: string;
  filters?: SearchFilter[];
}
export const SearchBar = ({
  value,
  onChange,
  onFilter,
  placeholder = "Search...",
  filters
}: SearchBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const handleFilterChange = (filterId: string, value: any) => {
    const newFilters = {
      ...activeFilters,
      [filterId]: value
    };
    setActiveFilters(newFilters);
    onFilter?.(newFilters);
  };
  const clearFilters = () => {
    setActiveFilters({});
    onFilter?.({});
  };
  return <div className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
        </div>
        {filters && <button onClick={() => setShowFilters(!showFilters)} className={`p-2 border rounded-lg ${Object.keys(activeFilters).length > 0 ? "border-blue-500 text-blue-600" : "border-gray-200 text-gray-600"} hover:bg-gray-50`}>
            <Filter className="h-4 w-4" />
          </button>}
      </div>
      {showFilters && filters && <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border p-4 z-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filters</h3>
            {Object.keys(activeFilters).length > 0 && <button onClick={clearFilters} className="text-sm text-red-600 hover:text-red-700">
                Clear all
              </button>}
          </div>
          <div className="space-y-4">
            {filters.map(filter => <div key={filter.id}>
                <label className="block text-sm font-medium mb-1">
                  {filter.label}
                </label>
                {filter.type === "select" && <select className="w-full px-3 py-2 border rounded-lg" value={activeFilters[filter.id] || ""} onChange={e => handleFilterChange(filter.id, e.target.value)}>
                    <option value="">All</option>
                    {filter.options?.map(option => <option key={option.value} value={option.value}>
                        {option.label}
                      </option>)}
                  </select>}
                {filter.type === "date" && <input type="date" className="w-full px-3 py-2 border rounded-lg" value={activeFilters[filter.id] || ""} onChange={e => handleFilterChange(filter.id, e.target.value)} />}
                {filter.type === "text" && <input type="text" className="w-full px-3 py-2 border rounded-lg" value={activeFilters[filter.id] || ""} onChange={e => handleFilterChange(filter.id, e.target.value)} />}
              </div>)}
          </div>
        </div>}
    </div>;
};