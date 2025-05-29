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
  const [employees, setEmployees] = useState([
    
  ]);

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
    <div>
      <nav className="nav" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          {userRole === "hr" && (
            <>
              <Link to="/create">Create Employee</Link>
              <Link to="/view-employees">View Employees</Link>
              <Link to="/hr-landing">HR Home</Link>
              <Link to="/old">Old Employees</Link>
              <Link to="/contact">Contact Us</Link>
            </>
          )}
          {userRole === "employee" && (
            <>
              <Link to="/employee-landing">Home</Link>
              <Link to="/holiday-list">Holiday List</Link>
              <Link to="/salary">Salary</Link>
              <Link to="/leave-apply">Apply Leave</Link>
              <Link to="/leave-summary">My Leave Summary</Link> 

            </>
          )}
        </div>

        <button
          onClick={() => {
            setIsLoggedIn(false);
            setUserRole(null);
          }}
        >
          Logout
        </button>
      </nav>

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
  );
}

export default App;
