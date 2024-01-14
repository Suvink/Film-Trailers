import { useState, useContext } from "react";
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

  const handleChange = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setData({ ...data, photo: e.target.files[0] });
  };

  const resetForm = () => {
    setData({
      title: "",
      description: "",
      trailer: "",
      photo: null,
      alternate: "",
      rating: "",
    });
  };

  async function createFilm(e) {
    e.preventDefault();
    try {
      setLoading(true);

      const { title } = data;

      const response = await Axios.post("http://localhost:8000/home", data);

      if (response.status === 201) {
        setStatus(`${title} Added`);
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setStatus("Error adding film");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 style={{ fontSize: 32 }}>Add Film</h1>

      <form onSubmit={createFilm}>
        <input
          value={data.title}
          onChange={handleChange}
          placeholder="Enter Title"
          name="title"
        />
        <input
          value={data.description}
          onChange={handleChange}
          name="description"
          placeholder="Write your description"
        />
        <input
          value={data.trailer}
          onChange={handleChange}
          placeholder="Enter trailer"
          name="trailer"
        />
        <input
          value={data.alternate}
          onChange={handleChange}
          placeholder="Enter alternate image by address"
          name="alternate"
        />
        <input onChange={handleFileChange} type="file" />
        <input
          value={data.rating}
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
