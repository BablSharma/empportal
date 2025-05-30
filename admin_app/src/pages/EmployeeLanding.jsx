import React from "react";

export default function EmployeeLanding() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%);
          color: #2c3e50;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .employee-navbar {
          background-color: #34495e;
          padding: 1.2rem 3rem;
          color: white;
          display: flex;
          align-items: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          font-weight: 700;
          font-size: 1.8rem;
          letter-spacing: 1.2px;
          user-select: none;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-family: 'Segoe UI Black', Tahoma, Geneva, Verdana, sans-serif;
          border-bottom: 3px solid #2ecc71;
        }
        .employee-content {
          max-width: 700px;
          margin: auto;
          background: white;
          padding: 4rem 3rem;
          border-radius: 18px;
          box-shadow: 0 12px 40px rgba(44, 62, 80, 0.2);
          text-align: center;
          animation: fadeInUp 1s ease forwards;
          position: relative;
        }
        .employee-content h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #2c3e50;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: capitalize;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.1);
        }
        .employee-content p {
          font-size: 1.25rem;
          line-height: 1.75;
          color: #566573;
          margin-top: 0;
          margin-bottom: 2.5rem;
          font-weight: 500;
        }
        .btn-portal {
          background-color: #27ae60;
          color: white;
          border: none;
          padding: 15px 40px;
          font-size: 1.15rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(39, 174, 96, 0.5);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1.2px;
        }
        .btn-portal:hover {
          background-color: #1e8449;
          box-shadow: 0 12px 30px rgba(30, 132, 73, 0.7);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .employee-content {
            margin: 3rem 1.5rem;
            padding: 3rem 2rem;
          }
          .employee-navbar {
            font-size: 1.4rem;
            padding: 1rem 1.5rem;
          }
          .employee-content h1 {
            font-size: 2.2rem;
          }
          .employee-content p {
            font-size: 1.1rem;
          }
          .btn-portal {
            padding: 12px 30px;
            font-size: 1rem;
          }
        }
      `}</style>

      <nav className="employee-navbar">
        Employee Panel
      </nav>

      <div className="employee-content">
        <h1>Welcome to Employee Portal</h1>
        <p>Access your salary, holidays, and apply for leave easily.</p>
        {/* <button className="btn-portal" onClick={() => alert("Navigate to Dashboard")}>
          Go to Dashboard
        </button> */}
      </div>
    </>
  );
}
