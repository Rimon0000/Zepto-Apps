import { FaRedo, FaSearch } from "react-icons/fa";
import "./Books.css"
import { useEffect, useState } from "react";
import BookCard from "./BookCard/BookCard";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animation/loadingAnimation.json"

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch("https://gutendex.com/books");
            const data = await res.json();
            setBooks(data)
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchData();
      }, [books]);
      

    //handle filter
  const handleFilterByCategory = (e) => {
    // dispatch(setFilter(e.target.value));
  };

  //handle reset
  const handleReset = () => {
    // dispatch(resetFilterAndSearch());
  };

  //handle search
  const handleSearch = (e) => {
    // dispatch(setSearchText(e.target.value));
  };

  // Apply search and filter
//   const filteredSupplies = data?.data?.filter((item) => {
//     // return (
//     //   item.title.toLowerCase().includes(searchText.toLowerCase()) &&
//     //   (filter ? item.category === filter : true)
//     // );
//   });

    return (
        <div className="container">
          <div className="container-header">
            <h1 className="container-title">All Books</h1>
            <p className="container-para">Explore our diverse collection of books, from captivating fiction to insightful non-fiction. Find your next great read and dive into a world of stories and ideas.</p>

          </div>
            <div className="filter-container">
                    <div className="filter-wrapper">
                        <select
                            onChange={handleFilterByCategory}
                            name="category"
                            className="category-select"
                        >
                            <option value="">All</option>
                            <option value="Food">Food</option>
                            <option value="Study Materials">Study Materials</option>
                            <option value="Hygiene Products">Hygiene Products</option>
                            <option value="Baby Essentials">Baby Essentials</option>
                        </select>
                    </div>
            
                    <div className="search-wrapper">
                        <input
                            onChange={handleSearch}
                            className="search-input"
                            type="text"
                            name="search"
                            placeholder="Enter Post Title"
                            aria-label="Enter Post Title"
                        />
                        <button className="search-button">
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
            {
              books?.results?.length ? (
                <div className="grid-container">
                {
                    books?.results?.map((book) => <BookCard key={book.id} book={book}></BookCard>)
                }
            </div>
            
                ) : (
              <div className="flex items-center justify-center">
                <Lottie className="w-2/5" animationData={loadingAnimation} />
              </div>
            )}
        </div>

    );
};

export default Books;