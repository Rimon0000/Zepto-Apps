import { useEffect, useState } from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [theme, setTheme] = useState("light");
    const [wishlistCount, setWishlistCount] = useState(0);

    // Load wishlist count from localStorage on initial render
    useEffect(() => {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(savedWishlist.length);
    }, []);

    // Listen for changes in localStorage and update wishlist count accordingly
    useEffect(() => {
      const handleStorageChange = () => {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistCount(savedWishlist.length);
      };
      // Add event listener for changes in localStorage
      window.addEventListener("storage", handleStorageChange);
      return () => {
        // Cleanup event listener on unmount
        window.removeEventListener("storage", handleStorageChange);
      };
    }, []);
  
    //theme
    const toggleTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
      document.body.classList.toggle("dark-theme");
    };
  
    //Menu
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="navbar">
      <nav className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img
              className="logo-img"
              src="https://i.ibb.co.com/jG3nzRJ/book-10308213.webp"
              alt="Logo"
            />
          </Link>
          <Link to="/" className="navbar-title">Book Haven</Link>
        </div>

        <div className="navbar-menu-toggle" onClick={toggleMenu}>
          &#9776;
        </div>

        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li>
            <Link className="nav-link" to="/wishlist">
            <button className='wishlist-btn'> Wishlist Books
            <IoIosHeartEmpty className="IoIosHeartEmpty"></IoIosHeartEmpty>
              <div className='badge badge-secondary'>
                  +{wishlistCount || 0}
                </div>
            </button>
            </Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <Link to="/login" className="login-button">
            LOGIN
          </Link>
          <div className="theme-toggle">
            <button className="theme-button" onClick={toggleTheme}>
              <span className={theme === "light" ? "" : "hide"}>☀️</span>
              <span className={theme === "dark" ? "" : "hide"}>🌙</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
    );
};

export default Navbar;