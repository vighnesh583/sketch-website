import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SketchArt</h3>
            <p>Creating beautiful, personalized sketches that capture your most precious moments.</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">📷</a>
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Email">✉️</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/commission">Commission</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>Portrait Sketches</li>
              <li>Wedding Sketches</li>
              <li>Family Portraits</li>
              <li>Custom Commissions</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 artist@sketchart.com</p>
            <p>📱 +91 98765 43210</p>
            <p>📍 Mumbai, India</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 SketchArt. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
          padding: 3rem 0 1rem;
          margin-top: 4rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .footer-section h3 {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .footer-section h4 {
          color: #ecf0f1;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }

        .footer-section p {
          color: #bdc3c7;
          line-height: 1.6;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section ul li {
          margin-bottom: 0.5rem;
        }

        .footer-section ul li a {
          color: #bdc3c7;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-section ul li a:hover {
          color: #667eea;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .social-links a {
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }

        .social-links a:hover {
          transform: scale(1.2);
        }

        .footer-bottom {
          border-top: 1px solid #4a5f7a;
          padding-top: 1rem;
          text-align: center;
        }

        .footer-bottom p {
          color: #95a5a6;
          margin: 0;
        }

        @media (max-width: 768px) {
          .footer {
            padding: 2rem 0 1rem;
          }

          .footer-content {
            gap: 1.5rem;
          }

          .social-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
