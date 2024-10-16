import "./BookCard.css"

const BookCard = ({book}) => {
    console.log("from book card", book);
    const {title, authors, traslators, subjects, bookshelves, copyright, download_count, formats, languages, media_type} = book;
    console.log(`formats?.image/jpeg`);
    return (
        <div className="card" data-aos="fade-up" data-aos-duration="400">
            <div className="image-container">
                <img className="image" src={formats["image/jpeg"]} alt="Product Image"/>
            </div>
            <div className="card-content">
                <h2 className="card-title">
                    <span>{title}</span>
                </h2>
                <p className="category my-3 font-semibold">
                    Category: <span className="category-value font-medium">CATEGORY</span>
                </p>
                <div className="flex justify-between items-center mb-4">
                    <p className="quantity font-semibold">
                        Quantity: <span className="quantity-value font-medium">QUANTITY</span>
                    </p>
                    <div className="heart-icon border p-1 rounded-full">
                        <span className="heart">Icon</span>
                    </div>
                </div>
                <a className="w-full" href="/supplies/ID">
                    <button className="button w-full rounded-3xl mt-1 hover:bg-green-700 hover:text-white">View Detail</button>
                </a>
            </div>
        </div>

    );
};

export default BookCard;