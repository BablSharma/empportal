import React, { useState, useEffect } from "react";

function generateEmployeeId() {
  return "EMP" + Math.floor(100000 + Math.random() * 900000);
}

export default function CreateEmployee() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [doj, setDoj] = useState("");
  const [status, setStatus] = useState("active");

  // Generate ID on mount or after successful submit
  useEffect(() => {
    setId(generateEmployeeId());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = { id, name, doj, status };

    try {
      const response = await fetch("http://localhost:4000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        const { error } = await response.json();
        alert("Error: " + error);
        return;
      }

      const result = await response.json();
      console.log("Employee added:", result);

      alert("Employee added successfully!");

      // Clear inputs (except id, regenerate new one)
      setName("");
      setDoj("");
      setStatus("active");
      setId(generateEmployeeId());
    } catch (err) {
      console.error("Failed to add employee:", err);
      alert("Error adding employee. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} className="form">
        {/* Show the generated ID but disabled so user can see it but not edit */}
        <input
          type="text"
          value={id}
          disabled
          style={{ backgroundColor: "#eee", cursor: "not-allowed" }}
          aria-label="Employee ID (auto-generated)"
        />

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date of Joining"
          value={doj}
          onChange={(e) => setDoj(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}
