import { useRef, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const AddFilm = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    trailer: "",
    photo: null,
    alternate: "",
  });
  const [status, setStatus] = useState("");
  const titlefield = useRef();
  const descfield = useRef();
  const trailerfield = useRef();
  const imagefield = useRef();

  const handleChange = (e, field) => {
    setData((prevData) => ({ ...prevData, [field]: e.target.value }));
  };

  // const handleFileChange = (e) => {
  //   setData({ ...data, photo: e.target.files[0] });
  // };

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
          onChange={(e) => handleChange(e, "title")}
          placeholder="Enter Title"
        />
        <input
          ref={descfield}
          onChange={(e) => handleChange(e, "description")}
          placeholder="Write your description"
        />
        <input
          ref={trailerfield}
          onChange={(e) => handleChange(e, "trailer")}
          placeholder="Enter trailer"
        />
        <input
          ref={imagefield}
          onChange={(e) => handleChange(e, "alternate")}
          placeholder="Enter alternate image by address"
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
