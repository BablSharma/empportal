import React, { useEffect, useState } from "react";

export default function LeaveSummary() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const totalAvailableLeaves = 20;

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      setError("User ID not found in localStorage");
      return;
    }

    const fetchSummary = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/leaves/summary/${user_id}`);
        if (!res.ok) throw new Error("Failed to fetch summary");
        const data = await res.json();
        setSummary(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSummary();
  }, []); // no dependency since user_id comes from localStorage

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Leave Summary</h2>
      {error && <p style={styles.error}>{error}</p>}
      {summary && (
        <div style={styles.summaryBox}>
          <p>Total Leaves Available: <strong>{totalAvailableLeaves}</strong></p>
          <p>Total Leaves Applied: <strong>{summary.totalLeaves}</strong></p>
          <p>Approved Leaves: <strong>{summary.approvedLeaves}</strong></p>
          <p>Pending Leaves: <strong>{summary.pendingLeaves}</strong></p>
          <p>Rejected Leaves: <strong>{summary.rejectedLeaves}</strong></p>
          <p>Remaining Leaves: <strong>{totalAvailableLeaves - summary.approvedLeaves}</strong></p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    padding: 20,
    background: "white",
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: 20,
    color: "#007bff",
  },
  summaryBox: {
    lineHeight: 1.6,
    fontSize: "1rem",
  },
  error: {
    color: "red",
    fontWeight: "bold",
  },
};
