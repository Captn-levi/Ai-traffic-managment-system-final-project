import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';

// Police Officer Screens
import PoliceLogin from './components/police/PoliceLogin';
import CapturePlate from './components/police/CapturePlate';
import VehicleVerification from './components/police/VehicleVerification';
import SelectViolation from './components/police/SelectViolation';
import IssuePenalty from './components/police/IssuePenalty';
import PenaltyReceipt from './components/police/PenaltyReceipt';
import DriverHistory from './components/police/DriverHistory';

// Driver/Civilian Screens
import DriverRegistration from './components/driver/DriverRegistration';
import DriverLogin from './components/driver/DriverLogin';
import DriverDashboard from './components/driver/DriverDashboard';
import PenaltyDetails from './components/driver/PenaltyDetails';
import DownloadReceipt from './components/driver/DownloadReceipt';
import ChatbotScreen from './components/driver/ChatbotScreen';
import UpdateProfile from './components/driver/UpdateProfile';

// Admin Dashboard Screens
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import ViolationManagement from './components/admin/ViolationManagement';
import ReportsAnalytics from './components/admin/ReportsAnalytics';
import SystemConfiguration from './components/admin/SystemConfiguration';
import AuditLogs from './components/admin/AuditLogs';
import AboutPage from './components/home/AboutPage';
import ContactPage from './components/home/ContactPage';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Police Officer Routes */}
        <Route path="/police/login" element={<PoliceLogin />} />
        <Route path="/police/capture-plate" element={<CapturePlate />} />
        <Route path="/police/vehicle-verification" element={<VehicleVerification />} />
        <Route path="/police/select-violation" element={<SelectViolation />} />
        <Route path="/police/issue-penalty" element={<IssuePenalty />} />
        <Route path="/police/penalty-receipt" element={<PenaltyReceipt />} />
        <Route path="/police/driver-history" element={<DriverHistory />} />
        
        {/* Driver/Civilian Routes */}
        <Route path="/driver/registration" element={<DriverRegistration />} />
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
        <Route path="/driver/penalty-details" element={<PenaltyDetails />} />
        <Route path="/driver/download-receipt" element={<DownloadReceipt />} />
        <Route path="/driver/chatbot" element={<ChatbotScreen />} />
        <Route path="/driver/update-profile" element={<UpdateProfile />} />
        
        {/* Admin Dashboard Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/violations" element={<ViolationManagement />} />
        <Route path="/admin/reports" element={<ReportsAnalytics />} />
        <Route path="/admin/configuration" element={<SystemConfiguration />} />
        <Route path="/admin/audit-logs" element={<AuditLogs />} />
      </Routes>
    </BrowserRouter>
  );
}
