import React from "react";
import { Car, AlertTriangle, MapPin, Clock, Calendar, TrendingUp, Users, Shield } from "lucide-react";
import { useTraffic } from "../contexts/TrafficContext";
import { CurrentDateTime } from "../components/CurrentDateTime";
export const TrafficAnalytics = () => {
  const {
    incidents,
    accidentReports
  } = useTraffic();
  const totalIncidents = incidents.length;
  const totalAccidents = accidentReports.length;
  const resolvedIncidents = incidents.filter(inc => inc.status === "Resolved").length;
  const severityDistribution = incidents.reduce((acc, inc) => ({
    ...acc,
    [inc.severity]: (acc[inc.severity] || 0) + 1
  }), {} as Record<string, number>);
  const monthlyData = [{
    month: "Jan",
    incidents: 45,
    accidents: 12
  }, {
    month: "Feb",
    incidents: 38,
    accidents: 15
  }, {
    month: "Mar",
    incidents: 52,
    accidents: 18
  }, {
    month: "Apr",
    incidents: 41,
    accidents: 14
  }, {
    month: "May",
    incidents: 48,
    accidents: 16
  }, {
    month: "Jun",
    incidents: 55,
    accidents: 20
  }];
  const accidentTypes = {
    "Vehicle-Vehicle": 45,
    "Vehicle-Pedestrian": 15,
    "Vehicle-Property": 25,
    "Single Vehicle": 15
  };
  const timeDistribution = {
    "Morning (6AM-12PM)": 35,
    "Afternoon (12PM-6PM)": 40,
    "Evening (6PM-12AM)": 15,
    "Night (12AM-6AM)": 10
  };
  return <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Traffic Analytics</h1>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <p className="text-gray-500">
            Comprehensive analysis of traffic incidents and patterns
          </p>
          <CurrentDateTime />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Car className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold">Total Incidents</h3>
          </div>
          <p className="text-2xl font-semibold">{totalIncidents}</p>
          <p className="text-sm text-green-600 mt-2">+12% from last month</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <h3 className="font-semibold">Total Accidents</h3>
          </div>
          <p className="text-2xl font-semibold">{totalAccidents}</p>
          <p className="text-sm text-red-600 mt-2">+5% from last month</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold">Resolution Rate</h3>
          </div>
          <p className="text-2xl font-semibold">
            {Math.round(resolvedIncidents / totalIncidents * 100)}%
          </p>
          <p className="text-sm text-green-600 mt-2">+8% from last month</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold">Avg Response Time</h3>
          </div>
          <p className="text-2xl font-semibold">12 min</p>
          <p className="text-sm text-green-600 mt-2">-2 min from last month</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Monthly Trends</h3>
          <div className="h-64">
            <div className="h-full flex items-end justify-between gap-2">
              {monthlyData.map(data => <div key={data.month} className="flex flex-col items-center gap-2">
                  <div className="flex flex-col gap-1 w-12">
                    <div className="bg-blue-500 rounded-t-sm" style={{
                  height: `${data.incidents / 60 * 200}px`
                }} />
                    <div className="bg-red-500 rounded-t-sm" style={{
                  height: `${data.accidents / 60 * 200}px`
                }} />
                  </div>
                  <span className="text-xs text-gray-600">{data.month}</span>
                </div>)}
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm" />
              <span className="text-sm text-gray-600">Incidents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm" />
              <span className="text-sm text-gray-600">Accidents</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Accident Types Distribution</h3>
          <div className="space-y-4">
            {Object.entries(accidentTypes).map(([type, count]) => <div key={type}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{type}</span>
                  <span className="font-medium">{count}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-blue-600 rounded-full" style={{
                width: `${count}%`
              }} />
                </div>
              </div>)}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Time Distribution</h3>
          <div className="space-y-4">
            {Object.entries(timeDistribution).map(([time, percentage]) => <div key={time}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{time}</span>
                  <span className="font-medium">{percentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full bg-purple-600 rounded-full" style={{
                width: `${percentage}%`
              }} />
                </div>
              </div>)}
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Incident Severity Analysis</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(severityDistribution).map(([severity, count]) => <div key={severity} className="border rounded-lg p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${severity === "Critical" ? "bg-red-50" : severity === "Severe" ? "bg-orange-50" : severity === "Moderate" ? "bg-yellow-50" : "bg-green-50"}`}>
                  <AlertTriangle className={`h-5 w-5 ${severity === "Critical" ? "text-red-600" : severity === "Severe" ? "text-orange-600" : severity === "Moderate" ? "text-yellow-600" : "text-green-600"}`} />
                </div>
                <div>
                  <p className="text-sm font-medium">{severity}</p>
                  <p className="text-2xl font-semibold">{count}</p>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};