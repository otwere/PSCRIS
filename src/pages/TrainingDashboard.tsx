import React from "react";
import { useTraining } from "../contexts/TrainingContext";
import { Search, GraduationCap } from "lucide-react";
export const TrainingDashboard = () => {
  const {
    trainings
  } = useTraining();
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Training Dashboard</h1>
        <p className="text-gray-500">Manage department training programs</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input type="text" placeholder="Search training programs..." className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <GraduationCap className="h-4 w-4" />
              New Training
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {trainings.map(training => <div key={training.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium text-lg">{training.title}</h3>
                    <p className="text-gray-500 text-sm">
                      {training.type} Training
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs ${training.status === "In Progress" ? "bg-blue-50 text-blue-600" : training.status === "Completed" ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-600"}`}>
                    {training.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Instructor</p>
                    <p className="font-medium">{training.instructor}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Department</p>
                    <p className="font-medium">{training.department}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Participants</p>
                    <p className="font-medium">
                      {training.currentParticipants}/{training.maxParticipants}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};