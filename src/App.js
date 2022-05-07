import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link, Outlet, useLocation } from "react-router-dom";
import CreateBook from "./CreateBook";

function App() {
  const [books, setBooks] = useState({});
  const location = useLocation()


  useEffect(() => {
    const fetchData = async () => {
      const { data: results } = await axios.get(
        "https://ancient-scrubland-47465.herokuapp.com/books/",
        {
          auth: { username: "admin", password: "password123" },
        }
      );
      setBooks(results);
    };

    fetchData();
  }, [location.state]);

  return (
    <div className="container bg-light mt-3 mb-3" style={{"boxShadow": "0 0 15px slategray"}}>
      <div>
        <h1 className="text-center text-uppercase">The Book Keeper</h1>
      </div>
      <div>
        <Link to={"/createbook"} className="btn btn-sm btn-success mb-3 mt-3">+ Create New Book</Link>
      </div>
      <div className="card">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year Published</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
        {books.results?.map((book) => {
          return (
            <tr key={book.id}>
              <td className="fw-bolder">{book.title}</td>
              <td>{book.author}</td>
              <td>{book.yearPublished}</td>
              <td><Link to={`/details/${book.id}`} className="btn btn-sm btn-info" style={{"color": "white"}}>View Description</Link></td>
            </tr>
          );
        })}
        </tbody>
      </table>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
