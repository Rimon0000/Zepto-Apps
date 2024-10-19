import { Link } from "react-router-dom";
import { FaFacebookSquare, FaGoogle, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
        <div className="top-container">
          <div className="logo-container">
            <Link to="/" className="footer-logo">
              <img className="footer-logo-img" src="https://i.ibb.co.com/jG3nzRJ/book-10308213.webp" alt="Logo" />
            </Link>
            <p>
              Book Heaven.<br />
              Providing books since 1996
            </p>
          </div>
          <div className="services-section">
            <h3 className="service-header">Services</h3>
            <ul className="link-container">
              <li className="service-link"><a href="#" className="">Books</a></li>
              <li className="service-link"><a href="#">Publications</a></li>
              <li className="service-link"><a href="#">Ideas</a></li>
              <li className="service-link"><a href="#">Self Investment</a></li>
            </ul>
          </div>
          <div className="social-section">
            <a href="#" className="social-link"><FaFacebookSquare /></a>
            <a href="#" className="social-link"><FaGoogle /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
          </div>
        </div>
       <hr />
        <div className="bottom-section">
          <p>© All Rights Reserved by heaven</p>
        </div>
    </div>
  );
};

export default Footer;
