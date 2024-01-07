import { useRef, useState, useContext } from "react";
import { UserData } from "../App";
import Axios from "axios";
import { Link } from "react-router-dom";

const AddFilm = () => {
  const datax = useContext(UserData);

  const { status, setStatus, loading, setLoading } = datax;

  const [data, setData] = useState({
    title: "",
    description: "",
    trailer: "",
    photo: null,
    alternate: "",
    rating: "",
  });

  const titleField = useRef();
  const descField = useRef();
  const trailerField = useRef();
  const imageField = useRef();
  const ratingField = useRef();

  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setData({ ...data, photo: e.target.files[0] });
  };

  async function createFilm(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const { title } = data;

      const response = await Axios.post("http://localhost:8000/home", {
        data,
      });

      if (response.status === 201) {
        setStatus(`${title} Added`);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error adding film");
    } finally {
      titleField.current.value = "";
      descField.current.value = "";
      trailerField.current.value = "";
      imageField.current.value = "";
      ratingField.current.value = "";
      setLoading(false);
    }
  }

  return (
    <>
      <h1 style={{ fontSize: 32 }}>Add Film</h1>

      <form onSubmit={createFilm}>
        <input
          ref={titleField}
          onChange={handleChange}
          placeholder="Enter Title"
          name="title"
        />
        <input
          ref={descField}
          onChange={handleChange}
          name="description"
          placeholder="Write your description"
        />
        <input
          ref={trailerField}
          onChange={handleChange}
          placeholder="Enter trailer"
          name="trailer"
        />
        <input
          ref={imageField}
          onChange={handleChange}
          placeholder="Enter alternate image by address"
          name="alternate"
        />
        <input onChange={handleFileChange} type="file" />
        <input
          ref={ratingField}
          onChange={handleChange}
          type="number"
          name="rating"
          placeholder="Enter rating"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Add Film"}
        </button>
        <h1>{status}</h1>
      </form>
      <Link to="/">Go to Movies</Link>
    </>
  );
};

export default AddFilm;
