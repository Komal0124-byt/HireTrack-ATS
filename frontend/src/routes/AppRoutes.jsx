import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Jobs from "../pages/jobs/Jobs";
import Candidates from "../pages/candidates/Candidates";
import Interviews from "../pages/interviews/Interviews";
import Settings from "../pages/settings/Settings";
import ProtectedRoute from "./ProtectedRoute";
function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
           path="/candidates"
            element={
               <ProtectedRoute>
               <Candidates />
               </ProtectedRoute>
              }
        />
        <Route
  path="/jobs"
  element={
    <ProtectedRoute>
      <Jobs />
    </ProtectedRoute>
  }
/>

<Route
  path="/interviews"
  element={
    <ProtectedRoute>
      <Interviews />
    </ProtectedRoute>
  }
/>

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;