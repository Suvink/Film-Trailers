import { useEffect, useState } from "react";
import Axios from "axios";

const API_URL = "http://localhost:8000";

function Movies(props) {
  const { logged } = props;
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modifiedTitle, setModifiedTitle] = useState("");

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
  useEffect(() => {
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

  async function editTitle(id, modifiedTitle) {
    try {
      setLoading(true);
      await Axios.put(`${API_URL}/home/${id}`, { title: modifiedTitle });

      setData((prevData) =>
        prevData.map((film) =>
          film._id === id ? { ...film, title: modifiedTitle } : film
        )
      );
    } catch (error) {
      console.error("Error editing title:", error);
    } finally {
      setLoading(false);
      setModifiedTitle("");
    }
  }

  const handleSearch = async (e, searchTerm) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.get(`${API_URL}/home/${searchTerm}`, limit);
      setData(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setLoading(false);
    }
  };

  const [time, setTime] = useState("");
  const today = new Date();
  const hours = today.getHours();
  useEffect(() => {
    if (hours < 12) {
      setTime("Good Morning!");
    } else if (hours < 17) {
      setTime("Good Afternoon!");
    } else if (hours < 20) {
      setTime("Good Evening!");
    } else {
      setTime("What are you doing up late? :)");
    }
  }, [hours]);

  return (
    <>
      <div className=" mx-auto" style={{ margin: "2%" }}>
        <h1>
          Welcome {logged ? logged : "Guest"}, {time}
        </h1>
        <form
          onSubmit={(e) => {
            handleSearch(e, searchTerm);
          }}
          className="mt-4 flex items-center"
        >
          <input
            type="text"
            placeholder="Search Here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 mr-2"
          />
          <label>
            <h1>Enter limit</h1>
            <input
              type="number"
              onChange={(e) => {
                setLimit(e.target.value);
              }}
              value={limit}
            ></input>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="p-2 border border-gray-300 mr-2"
          >
            Search
          </button>
        </form>
        {loading ? (
          <h1 className="mt-4 text-xl font-bold">Loading...</h1>
        ) : data && data.length ? (
          data.map((x) => (
            <div key={x._id} className="mt-4 border p-4 rounded-md shadow-md">
              <h1 className="text-2xl font-bold">{x.title}</h1>
              <img
                src={x.alternate || "No image available"}
                alt={`Image of ${x.title}`}
                className="mt-2 rounded-md"
              />
              <div className="mt-2">
                <h1 className="text-lg font-bold">Description</h1>
                <p>{x.description ? x.description : "No description found"}</p>
              </div>
              <div className="mt-2">
                <a href={x.trailer} className="text-blue-500 hover:underline">
                  Trailer for {x.title}
                </a>
              </div>
              <div className="mt-2 flex items-center" style={{ padding: "2%" }}>
                <button
                  onClick={() => {
                    deleteFilm(x._id);
                  }}
                  className="mr-2 p-2 bg-red-500 text-white hover:bg-red-700"
                >
                  Delete Film
                </button>
                <input
                  onChange={(e) => {
                    setModifiedTitle(e.target.value);
                  }}
                  placeholder="Update Film Title"
                  className="p-2 border border-gray-300 mr-2"
                />
                <button
                  onClick={() => {
                    editTitle(x._id, modifiedTitle);
                  }}
                  className="p-2 bg-green-500 text-white hover:bg-green-700"
                >
                  Make changes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-4 text-lg font-bold">No Trailers Added</p>
        )}
      </div>
    </>
  );
}

export default Movies;
