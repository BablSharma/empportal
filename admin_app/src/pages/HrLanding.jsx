import React from "react";
import bgimage from "../assets/images/hrdash.jpg";

export default function HrLanding() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f7fc;
        }

        .employee-navbar {
          background-color: #0e1216;
          padding: 1rem 2rem;
          color: white;
          font-weight: 600;
          font-size: 1.5rem;
          letter-spacing: 1px;
        }

        .page-wrapper {
          min-height: calc(100vh - 72px);
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url(${bgimage});
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          background-color: #f4f7fc;
        }

        .employee-content {
          max-width: 600px;
          background: rgba(255, 255, 255, 0.9);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(44, 62, 80, 0.15);
          text-align: center;
          animation: fadeIn 0.6s ease forwards;
        }

        .employee-content h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #34495e;
        }

        .employee-content p {
          font-size: 1.1rem;
          color: #666;
          margin: 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <nav className="employee-navbar">
        <h2>HR Panel</h2>
      </nav>

      <div className="page-wrapper">
        <div className="employee-content">
          <h1>Welcome to the HR Portal</h1>
          <p>Access different pages to manage employee information and resources.</p>
        </div>
      </div>
    </>
  );
}
