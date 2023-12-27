import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:8000";

function Movies() {
  const [data, setData] = useState([]);
  const [gemini, setGemini] = useState([]);
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
      window.location.reload();
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

  async function GeminiCall(title) {
    try {
      setLoading(true);
      const response = await Axios.post(`${API_URL}/gemini`, { data: title });
      setGemini(response.data);
    } catch (err) {
      console.error("Error calling Gemini:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Link to="/register">Register</Link>
      <div className="container mx-auto">
        <h1>
          Click <Link to="/newuser">here</Link> to add an user
        </h1>
        <form
          onSubmit={(e) => {
            handleSearch(e, searchTerm);
          }}
        >
          <input
            type="text"
            placeholder="Search Here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" disabled={loading}>
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
                <Link to={`/${x._id}`}>Checkout more</Link>
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
                {/*                 <div>
                  <h1>{`Wanna know what Gemini thinks about ${x.title}?`}</h1>
                  <button
                    onClick={() => {
                      GeminiCall(x.title);
                    }}
                  >
                    Click Here
                  </button>
                  <p>
                    {loading ? (
                      <h1>Loading...</h1>
                    ) : data && data.length ? (
                      JSON.stringify(gemini)
                    ) : (
                      <h1>No results found</h1>
                    )}
                  </p>
                </div>*/}
              </label>
            </div>
          ))
        ) : (
          <p>No Trailers Added</p>
        )}

        <Link to="/addfilm">Add Film</Link>
      </div>
    </>
  );
}

export default Movies;
