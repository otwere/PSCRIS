import React from "react";
import { MemoryRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CaseProvider } from "./contexts/CaseContext";
import { OfficerProvider } from "./contexts/OfficerContext";
import { DepartmentProvider } from "./contexts/DepartmentContext";
import { DutyRosterProvider } from "./contexts/DutyRosterContext";
import { TrainingProvider } from "./contexts/TrainingContext";
import { DashboardLayout } from "./components/DashboardLayout";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./pages/Dashboard";
import { Analytics } from "./pages/Analytics";
import { CasesDashboard } from "./pages/CasesDashboard";
import { CivilCases } from "./pages/CivilCases";
import { CriminalCases } from "./pages/CriminalCases";
import { ActiveInvestigations } from "./pages/ActiveInvestigations";
import { PersonnelManagement } from "./pages/PersonnelManagement";
import { DepartmentManagement } from "./pages/DepartmentManagement";
import { DutyRoster } from "./pages/DutyRoster";
import { TrainingDashboard } from "./pages/TrainingDashboard";
import { EvidenceTracking } from "./pages/EvidenceTracking";
import { WitnessStatements } from "./pages/WitnessStatements";
import { CaseTimeline } from "./pages/CaseTimeline";
import { SystemSettings } from "./pages/SystemSettings";
import { UserManagement } from "./pages/UserManagement";
import { RoleManagement } from "./pages/RoleManagement";
import { CourtFiles } from "./pages/CourtFiles";
import { CourtCaseProcess } from "./pages/CourtCaseProcess";
import { CourtProvider } from "./contexts/CourtContext";
import { InmateProvider } from "./contexts/InmateContext";
import { InmateList } from "./pages/InmateList";
import { AccessControl } from "./pages/AccessControl";
import { Configuration } from "./pages/Configuration";
import { AuditLogs } from "./pages/AuditLogs";
import { EvidenceProvider } from "./contexts/EvidenceContext";
import { WitnessProvider } from "./contexts/WitnessContext";
import { TrafficProvider } from "./contexts/TrafficContext";
import { TrafficManagement } from "./pages/TrafficManagement";
import { Communication } from "./pages/Communication";
import { TrafficAnalytics } from "./pages/TrafficAnalytics";
import { CybercrimeProvider } from "./contexts/CybercrimeContext";
import { CybercrimeUnit } from "./pages/CybercrimeUnit";
const PrivateRoute: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const {
    user
  } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};
const AdminRoute: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const {
    user,
    hasPermission
  } = useAuth();
  if (!user || !hasPermission("canManageSystem")) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
const AppRoutes = () => {
  return <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/cases" element={<CasesDashboard />} />
        <Route path="/cases/civil" element={<CivilCases />} />
        <Route path="/cases/criminal" element={<CriminalCases />} />
        <Route path="/investigation/active" element={<ActiveInvestigations />} />
        <Route path="/investigation/evidence" element={<EvidenceTracking />} />
        <Route path="/investigation/witnesses" element={<WitnessStatements />} />
        <Route path="/investigation/timeline" element={<CaseTimeline />} />
        <Route path="/personnel/officers" element={<PersonnelManagement />} />
        <Route path="/personnel/departments" element={<DepartmentManagement />} />
        <Route path="/personnel/roster" element={<DutyRoster />} />
        <Route path="/personnel/training" element={<TrainingDashboard />} />
        <Route path="/admin/settings" element={<AdminRoute>
              <SystemSettings />
            </AdminRoute>} />
        <Route path="/system/users" element={<UserManagement />} />
        <Route path="/system/roles" element={<RoleManagement />} />
        <Route path="/cases/court-files" element={<CourtFiles />} />
        <Route path="/cases/court-process" element={<CourtCaseProcess />} />
        <Route path="/inmates" element={<InmateList />} />
        <Route path="/system/access-control" element={<AccessControl />} />
        <Route path="/system/configuration" element={<Configuration />} />
        <Route path="/system/audit-logs" element={<AuditLogs />} />
        <Route path="/traffic" element={<TrafficManagement />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/traffic/analytics" element={<TrafficAnalytics />} />
        <Route path="/cybercrime" element={<CybercrimeUnit />} />
      </Routes>
    </DashboardLayout>;
};
export function App() {
  return <AuthProvider>
      <DepartmentProvider>
        <OfficerProvider>
          <CaseProvider>
            <CourtProvider>
              <InmateProvider>
                <DutyRosterProvider>
                  <TrainingProvider>
                    <EvidenceProvider>
                      <WitnessProvider>
                        <TrafficProvider>
                          <CybercrimeProvider>
                            <Router>
                              <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/*" element={<PrivateRoute>
                                      <AppRoutes />
                                    </PrivateRoute>} />
                              </Routes>
                            </Router>
                          </CybercrimeProvider>
                        </TrafficProvider>
                      </WitnessProvider>
                    </EvidenceProvider>
                  </TrainingProvider>
                </DutyRosterProvider>
              </InmateProvider>
            </CourtProvider>
          </CaseProvider>
        </OfficerProvider>
      </DepartmentProvider>
    </AuthProvider>;
}