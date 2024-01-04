import { useRef, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const AddFilm = (props) => {
  const { status, setStatus, loading, setLoading } = props;

  const [data, setData] = useState({
    title: "",
    description: "",
    trailer: "",
    photo: null,
    alternate: "",
    rating: "",
  });

  const titlefield = useRef();
  const descfield = useRef();
  const trailerfield = useRef();
  const imagefield = useRef();
  const ratingfield = useRef();

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

      const { title, description, trailer, photo, alternate } = data; //destructured from data object

      const response = await Axios.post("http://localhost:8000/home", {
        title: title,
        description: description,
        trailer: trailer,
        alternate: alternate,
      });

      if (response.status === 201) {
        setStatus(`${data.title} Added`);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error adding film");
    } finally {
      titlefield.current.value = "";
      descfield.current.value = "";
      trailerfield.current.value = "";
      imagefield.current.value = "";
      setLoading(false);
    }
  }

  return (
    <>
      <h1 style={{ fontSize: 32 }}>Add Film</h1>

      <form onSubmit={createFilm}>
        <input
          ref={titlefield}
          onChange={(e) => handleChange(e)}
          placeholder="Enter Title"
          name="title"
        />
        <input
          ref={descfield}
          onChange={(e) => handleChange(e)}
          name="description"
          placeholder="Write your description"
        />

        <input
          ref={trailerfield}
          onChange={(e) => handleChange(e)}
          placeholder="Enter trailer"
          name="trailer"
        />
        <input
          ref={imagefield}
          onChange={(e) => handleChange(e)}
          placeholder="Enter alternate image by address"
          name="alternate"
        />
        <input onChange={handleFileChange} type="file"></input>
        <input
          ref={ratingfield}
          onChange={(e) => handleChange(e)}
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
