import React, { useState } from "react";

export default function LeaveApply() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // For demo replaced to use real id 
  const user_id = localStorage.getItem("user_id");

 const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setError("");

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (end < start) {
    setError("End date cannot be before start date.");
    return;
  }

  // Check if start or end date is Saturday or Sunday
  if (start.getDay() === 6 || start.getDay() === 0 || end.getDay() === 6 || end.getDay() === 0) {
    setError("Leave cannot start or end on Saturdays or Sundays.");
    return;
  }

  //  (sandwich leave logic)
  const oneDayMs = 24 * 60 * 60 * 1000;
  const totalDays = Math.floor((end - start) / oneDayMs) + 1;

  
  try {
    const res = await fetch("http://localhost:4000/api/leaves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id,
        start_date: startDate,
        end_date: endDate,
        reason,
        total_days: totalDays, 
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to apply leave");
      return;
    }

    const data = await res.json();
    setMessage(
      `Leave applied from ${data.start_date} to ${data.end_date}. Total leave days (including weekends): ${totalDays}`
    );
    setStartDate("");
    setEndDate("");
    setReason("");
  } catch (err) {
    setError("Server error: " + err.message);
  }
};
return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Apply for Leave</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            style={styles.input}
            min={startDate}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            rows={4}
            style={{ ...styles.input, resize: "vertical" }}
            placeholder="Enter your leave reason here..."
          />
        </div>

        <button type="submit" style={styles.button}>
          Apply
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 480,
    margin: "40px auto",
    padding: 24,
    background: "white",
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: 24,
    color: "#007bff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    padding: "10px 12px",
    fontSize: "1rem",
    borderRadius: 6,
    border: "1.5px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: "12px 20px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 30,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  error: {
    marginTop: 20,
    color: "red",
    fontWeight: "600",
    textAlign: "center",
  },
  success: {
    marginTop: 20,
    color: "green",
    fontWeight: "600",
    textAlign: "center",
  },
};
