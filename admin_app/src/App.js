import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CreateEmployee from "./pages/CreateEmployee";
import ViewEmployees from "./pages/ViewEmployees";
import OldEmployees from "./pages/OldEmployees";
import ContactUs from "./pages/ContactUs";
import EmployeeLanding from "./pages/EmployeeLanding";
import HolidayList from "./pages/HolidayList";
import Salary from "./pages/Salary";
import LeaveApply from "./pages/LeaveApply";
import HrLanding from "./pages/HrLanding";
import LeaveSummary from "./pages/LeaveSummary";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [employees, setEmployees] = useState([]);

  const addEmployee = (emp) => {
    setEmployees([...employees, emp]);
  };

  if (!isLoggedIn) {
    return (
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setUserRole={setUserRole}
      />
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <div style={{
        width: "220px",
        backgroundColor: "#1e1e2f",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "1rem 0",
      }}>
        <h2 style={{ textAlign: "center", margin: "0 0 1rem", color: "#fff", fontSize: "1.2rem" }}>Dashboard</h2>
        <div style={{ flexGrow: 1 }}>
          {userRole === "hr" && (
            <>
              <SidebarLink to="/hr-landing" label="HR Home" />
              <SidebarLink to="/create" label="Create Employee" />
              <SidebarLink to="/view-employees" label="View Employees" />
              <SidebarLink to="/old" label="Old Employees" />
              <SidebarLink to="/contact" label="Contact Us" />
            </>
          )}
          {userRole === "employee" && (
            <>
              <SidebarLink to="/employee-landing" label="Home" />
              <SidebarLink to="/holiday-list" label="Holiday List" />
              <SidebarLink to="/salary" label="Salary" />
              <SidebarLink to="/leave-apply" label="Apply Leave" />
              <SidebarLink to="/leave-summary" label="My Leave Summary" />
            </>
          )}
        </div>
        <button
          onClick={() => {
            setIsLoggedIn(false);
            setUserRole(null);
          }}
          style={{
            background: "#f44336",
            color: "#fff",
            border: "none",
            padding: "0.5rem",
            cursor: "pointer",
            margin: "1rem",
            borderRadius: "4px"
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "1rem", backgroundColor: "#f4f5f9" }}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={userRole === "hr" ? "/hr-landing" : "/employee-landing"} />}
          />
          {userRole === "hr" && (
            <>
              <Route path="/create" element={<CreateEmployee addEmployee={addEmployee} />} />
              <Route path="/view-employees" element={<ViewEmployees employees={employees} />} />
              <Route path="/hr-landing" element={<HrLanding />} />
              <Route
                path="/old"
                element={<OldEmployees employees={employees.filter((e) => e.status === "inactive")} />}
              />
              <Route path="/contact" element={<ContactUs />} />
            </>
          )}
          {userRole === "employee" && (
            <>
              <Route path="/employee-landing" element={<EmployeeLanding />} />
              <Route path="/holiday-list" element={<HolidayList />} />
              <Route path="/salary" element={<Salary />} />
              <Route path="/leave-apply" element={<LeaveApply />} />
              <Route path="/leave-summary" element={<LeaveSummary />} />
            </>
          )}
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </div>
    </div>
  );
}

const SidebarLink = ({ to, label }) => (
  <Link
    to={to}
    style={{
      display: "block",
      padding: "0.75rem 1rem",
      color: "#fff",
      textDecoration: "none",
      transition: "background 0.3s",
    }}
    onMouseOver={(e) => (e.target.style.backgroundColor = "#292940")}
    onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
  >
    {label}
  </Link>
);

export default App;
