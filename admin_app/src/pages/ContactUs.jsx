export default function ContactUs() {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #e0eafc, #cfdef3);
          color: #2c3e50;
        }
        .page-container {
          max-width: 600px;
          background: white;
          margin: 4rem auto;
          padding: 2.5rem 2rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(44, 62, 80, 0.1);
          text-align: center;
          animation: fadeInUp 0.8s ease forwards;
          border: 1px solid #dcdcdc;
        }
        h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #34495e;
          font-weight: 700;
        }
        p {
          font-size: 1.125rem;
          margin: 0.8rem 0;
          color: #566573;
          line-height: 1.6;
          user-select: text;
        }
        a {
          color: #2980b9;
          text-decoration: none;
          transition: color 0.3s, text-decoration 0.3s;
        }
        a:hover {
          text-decoration: underline;
          color: #1a5276;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="page-container">
        <h2>Contact Us</h2>
        <p><strong>Company:</strong> Opalina technologies</p>
        <p><strong>Email:</strong> <a href="bablu.sharma@opalina.in">bablu.sharma@opalina.in</a></p>
        <p><strong>Phone:</strong>(+91) 8684926531</p>
        <p><strong>Address:</strong> Pride tech park , sector 136 , Noida, India</p>
      </div>
    </>
  );
}
