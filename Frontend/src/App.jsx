import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingPage from './pages/OnboardingPage';
import Dashboard from './pages/Dashboard';
import AppearancePage from './pages/AppearancePage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
// import { UserProvider } from './context/UserContext';

// function App() {
//   return (
//     // <UserProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/signup" element={<SignupPage />} />
//           <Route path="/onboarding" element={<OnboardingPage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/appearance" element={<AppearancePage />} />
//           <Route path="/analytics" element={<AnalyticsPage />} />
//           <Route path="/settings" element={<SettingsPage />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Router>
//     // </UserProvider>
//   );
// }

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appearance" element={<AppearancePage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;