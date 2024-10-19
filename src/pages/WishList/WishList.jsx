import { useEffect, useState } from "react";
import "./WishList.css"

const WishList = () => {
    const [wishlist, setWishlist] = useState([]);

    //Get books
        useEffect(() => {
          const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          setWishlist(savedWishlist);
        }, []);

    return (
        <div className="wishlist-container">
          <h2>Wishlist</h2>
          {wishlist.length > 0 ? (
            <ul>
              {wishlist.map((book) => (
                <li key={book.id}>{book.title}</li>
              ))}
            </ul>
          ) : (
            <p>No books in wishlist</p>
          )}
        </div>
    );
};

export default WishList;