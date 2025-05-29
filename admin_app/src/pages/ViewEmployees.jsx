import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterDoj, setFilterDoj] = useState("");
  const [filterId, setFilterId] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:4000/api/employees")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
      });
  };

  //  Handle  toggle
  const toggleStatus = async (empId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await axios.patch(`http://localhost:4000/api/employees/${empId}`, { status: newStatus });

      // Refresh employees after update
      fetchEmployees();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  const filtered = employees.filter((emp) => {
    return (
      emp.name.toLowerCase().includes(filterName.toLowerCase()) &&
      emp.id.toLowerCase().includes(filterId.toLowerCase()) &&
      (filterDoj === "" || emp.doj === filterDoj)
    );
  });

  return (
    <div className="page-container">
      <h2>View Employees</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Filter by Date of Joining"
          value={filterDoj}
          onChange={(e) => setFilterDoj(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by ID"
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date of Joining</th>
            <th>Status</th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="5">No employees found</td>
            </tr>
          ) : (
            filtered.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.doj}</td>
                <td>{emp.status}</td>
                <td>
                  <button
                    onClick={() => toggleStatus(emp.id, emp.status)}
                    style={{
                      backgroundColor:
                      emp.status === "active" ? "#2196f3" : "#90a4ae",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {emp.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
