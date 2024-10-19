import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaRedo, FaSearch } from "react-icons/fa";
import "./Books.css";
import { useEffect, useState } from "react";
import BookCard from "./BookCard/BookCard";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animation/loadingAnimation.json";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("");
    const [cardPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(false);

    const [wishlist, setWishlist] = useState([]);

    //fetching data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            try {
                const res = await fetch(
                    `https://gutendex.com/books?page=${currentPage}&size=${cardPerPage}&search=${search}`
                );
                const data = await res.json();
                setBooks(data?.results);
                setFilteredBooks(data?.results); // Initially set filteredBooks to all books
                setDataCount(data?.count);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, [currentPage, cardPerPage, search]);

    // Apply genre filtering client-side -- server side filter is not working
    useEffect(() => {
        if (filter) {
            const filtered = books?.filter(book => book?.subjects?.includes(filter));
            setFilteredBooks(filtered); // Update filteredBooks based on selected filter
        } else {
            setFilteredBooks(books); // Reset filteredBooks when no filter is applied
        }
    }, [filter, books]);

  // Fetch wishlist from localStorage when the component mounts
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(savedWishlist);
  }, []);

  // Whenever wishlist changes, update localStorage
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

    // Handle pagination
    const numOfPages = Math.ceil(dataCount / cardPerPage);
    const pages = [...Array(numOfPages).keys()].map((ele) => ele + 1);

    const handlePagination = (value) => {
        setCurrentPage(value);
    };

    // Handle genre filtering
    const handleFilterByGenre = (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);
    };

    // Handle reset
    const handleReset = () => {
        setFilter("");
        setSearch("");
        setSearchText("");
        setCurrentPage(1); // Reset to the first page
    };

    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
    };

    // Handle search form submit
    const handleSearch = () => {
        setSearch(searchText);
        setCurrentPage(1); // Reset to the first page after search
    };


    //wish list
    // Toggle wishlist status (save/remove book object in/from localStorage)
    const toggleWishlist = (book) => {
        const isBookInWishlist = wishlist.some((item) => item.id === book.id);
    
        if (isBookInWishlist) {
          setWishlist(wishlist.filter((item) => item.id !== book.id));
        } else {
          setWishlist([...wishlist, book]);
        }
      };

    return (
        <div className="container">
            <div className="container-header">
                <h1 className="container-title">All Books</h1>
                <p className="container-para">
                    Explore our diverse collection of books, from captivating fiction to insightful non-fiction. Find your next great read and dive into a world of stories and ideas.
                </p>
            </div>

            <div className="filter-container">
                <div className="filter-wrapper">
                    <select value={filter} onChange={handleFilterByGenre} name="genre" className="category-select">
                        <option value="">All</option>
                            {filteredBooks?.length > 0 &&
                                  filteredBooks?.map((book, bookIndex) =>
                                      book?.subjects?.map((subject, subjectIndex) => (
                                          <option key={`${bookIndex}-${subjectIndex}`} value={subject}>
                                              {subject}
                                          </option>
                                      ))
                                )}
                    </select>
                </div>

                <div className="search-wrapper">
                    <input
                        onChange={handleSearchInputChange}
                        value={searchText}
                        className="search-input"
                        type="text"
                        name="search"
                        placeholder="Enter Book Title"
                        aria-label="Enter Book Title"
                    />
                    <button onClick={handleSearch} className="search-button">
                        <FaSearch />
                    </button>
                </div>

                <div className="reset-container">
                    <button onClick={handleReset} className="reset-button">
                        <FaRedo />
                        <span>Reset</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="loading-animation">
                    <Lottie className="animation" animationData={loadingAnimation} />
                </div>
            ) : filteredBooks?.length ? (
                <div>
                    <div className="grid-container">
                        {filteredBooks.map((book) => (
                            <BookCard key={book.id} book={book} toggleWishlist={toggleWishlist} wishlist={wishlist}></BookCard>
                        ))}
                    </div>
                    {/* pagination */}
                    <div className="pagination-container">
                        {/* prev btn */}
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePagination(currentPage - 1)}
                            className={`button ${currentPage === 1 ? "button--disabled" : ""}`}
                        >
                            <FaArrowAltCircleLeft />
                        </button>

                        {/* numbers */}
                        {pages.slice(Math.max(currentPage - 2, 0), Math.min(currentPage + 3, numOfPages)).map((btnNumber) => (
                            <button
                                onClick={() => handlePagination(btnNumber)}
                                key={btnNumber}
                                className={`page-button ${currentPage === btnNumber ? "page-button--active" : ""}`}
                            >
                                {btnNumber}
                            </button>
                        ))}

                        {/* next btn */}
                        <button
                            disabled={currentPage === numOfPages}
                            onClick={() => handlePagination(currentPage + 1)}
                            className={`button ${currentPage === numOfPages ? "button--disabled" : ""}`}
                        >
                            <FaArrowAltCircleRight />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="loading-animation">
                    <Lottie className="animation" animationData={loadingAnimation} />
                </div>
            )}
        </div>
    );
};

export default Books;
