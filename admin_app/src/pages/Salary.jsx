import React from "react";

export default function Salary() {
  const salaryDetails = {
    basic: 50000,
    hra: 1500,
    deductions: 3500,
    netSalary: 48000,
  };

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
        .salary-container {
          max-width: 600px;
          margin: 2rem auto;
          padding: 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(44, 62, 80, 0.15);
          animation: fadeIn 0.8s ease forwards;
        }
        .salary-container h2 {
          text-align: center;
          color: #34495e;
          margin-bottom: 1.5rem;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #e0e0e0;
          text-align: left;
        }
        tr:hover {
          background-color: #f0f8ff;
        }
        tr:last-child td {
          border-bottom: none;
        }
        strong {
          color: #2c3e50;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="salary-container">
        <h2>Salary Details</h2>
        <table>
          <tbody>
            <tr>
              <td>Basic Salary:</td>
              <td>Rs{salaryDetails.basic}</td>
            </tr>
            <tr>
              <td>HRA:</td>
              <td>Rs{salaryDetails.hra}</td>
            </tr>
            <tr>
              <td>Deductions:</td>
              <td>Rs{salaryDetails.deductions}</td>
            </tr>
            <tr>
              <td><strong>Net Salary:</strong></td>
              <td><strong>Rs{salaryDetails.netSalary}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
