import React, { useEffect, useState } from "react";

export default function LeaveSummary() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  // Divide the total available leaves into categories
  const leaveCategories = {
    sickLeave: 8,
    casualLeave: 6,
    paidLeave: 6,
  };
   
  const totalAvailableLeaves =
    leaveCategories.sickLeave +
    leaveCategories.casualLeave +
    leaveCategories.paidLeave;

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      setError("User ID not found in localStorage");
      return;
    }

    const fetchSummary = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/leaves/summary/${user_id}`
        );
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
          <>
            <div style={{ ...styles.grid, marginBottom: 20 }}>
              <div style={styles.item}>
                <span>Total Available</span>
                <strong>{totalAvailableLeaves}</strong>
              </div>
              <div style={styles.item}>
                <span>Applied</span>
                <strong>{summary.totalLeaves}</strong>
              </div>
              <div style={styles.item}>
                <span>Approved</span>
                <strong>{summary.approvedLeaves}</strong>
              </div>
              <div style={styles.item}>
                <span>Pending</span>
                <strong>{summary.pendingLeaves}</strong>
              </div>
              <div style={styles.item}>
                <span>Rejected</span>
                <strong>{summary.rejectedLeaves}</strong>
              </div>
              <div style={styles.item}>
                <span>Remaining</span>
                <strong>{totalAvailableLeaves - summary.approvedLeaves}</strong>
              </div>
            </div>

            {/* Display leave categories */}
            <div style={styles.header}>
              <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Leave Categories</h3>
            </div>
            <div style={styles.grid}>
              <div style={styles.item}>
                <span>Sick Leave</span>
                <strong>{leaveCategories.sickLeave}</strong>
              </div>
              <div style={styles.item}>
                <span>Casual Leave</span>
                <strong>{leaveCategories.casualLeave}</strong>
              </div>
              <div style={styles.item}>
                <span>Paid Leave</span>
                <strong>{leaveCategories.paidLeave}</strong>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 30,
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 500,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  header: {
    background: "linear-gradient(to right, #007bff, #00c6ff)",
    padding: "20px 30px",
    color: "white",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    padding: "20px 30px",
    gap: "20px 30px",
    backgroundColor: "#f8f9fa",
  },
  item: {
    background: "#fff",
    padding: "15px",
    borderRadius: 8,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  error: {
    color: "red",
    textAlign: "center",
    padding: "20px",
    fontWeight: "bold",
  },
};
