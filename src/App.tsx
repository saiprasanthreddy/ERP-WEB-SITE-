
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/Layout/DashboardLayout";
import Login from "./pages/auth/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Student Routes */}
            <Route path="/student/*" element={
              <ProtectedRoute requiredRole="student">
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="profile" element={<div className="p-6">Student Profile - Coming Soon</div>} />
              <Route path="courses" element={<div className="p-6">Student Courses - Coming Soon</div>} />
              <Route path="attendance" element={<div className="p-6">Student Attendance - Coming Soon</div>} />
              <Route path="exams" element={<div className="p-6">Student Exams - Coming Soon</div>} />
              <Route path="results" element={<div className="p-6">Student Results - Coming Soon</div>} />
              <Route path="fees" element={<div className="p-6">Student Fees - Coming Soon</div>} />
              <Route path="notices" element={<div className="p-6">Student Notices - Coming Soon</div>} />
            </Route>

            {/* Faculty Routes */}
            <Route path="/faculty/*" element={
              <ProtectedRoute requiredRole="faculty">
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<FacultyDashboard />} />
              <Route path="profile" element={<div className="p-6">Faculty Profile - Coming Soon</div>} />
              <Route path="subjects" element={<div className="p-6">Faculty Subjects - Coming Soon</div>} />
              <Route path="attendance" element={<div className="p-6">Faculty Attendance - Coming Soon</div>} />
              <Route path="marks" element={<div className="p-6">Mark Entry - Coming Soon</div>} />
              <Route path="materials" element={<div className="p-6">Course Materials - Coming Soon</div>} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/*" element={
              <ProtectedRoute requiredRole="admin">
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<div className="p-6">Student Management - Coming Soon</div>} />
              <Route path="faculty" element={<div className="p-6">Faculty Management - Coming Soon</div>} />
              <Route path="courses" element={<div className="p-6">Course Management - Coming Soon</div>} />
              <Route path="exams" element={<div className="p-6">Exam Management - Coming Soon</div>} />
              <Route path="fees" element={<div className="p-6">Fee Management - Coming Soon</div>} />
              <Route path="notices" element={<div className="p-6">Notice Management - Coming Soon</div>} />
              <Route path="settings" element={<div className="p-6">Admin Settings - Coming Soon</div>} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
