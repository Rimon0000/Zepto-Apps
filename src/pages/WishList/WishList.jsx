import { useEffect, useState } from "react";
import "./WishList.css"
import WishListCard from "./WishListCard";

const WishList = () => {
    const [wishlist, setWishlist] = useState([]);

    //Get books
        useEffect(() => {
          const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
          setWishlist(savedWishlist);
        }, []);

    return (
        <div className="wishlist-container">
          <h2 className="wishlist-title">Your Favorite Wishlist Books</h2>
          <div className="">
            {
                wishlist.length > 0 ? (
                  <div className="wishlist-map">
                    {wishlist.map((book) => (
                      <WishListCard key={book.id} book={book}></WishListCard>
                    ))}
                  </div>
                ) : (
                  <p>No books in wishlist</p>
                )}
          </div>
        </div>
    );
};

export default WishList;