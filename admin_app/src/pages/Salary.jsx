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
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #eef3f8;
          color: #333;
        }

        .salary-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 60px 20px;
          min-height: 100vh;
        }

        .salary-card {
          width: 100%;
          max-width: 900px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
          overflow: hidden;
          animation: fadeIn 0.8s ease-out;
        }

        .salary-header {
          background: linear-gradient(to right, #007bff, #00c6ff);
          padding: 40px 50px;
          text-align: center;
          color: #fff;
        }

        .salary-header h2 {
          margin: 0;
          font-size: 2.2rem;
          letter-spacing: 1px;
        }

        .salary-table {
          width: 100%;
          border-collapse: collapse;
          padding: 30px 50px;
        }

        .salary-table tbody {
          display: block;
          padding: 30px 50px;
        }

        .salary-table tr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid #eaeaea;
          transition: background 0.2s;
        }

        .salary-table tr:hover {
          background-color: #f7fbff;
        }

        .salary-table td.label {
          font-weight: 600;
          color: #34495e;
          font-size: 1.1rem;
        }

        .salary-table td.value {
          font-size: 1.3rem;
          font-weight: 700;
          color: #007bff;
        }

        .net-row {
          background-color: #e9f7ef;
          border-left: 6px solid #27ae60;
          border-radius: 6px;
        }

        .net-row td.label {
          color: #2c3e50;
        }

        .net-row td.value {
          color: #27ae60;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .salary-table tr {
            flex-direction: column;
            align-items: flex-start;
          }
          .salary-table td.value {
            align-self: flex-end;
          }
        }
      `}</style>

      <div className="salary-wrapper">
        <div className="salary-card">
          <div className="salary-header">
            <h2>Salary Breakdown</h2>
          </div>

          <table className="salary-table">
            <tbody>
              <tr>
                <td className="label">Basic Salary:</td>
                <td className="value">Rs {salaryDetails.basic}</td>
              </tr>
              <tr>
                <td className="label">HRA:</td>
                <td className="value">Rs {salaryDetails.hra}</td>
              </tr>
              <tr>
                <td className="label">Deductions:</td>
                <td className="value">Rs {salaryDetails.deductions}</td>
              </tr>
              <tr className="net-row">
                <td className="label">Net Salary:</td>
                <td className="value">Rs {salaryDetails.netSalary}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
