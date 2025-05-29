import React, { useState } from "react";

export default function CreateEmployee() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [doj, setDoj] = useState("");
  const [status, setStatus] = useState("active");
  
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
      setId("");
      setName("");
      setDoj("");
      setStatus("active");
    } catch (err) {
      console.error("Failed to add employee:", err);
      alert("Error adding employee. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Employee ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
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
