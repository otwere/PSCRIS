import React from "react";
import { useCase } from "../contexts/CaseContext";
import { CaseList } from "../components/CaseList";
export const CivilCases = () => {
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Civil Cases</h1>
        <p className="text-gray-500">Manage and monitor civil cases</p>
      </div>
      <CaseList />
    </div>;
};