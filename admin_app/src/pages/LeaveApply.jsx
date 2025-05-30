import React, { useState, useEffect } from "react";

export default function LeaveApply() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
const [leaveList, setLeaveList] = useState([]);
const [leaveSummary, setLeaveSummary] = useState(null);


  const user_id = localStorage.getItem("user_id");
useEffect(() => {
  const fetchLeaveSummary = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/leaves/summary/${user_id}`);
      if (!res.ok) throw new Error("Failed to fetch summary");
      const data = await res.json();
      setLeaveSummary(data);
    } catch (err) {
      console.error("Summary fetch error:", err.message);
    }
  };

  fetchLeaveSummary();
}, [user_id]);




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

    if ([0, 6].includes(start.getDay()) || [0, 6].includes(end.getDay())) {
      setError("Leave cannot start or end on Saturdays or Sundays.");
      return;
    }
   
    const oneDayMs = 24 * 60 * 60 * 1000;
    const totalDays = Math.floor((end - start) / oneDayMs) + 1;
    const totalAllowedLeaves = 20;  // Total leave quota
const remainingLeaves = totalAllowedLeaves - (leaveSummary?.approvedLeaves || 0);

if (totalDays > remainingLeaves) {
  setError(`You only have ${remainingLeaves} leave day(s) remaining. Please reduce the leave duration.`);
  return;
}

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
      setMessage(`Leave applied from ${data.start_date} to ${data.end_date}. Total leave days: ${totalDays}`);
      setStartDate("");
      setEndDate("");
      setReason("");

      // Refresh leave list
      const updatedRes = await fetch(`http://localhost:4000/api/leaves/summary/${user_id}`);
      const updatedList = await updatedRes.json();
      setLeaveList(updatedList);
    } catch (err) {
      setError("Server error: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      {leaveSummary && (
  <div style={{ ...styles.summaryBox, marginBottom: 30 }}>
  <h4 style={{ color: "#007bff", marginBottom: 12 }}>Leave Details</h4>
  <div style={styles.gridContainer}>
    <div style={styles.gridItem}><strong>Total Available:</strong> 20</div>
    <div style={styles.gridItem}><strong>Applied:</strong> {leaveSummary.totalLeaves}</div>
    <div style={styles.gridItem}><strong>Approved:</strong> {leaveSummary.approvedLeaves}</div>
    <div style={styles.gridItem}><strong>Pending:</strong> {leaveSummary.pendingLeaves}</div>
    <div style={styles.gridItem}><strong>Rejected:</strong> {leaveSummary.rejectedLeaves}</div>
    <div style={styles.gridItem}><strong>Remaining:</strong> {20 - leaveSummary.approvedLeaves}</div>
  </div>
</div>

)}

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

        <button type="submit" style={styles.button}>Apply</button>
      </form>

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}

      <div style={{ marginTop: 40 }}>
        {leaveList.length > 0 && (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={styles.th}>Start</th>
        <th style={styles.th}>End</th>
        <th style={styles.th}>Days</th>
        <th style={styles.th}>Reason</th>
      </tr>
    </thead>
    <tbody>
      {leaveList.map((leave, index) => (
        <tr key={index}>
          <td style={styles.td}>{leave.start_date}</td>
          <td style={styles.td}>{leave.end_date}</td>
          <td style={styles.td}>{leave.total_days}</td>
          <td style={styles.td}>{leave.reason}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

      </div>
     

    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,               // wider container
    margin: "50px auto",
    padding: 32,
    background: "white",
    borderRadius: 16,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)", // stronger shadow
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#2c3e50",
  },
  heading: {
    textAlign: "center",
    marginBottom: 32,
    color: "#007bff",
    fontWeight: "700",
    fontSize: "2rem",
    letterSpacing: "1.1px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: 8,
    fontWeight: "700",
    color: "#34495e",
    fontSize: "1.05rem",
  },
  input: {
    padding: "14px 16px",
    fontSize: "1.1rem",
    borderRadius: 8,
    border: "1.8px solid #ced4da",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  inputFocus: {
    borderColor: "#007bff",
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
  },
  button: {
    padding: "14px 22px",
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 40,
    cursor: "pointer",
    boxShadow: "0 6px 12px rgba(0, 123, 255, 0.5)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
    boxShadow: "0 8px 20px rgba(0, 86, 179, 0.7)",
  },
  error: {
    marginTop: 24,
    color: "#e74c3c",
    fontWeight: "700",
    textAlign: "center",
    fontSize: "1rem",
  },
  success: {
    marginTop: 24,
    color: "#27ae60",
    fontWeight: "700",
    textAlign: "center",
    fontSize: "1rem",
  },
  th: {
    border: "1px solid #ddd",
    padding: 12,
    background: "#f8f9fa",
    textAlign: "left",
    fontWeight: "700",
    fontSize: "1.05rem",
    color: "#34495e",
  },
  td: {
    border: "1px solid #ddd",
    padding: 12,
    fontSize: "1rem",
    color: "#2c3e50",
  },
  summaryBox: {
    padding: 24,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    fontSize: "1.1rem",
    boxShadow: "inset 0 0 10px #dae1e7",
    marginBottom: 36,
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "16px 24px",
  },
  gridItem: {
    backgroundColor: "#fff",
    padding: "16px 20px",
    border: "1.5px solid #ddd",
    borderRadius: 10,
    fontWeight: "600",
    color: "#34495e",
    boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
    textAlign: "center",
  },
};
