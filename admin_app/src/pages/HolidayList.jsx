import React, { useEffect, useState } from "react";

export default function HolidayList() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching dynamic holiday list 
  const fetchHolidays = async () => {
    try {
      // F holidays according 
      const data = [
        { id: 1, date: "2025-01-26", name: "Republic Day" },
        { id: 2, date: "2025-08-15", name: "Independence Day" },
        { id: 3, date: "2025-10-02", name: "Gandhi Jayanti" },
        { id: 4, date: "2025-11-01", name: "Diwali" },
        { id: 5, date: "2025-11-07", name: "Bhai Dooj" },
        { id: 6, date: "2025-12-25", name: "Christmas" },
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setHolidays(data);
    } catch (err) {
      console.error("Failed to load holidays:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f4f7fc;
          color: #333;
        }
        .holiday-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(44, 62, 80, 0.15);
          animation: fadeIn 0.8s ease forwards;
        }
        .holiday-container h2 {
          text-align: center;
          color: #34495e;
          margin-bottom: 1.5rem;
        }
        .holiday-list {
          list-style-type: none;
          padding: 0;
        }
        .holiday-list li {
          padding: 10px;
          border-bottom: 1px solid #e0e0e0;
          transition: background-color 0.3s;
        }
        .holiday-list li:last-child {
          border-bottom: none;
        }
        .holiday-list li:hover {
          background-color: #f0f8ff;
        }
        .loading {
          text-align: center;
          color: #777;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="holiday-container">
        <h2> Holiday List</h2>

        {loading ? (
          <p className="loading">Loading holidays...</p>
        ) : (
          <ul className="holiday-list">
            {holidays.map((holiday) => (
              <li key={holiday.id}>
                <strong>{holiday.date}</strong>: {holiday.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
