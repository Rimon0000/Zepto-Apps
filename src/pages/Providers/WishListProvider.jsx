/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
    return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        // Load initial wishlist from localStorage
        const savedWishlist = localStorage.getItem('wishlist');
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    useEffect(() => {
        // Whenever wishlist changes, save it to localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (book) => {
        setWishlist((prevWishlist) => {
            const isBookInWishlist = prevWishlist.some((item) => item.id === book.id);

            if (isBookInWishlist) {
                const updatedWishlist = prevWishlist.filter((item) => item.id !== book.id);
                return updatedWishlist;
            } else {
                const updatedWishlist = [...prevWishlist, book];
                return updatedWishlist;
            }
        });
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
