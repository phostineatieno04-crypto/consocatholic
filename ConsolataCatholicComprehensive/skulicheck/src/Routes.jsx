import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import AdminDashboard from "pages/admin-dashboard";
import ParentDashboard from "pages/parent-dashboard";
import LoginAuthentication from "pages/login-authentication";
import StudentDashboard from "pages/student-dashboard";
import TeacherDashboard from "pages/teacher-dashboard";
import SchoolEventsMemories from "pages/school-events-memories";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LoginAuthentication />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/login-authentication" element={<LoginAuthentication />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/school-events-memories" element={<SchoolEventsMemories />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;