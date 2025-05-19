import { Outlet } from "react-router-dom";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <div className="page-content">
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
