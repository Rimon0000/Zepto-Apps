import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaRedo, FaSearch } from "react-icons/fa";
import "./Books.css";
import { useEffect, useState } from "react";
import BookCard from "./BookCard/BookCard";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animation/loadingAnimation.json";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const [searchText, setSearchText] = useState("");
    const [cardPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataCount, setDataCount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Start loading
            try {
                const res = await fetch(
                    `https://gutendex.com/books?page=${currentPage}&size=${cardPerPage}&filter=${filter}&search=${search}`
                );
                const data = await res.json();
                setBooks(data?.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); 
            }
        };
        fetchData();
    }, [currentPage, cardPerPage, filter, search]);

    //get data count
    useEffect(() => {
        const getCount = async () => {
            try {
                const res = await fetch("https://gutendex.com/books");
                const data = await res.json();
                setDataCount(data?.count);
            } catch (error) {
                console.error("Error fetching total count:", error);
            }
        };
        getCount();
    }, []);

    // console.log(dataCount);

    const numOfPages = Math.ceil(dataCount / cardPerPage);
    // console.log(numOfPages);
    const pages = [...Array(numOfPages).keys()].map((ele) => ele + 1);

    // handle pagination
    const handlePagination = (value) => {
        setCurrentPage(value);
    };

    // handle filter
    const handleFilterByGenre = (e) => {
        setFilter(e.target.value);
    };

    // handle reset
    const handleReset = () => {
      console.log("reset clicked");
        setFilter("");
        setSearch("");
        setSearchText("");
        setCurrentPage(1); // Reset to the first page
        console.log("is it working?");
    };

    // handle search input change
    const handleSearchInputChange = (e) => {
        setSearchText(e.target.value);
    };

    // handle search form submit
    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchText);
        setCurrentPage(1); // Reset to the first page after search
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
                    <select onChange={handleFilterByGenre} name="category" className="category-select">
                        <option value="">All</option>
                          {books?.length > 0 &&
                              books?.map((book, bookIndex) =>
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
            ) : books?.length ? (
                <div>
                    <div className="grid-container">
                        {books.map((book) => (
                            <BookCard key={book.id} book={book}></BookCard>
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
