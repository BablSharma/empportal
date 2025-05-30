export default function ContactUs() {
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
          background: linear-gradient(135deg, #e0eafc, #cfdef3);
          color: #2c3e50;
        }

        .contact-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 2rem;
        }

        .contact-box {
          max-width: 800px;
          width: 100%;
          background: white;
          padding: 3rem 2.5rem;
          border-radius: 16px;
          box-shadow: 0 12px 30px rgba(44, 62, 80, 0.2);
          text-align: center;
          animation: fadeIn 1s ease;
          border: 1px solid #e0e0e0;
          background: linear-gradient(145deg, #ffffff, #f7f9fc);
        }

        .contact-box h2 {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 1.5rem;
        }

        .contact-detail {
          font-size: 1.15rem;
          color: #4d4d4d;
          margin: 1rem 0;
          line-height: 1.7;
        }

        .contact-detail strong {
          color: #007bff;
        }

        .contact-detail a {
          color: #2980b9;
          text-decoration: none;
          transition: color 0.3s;
        }

        .contact-detail a:hover {
          text-decoration: underline;
          color: #1a5276;
        }

        .icon {
          display: inline-block;
          margin-right: 8px;
          color: #007bff;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="contact-wrapper">
        <div className="contact-box">
          <h2>Contact Us</h2>
          <p className="contact-detail">
            <span className="icon">🏢</span><strong>Company:</strong> Opalina Technologies
          </p>
          <p className="contact-detail">
            <span className="icon">📧</span><strong>Email:</strong> <a href="mailto:bablu.sharma@opalina.in">bablu.sharma@opalina.in</a>
          </p>
          <p className="contact-detail">
            <span className="icon">📞</span><strong>Phone:</strong> (+91) 8684926531
          </p>
          <p className="contact-detail">
            <span className="icon">📍</span><strong>Address:</strong> Pride Tech Park, Sector 136, Noida, India
          </p>
        </div>
      </div>
    </>
  );
}
