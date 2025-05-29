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
          background: #f4f7fc;
          color: #333;
        }
        .employee-navbar {
          background-color: #2c3e50;
          padding: 1rem 2rem;
          color: white;
          display: flex;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          font-weight: 600;
          font-size: 1.5rem;
          letter-spacing: 1px;
          user-select: none;
        }
        .employee-content {
          max-width: 600px;
          margin: 5rem auto;
          background: white;
          padding: 3rem 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(44, 62, 80, 0.15);
          text-align: center;
          animation: fadeIn 0.8s ease forwards;
        }
        .employee-content h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #34495e;
        }
        .employee-content p {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #7f8c8d;
          margin-top: 0;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav className="employee-navbar">
        <h2>Employee Panel</h2>
      </nav>

      <div className="employee-content">
        <h1>Welcome to Employee Portal</h1>
        <p>Access your salary, holidays, and apply for leave easily.</p>
      </div>
    </>
  );
}

