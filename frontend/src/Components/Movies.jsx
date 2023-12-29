import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Misc/Navbar";

const API_URL = "http://localhost:8000";

function Movies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modifiedTitle, setModifiedTitle] = useState("");

  useEffect(() => {
    async function fetchFromBack() {
      try {
        setLoading(true);
        const response = await Axios.get(`${API_URL}/home`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFromBack();
  }, []);

  async function deleteFilm(id) {
    try {
      setLoading(true);
      await Axios.delete(`${API_URL}/home/${id}`);
      setData((prevData) => prevData.filter((film) => film._id !== id));
    } catch (error) {
      console.error("Error deleting film:", error);
    } finally {
      setLoading(false);
    }
  }

  async function editTitle(id) {
    try {
      setLoading(true);
      await Axios.put(`${API_URL}/home/${id}`, { title: modifiedTitle });

      setData((prevData) =>
        prevData.map((film) =>
          film._id === id ? { ...film, title: modifiedTitle } : film
        )
      );
      setModifiedTitle("");
    } catch (error) {
      console.error("Error editing title:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = async (e, searchTerm) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.get(`${API_URL}/home/${searchTerm}`);
      setData(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        <Link to="/newuser" className="text-blue-500 hover:underline">
          Register
        </Link>
        <form
          onSubmit={(e) => {
            handleSearch(e, searchTerm);
          }}
          className="mt-4"
        >
          <input
            type="text"
            placeholder="Search Here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 mr-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-blue-500 text-white"
          >
            Search
          </button>
        </form>
        {data && data.length ? (
          data.map((x) => (
            <div key={x._id}>
              <h1 style={{ fontSize: 32 }}>{x.title}</h1>
              <img
                src={x.alternate || "No image available"}
                alt={`Image of ${x.title}`}
              />
              <br></br>
              <label>
                <h1>Description</h1>
                <p>{x?.description ? x.description : "No description found"}</p>
              </label>
              <br></br>
              <a href={x.trailer}>Trailer for {x.title}</a>
              <label>
                <button
                  onClick={() => {
                    deleteFilm(x._id);
                  }}
                >
                  Delete Film
                </button>

                <input
                  onChange={(e) => {
                    setModifiedTitle(e.target.value);
                  }}
                  placeholder="Update Film Title"
                />
                <button
                  onClick={() => {
                    editTitle(x._id, modifiedTitle);
                  }}
                >
                  Make changes
                </button>
              </label>
            </div>
          ))
        ) : (
          <p>No Trailers Added</p>
        )}

        <Link to="/addfilm" className="text-blue-500 hover:underline">
          Add Film
        </Link>
      </div>
    </>
  );
}

export default Movies;
