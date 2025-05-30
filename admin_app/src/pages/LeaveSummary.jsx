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
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Leave Summary</h2>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {summary && (
          <div style={styles.grid}>
            <div style={styles.item}>
              <span style={styles.label}>Total Available:</span>
              <span style={styles.value}>{totalAvailableLeaves}</span>
            </div>
            <div style={styles.item}>
              <span style={styles.label}>Applied:</span>
              <span style={styles.value}>{summary.totalLeaves}</span>
            </div>
            <div style={styles.item}>
              <span style={styles.label}>Approved:</span>
              <span style={styles.value}>{summary.approvedLeaves}</span>
            </div>
            <div style={styles.item}>
              <span style={styles.label}>Pending:</span>
              <span style={styles.value}>{summary.pendingLeaves}</span>
            </div>
            <div style={styles.item}>
              <span style={styles.label}>Rejected:</span>
              <span style={styles.value}>{summary.rejectedLeaves}</span>
            </div>
            <div style={styles.item}>
              <span style={styles.label}>Remaining:</span>
              <span style={styles.value}>
                {totalAvailableLeaves - summary.approvedLeaves}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 50,
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh",
  },
  card: {
    width: "100%",
    maxWidth: 800,
    background: "#fff",
    borderRadius: 16,
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(to right, #007bff, #00c6ff)",
    padding: "30px 40px",
    color: "white",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "2rem",
    fontWeight: 600,
    letterSpacing: 1,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    padding: "40px",
    gap: "30px",
    backgroundColor: "#f8f9fa",
  },
  item: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    textAlign: "left",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  label: {
    fontWeight: "600",
    color: "#555",
    display: "block",
    fontSize: "1.05rem",
    marginBottom: 6,
  },
  value: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#007bff",
  },
  error: {
    color: "red",
    textAlign: "center",
    padding: "20px",
    fontWeight: "bold",
  },
};
