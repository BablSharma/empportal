import React, { useEffect, useState } from "react";

export default function OldEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/employees/inactive")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading inactive employees...</div>;
  }
  
  if (error) {
    return <div style={{ color: "red" }}>Failed to fetch inactive employees: {error}</div>;
  }
   
  return (
    <div className="page-container">
      <h2>Old Employees (Inactive)</h2>
      {employees.length === 0 ? (
        <p>No inactive employees found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date of Joining</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.doj}</td>
                <td>{emp.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
