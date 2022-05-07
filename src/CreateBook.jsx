import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const CreateBook = () => {
  const schema = yup
    .object({
      title: yup.string().label("Title").required().trim(),
      author: yup.string().label("Author").required().max(100).trim(),
      yearPublished: yup.string().label("Year Published").required().max(4).trim(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const location = useLocation();

  const [success, setSuccess] = useState(false);

  const onSubmit = (data) => {
      console.log(data)
    axios
      .post(
        "https://ancient-scrubland-47465.herokuapp.com/books/",
        {
          title: data.title,
          author: data.author,
          yearPublished: data.yearPublished,
          description: data.description,
        },
        {
          auth: { username: "admin", password: "password123" },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          setSuccess(true);
          setTimeout(() => {
            navigate("/", { state: { isCreated: true } });
          }, 3000);
        }
      });
  };

  return (
    <>
      {!success ? (
        <>
        <div className="container">
          <h3 className="text-center">Create New Book</h3>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="title">Title</label>
              <input
                {...register("title")}
                type="text"
                className="form-control"
                name="title"
                id="title"
              />
              <p className="text-danger">{errors.title?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="author">Author</label>
              <input
                {...register("author")}
                type="text"
                name="author"
                className="form-control"
              />
              <p className="text-danger">{errors.author?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="yearPublished">Year Published</label>
              <input
                {...register("yearPublished")}
                type="text"
                name="yearPublished"
                className="form-control"
              />
              <p className="text-danger">{errors.yearPublished?.message}</p>
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                {...register("description")}
                name="description"
                id="description"
                cols="30"
                rows="10"
                className="form-control"
              ></textarea>
            </div>
            <div className="mb-3">
              <input type="submit" className="btn btn-primary mb-2" value="Create" />
            </div>
          </form>
          </div>
        </>
      ) : (
        <>
          <div>
            <h3 className="text-success text-center">
              Successfully Created New Book!
            </h3>
          </div>
        </>
      )}
    </>
  );
};

export default CreateBook;
