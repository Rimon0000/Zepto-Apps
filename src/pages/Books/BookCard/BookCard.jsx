/* eslint-disable react/prop-types */
// import { IoIosHeartEmpty } from "react-icons/io";
import "./BookCard.css"
import { FaHeart, FaRegHeart } from "react-icons/fa";

const BookCard = ({book, toggleWishlist, wishlist}) => {
    const {id, title, authors, traslators, subjects, bookshelves, copyright, download_count, formats, languages, media_type} = book;


    return (
        <div className="card" data-aos="fade-up" data-aos-duration="400">
            <div className="image-container">
                <img className="image" src={formats["image/jpeg"]} alt="Product Image"/>
                <p className="book-id">
                    <span>{id}</span>
                </p>
            </div>
            <div className="card-content">
                <h2 className="card-title">
                    <span>{title}</span>
                </h2>
                <p className="authors">
                    Authors: <span className="authors-content">{authors[0]?.name}</span>
                </p>
                <div className="genre-container">
                    <p className="genre">
                        Genre: 
                          {subjects?.map((item, index) => (
                            <li className="genre-list" key={index}>{item}</li>
                          ))}
                    </p>
                </div>
                <div className="lower-container">
                    <div className="btn-container">
                        <a className="" href={`/books/${id}`}>
                            <button className="details-button">View Detail</button>
                        </a>
                    </div>
                    <div className="icon-container">
                        <button onClick={() => toggleWishlist(book)} className='icon-button'>
                            {wishlist?.some((item) => item.id === book.id) ? (
                              <FaHeart className='icon' color="red"/>
                            ) : (
                              <FaRegHeart className='icon' />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BookCard;