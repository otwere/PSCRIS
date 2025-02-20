import React from "react";
import { CaseOverview } from "../components/CaseOverview";
import { CaseList } from "../components/CaseList";
import { CurrentDateTime } from "../components/CurrentDateTime";
export const Dashboard = () => {
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <CurrentDateTime />
      </div>
      <CaseOverview />
      <CaseList />
    </div>;
};