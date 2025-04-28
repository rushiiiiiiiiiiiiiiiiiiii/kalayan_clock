import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import NotificationForm from "./Pages/Notification/Notification";
import ImageUpload from "./Pages/BgimageUpload/Upload";
import AddClock from "./Pages/AddClock/AddClock";
import SendNotification from "./Pages/SendNotification/sendnotification";
import SunTimings from "./Pages/SunTimings/SunTimings";
import ExcelUpload from "./Pages/UploadExcel/excel";
import Dashboard from "./Pages/Dashbaord/Dashboard"; // Your existing Dashboard path
import AdminLayout from "./Pages/Layout/AdminLayout"; // Import Layout
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import SubscriptionForm from "./Pages/subscription/SubscriptionForm"; // ✅ Import Subscription Form

function App() {
  return (
    <Routes>
      {/* ✅ Redirect Root to Login Page */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* ✅ Public Route - Login Page */}
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ✅ Admin Layout Wrapper (No Authentication) */}
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AddNotification" element={<NotificationForm />} />
        <Route path="/AddBg" element={<ImageUpload />} />
        <Route path="/Addclock" element={<AddClock />} />
        <Route path="/SendNotification" element={<SendNotification />} />
        <Route path="/SunTimings" element={<SunTimings />} />
        <Route path="/upload" element={<ExcelUpload />} />
        <Route path="/subscription" element={<SubscriptionForm />} /> {/* ✅ Add Route */}
      </Route>

      {/* ✅ Redirect Unknown Routes to Login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
