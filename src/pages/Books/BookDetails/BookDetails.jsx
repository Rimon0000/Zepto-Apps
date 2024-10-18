import { useLoaderData } from "react-router-dom";
import "./BookDetails.css";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/animation/loadingAnimation.json"

const BookDetails = () => {
  const bookData = useLoaderData();
  const {
    id,
    title,
    authors,
    translators,
    subjects,
    bookshelves,
    copyright,
    download_count,
    formats,
    languages,
    media_type,
  } = bookData;

  const imageUrl =
    formats["image/jpeg"] || formats["image/png"] || formats["image/jpg"];

  return (
    <div className="details-container">
        <div className="details-upper-container">
          <h2 className="heading">
              Reading Books: A Gateway to Knowledge
          </h2>
          <p className="para-text">
                Reading books enriches our minds and broadens our horizons. It introduces us 
                to new ideas, enhances empathy, and improves critical thinking skills. 
                Cultivating a reading habit helps us stay informed and navigate life's 
                challenges more effectively.
          </p>
        </div>

        {
            bookData ? (
                <div className="details-card">
                      {imageUrl && (
                        <figure className="book-image">
                          <img src={imageUrl} alt={`Cover of ${title}`} />
                        </figure>
                        )}
                
                    <div className="card-body">
                    <div className="book-info">
                      <p className="bookId"><strong>Book ID:</strong> {id}</p>
                      <p className="book-title"><strong>Title:</strong> {title}</p>
                      <p><strong>Authors:</strong> {`${authors[0]?.name} (${authors[0]?.birth_year} - ${authors[0]?.death_year})`}</p>

                        {translators && translators.length > 0 ? (
                          <p>
                            <strong>Translators:</strong> 
                            {`${translators[0]?.name || "N/A"} (${translators[0]?.birth_year || "N/A"} - ${translators[0]?.death_year || "N/A"})`}
                          </p>
                        ) : (
                          <p><strong>Translators:</strong> This book was not translated!</p>
                        )}
                        
                        <p className="">
                            <p className="subjects-title">Subjects:</p> 
                              {subjects.map((item, index) => (
                                <li className="subjects-list" key={index}>{item}</li>
                              ))}
                        </p>
                       
                        <p className="">
                            <p className="bookshelves">Bookshelves or Genre: </p>
                              {bookshelves.map((item, index) => (
                                <li className="bookshelves-list" key={index}>{item}</li>
                              ))}
                        </p>
                      <p className="additional-info">
                            <p><strong>Copyright:</strong> {copyright ? "Yes" : "No"}</p>
                            <p><strong>Download Count:</strong> {download_count}</p>
                            <p><strong>Languages:</strong> {languages.join(", ")}</p>
                            <p><strong>Media Type:</strong> {media_type}</p>
                      </p>
                    </div>
          
                    <div className="download-links">
                      <h3 className="download-title">Download Formats:</h3>
                      <div className="download-format">
                        {Object.keys(formats).map((format) =>
                          format.includes("image") ? null : (
                            <div key={format}>
                              <a href={formats[format]} target="_blank" rel="noopener noreferrer">
                                {format}
                              </a>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                ) : (
            <div className="flex items-center justify-center">
              <Lottie className="w-2/5" animationData={loadingAnimation} />
            </div>
          )
        }
            </div>
          );
        };

export default BookDetails;
