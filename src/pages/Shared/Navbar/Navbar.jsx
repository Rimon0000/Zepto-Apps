import { useState } from "react";
import "./Navbar.css"
import { Link } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import { useWishlist } from "../../Providers/WishListProvider";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { wishlist } = useWishlist ()
    const wishlistCount = wishlist?.length;
  
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
              <Link to="/" className="navbar-title">Book Heaven</Link>
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
            </div>
          </nav>
        </header>
    );
};

export default Navbar;