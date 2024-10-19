/* eslint-disable react/prop-types */
import "./WishListCard.css"

const WishListCard = ({book}) => {
    const {
        id,
        title,
        authors,
        subjects,
        formats,
      } = book;

    const imageUrl = formats["image/jpeg"] || formats["image/png"] || formats["image/jpg"];


    return (
        <div className='wishlist-card-container'>
            <div className='wishlist-image-container'>
                <img className='wishlist-image' src={imageUrl} alt={name} />
            </div>
            <div className='text-container'>
                <h2>Book ID: <span className="bookID">{id}</span></h2>
                <h2 className='title'>{title}</h2>
                <h3 className="authors">Authors: <span className="authors-content">{`${authors[0]?.name} (${authors[0]?.birth_year} - ${authors[0]?.death_year})`}</span> </h3>
                <div className="sub-container">
                    <p className="subjects-title">Subjects:</p> 
                      {subjects.map((item, index) => (
                        <li className="subjects-list" key={index}>{item}</li>
                      ))}
                </div>
                <div className="wish-btn">
                    <a className="" href={`/books/${id}`}>
                        <button className="wishlist-details-button">Check Detail</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default WishListCard;