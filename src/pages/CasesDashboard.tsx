import React from "react";
import { CaseList } from "../components/CaseList";
export const CasesDashboard = () => {
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Cases Dashboard</h1>
        <p className="text-gray-500">Manage and monitor all cases</p>
      </div>
      <CaseList />
    </div>;
};