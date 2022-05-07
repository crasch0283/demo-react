import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"
import axios from "axios";

import styles from "../css/style.module.css"

const Details = () => {
    let params = useParams();

    const [book, setBook] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true)
        let bookId = params.id
        const fetchData = async () => {
            const { data: results } = await axios.get(
              `https://ancient-scrubland-47465.herokuapp.com/books/${bookId}/`,
              {
                auth: { username: "admin", password: "password123" }
              }
            );
            setBook(results);
            setIsLoading(false)
          };
      
          fetchData();
    },[params.id])


    return (
        isLoading ? 
        <>
        <div className="text-center">
            <div className="spinner-border text-secondary" style={{"width": "4rem" ,"height": "4rem"}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
        </>
        :
        <div className={`text-center ${styles.bookDetails} p-5 bg-body`} style={{"marginBottom": "2rem"}}>
            {
                <>
                <div>
                    <h3 className="border border-top-0 border-start-0 border-end-0 border-secondary">Details for "{book.title}"</h3>
                    <p><span className="fw-bolder">Title:</span><br /> {book.title}</p>
                    <p><span className="fw-bolder">Author:</span><br /> {book.author}</p>
                    <p><span className="fw-bolder">Year Published:</span><br/>{book.yearPublished}</p>
                    <p className="container" style={{"lineHeight": "2rem"}}><span className="fw-bolder">Description:</span><br />{book.description}</p>
                    <Link to={"/"}>Back Home</Link>
                    </div>
                </>
            }
        </div>
    )
}


export default Details