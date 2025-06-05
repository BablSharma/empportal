import React from "react";

export default function Salary() {
  const basicSalary = 500000; // Annual basic salary (₹)
  const hra = 18000; // Annual HRA (₹)

  const calculateTax = (income) => {
    let tax = 0;
    const slabs = [
      { limit: 300000, rate: 0 },
      { limit: 300000, rate: 0.05 },
      { limit: 300000, rate: 0.1 },
      { limit: 300000, rate: 0.15 },
      { limit: 300000, rate: 0.2 },
      { limit: Infinity, rate: 0.3 },
    ];

    let remaining = income;

    for (let i = 0; i < slabs.length; i++) {
      const slabAmount = Math.min(slabs[i].limit, remaining);
      tax += slabAmount * slabs[i].rate;
      remaining -= slabAmount;
      if (remaining <= 0) break;
    }

    return Math.round(tax);
  };

  const totalAnnual = basicSalary + hra;
  const deductions = calculateTax(totalAnnual);
  const netAnnual = totalAnnual - deductions;

  const salaryDetails = {
    basic: Math.round(basicSalary / 12),
    hra: Math.round(hra / 12),
    deductions: Math.round(deductions / 12),
    netSalary: Math.round(netAnnual / 12),
  };

  return (
    <>
      <style>{`
        .container * {
          box-sizing: border-box;
        }
        .container body, .container html, .container #root {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #eef3f8;
          color: #333;
        }

        .container .salary-wrapper {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 60px 20px;
          min-height: 100vh;
        }

        .container .salary-card {
          width: 100%;
          max-width: 900px;
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.1);
          overflow: hidden;
          animation: fadeIn 0.8s ease-out;
        }

        .container .salary-header {
          background: linear-gradient(to right, #007bff, #00c6ff);
          padding: 40px 50px;
          text-align: center;
          color: #fff;
        }

        .container .salary-header h2 {
          margin: 0;
          font-size: 2.2rem;
          letter-spacing: 1px;
        }
           
        .container .salary-table {
          width: 100%;
          border-collapse: collapse;
          padding: 30px 50px;
        }

        .container .salary-table tbody {
          display: block;
          padding: 30px 50px;
        }

        .container .salary-table tr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid #eaeaea;
          transition: background 0.2s;
        }

        .container .salary-table tr:hover {
          background-color: #f7fbff;
        }

        .container .salary-table td.label {
          font-weight: 600;
          color: #34495e;
          font-size: 1.1rem;
        }

        .container .salary-table td.value {
          font-size: 1.3rem;
          font-weight: 700;
          color: #007bff;
        }

        .container .net-row {
          background-color: #e9f7ef;
          border-left: 6px solid #27ae60;
          border-radius: 6px;
        }

        .container .net-row td.label {
          color: #2c3e50;
        }

        .container .net-row td.value {
          color: #27ae60;
        }

        .container @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .container .salary-table tr {
            flex-direction: column;
            align-items: flex-start;
          }
          .container .salary-table td.value {
            align-self: flex-end;
          }
        }
      `}</style>

      <div className="container">
        <div className="salary-wrapper">
          <div className="salary-card">
            <div className="salary-header">
              <h2>Salary Breakdown (Monthly)</h2>
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
                  <td className="label">Tax Deductions:</td>
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
      </div>
    </>
  );
}
