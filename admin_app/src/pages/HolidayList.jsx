import React, { useEffect, useState } from "react";

export default function HolidayList() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching dynamic holiday list 
  const fetchHolidays = async () => {
    try {
      const data = [
        { id: 1, date: "2025-01-26", name: "Republic Day" },
        { id: 2, date: "2025-08-15", name: "Independence Day" },
        { id: 3, date: "2025-10-02", name: "Gandhi Jayanti" },
        { id: 4, date: "2025-11-01", name: "Diwali" },
        { id: 5, date: "2025-11-07", name: "Bhai Dooj" },
        { id: 6, date: "2025-12-25", name: "Christmas" },
      ];

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

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
          background-color: #eef3f8;
          color: #333;
        }

        .holiday-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 60px 20px;
          min-height: 100vh;
        }

        .holiday-card {
          width: 100%;
          max-width: 900px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
          overflow: hidden;
          animation: fadeIn 0.8s ease-out;
        }

        .holiday-header {
          background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
          padding: 40px 50px;
          text-align: center;
          color: #fff;
        }

        .holiday-header h2 {
          margin: 0;
          font-size: 2.2rem;
          letter-spacing: 1.2px;
        }

        .holiday-list {
          list-style-type: none;
          margin: 0;
          padding: 30px 50px;
        }

        .holiday-list li {
          display: flex;
          justify-content: space-between;
          padding: 18px 0;
          border-bottom: 1px solid #eaeaea;
          font-size: 1.1rem;
          font-weight: 600;
          color: #34495e;
          transition: background-color 0.25s ease;
          cursor: default;
        }

        .holiday-list li:last-child {
          border-bottom: none;
        }

        .holiday-list li:hover {
          background-color: #f0f8ff;
          color: #2575fc;
        }

        .holiday-date {
          color: #2575fc;
          font-weight: 700;
          min-width: 130px;
          flex-shrink: 0;
        }

        .loading {
          text-align: center;
          padding: 40px 0;
          font-size: 1.2rem;
          color: #777;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .holiday-list li {
            flex-direction: column;
            align-items: flex-start;
          }

          .holiday-date {
            margin-bottom: 6px;
          }
        }
      `}</style>

      <div className="holiday-wrapper">
        <div className="holiday-card">
          <div className="holiday-header">
            <h2>Holiday List</h2>
          </div>

          {loading ? (
            <p className="loading">Loading holidays...</p>
          ) : (
            <ul className="holiday-list">
              {holidays.map(({ id, date, name }) => (
                <li key={id}>
                  <span className="holiday-date">{date}</span>
                  <span className="holiday-name">{name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
