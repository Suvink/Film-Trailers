import { useEffect, useState, useContext } from "react";
import { UserData } from "../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import DisplayFilm from "./DisplayFilm";
import BotPage from "./Bot";

const API_URL = "http://localhost:8000";

function Movies() {
  const datax = useContext(UserData);
  const { logged, setID } = datax;
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modifiedTitle, setModifiedTitle] = useState("");
  const [time, setTime] = useState("");
  const [showBot, setShowBot] = useState(false);

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

  const viewBot = () => {
    setShowBot(true);
  };

  const closeBot = () => {
    setShowBot(false);
  };

  return (
    <>
      <button
        onClick={viewBot}
        className="bg-blue-500 text-white p-2 hover:bg-blue-700"
      >
        View Bot
      </button>
      {showBot && <BotPage onClose={closeBot} />}

      <div className="mx-auto max-w-2xl p-4" style={{ padding: "5%" }}>
        <h1 className="text-3xl font-bold mb-4">
          Welcome {logged ? logged : "Guest"}, {time}
        </h1>
        <form
          onSubmit={(e) => handleSearch(e, searchTerm)}
          className="flex items-center space-x-2 mb-4"
        >
          <input
            type="text"
            placeholder="Search Here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 flex-1"
          />
          <label className="flex items-center">
            <span className="mr-2">Enter limit</span>
            <input
              type="number"
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
              className="p-2 border border-gray-300"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-blue-500 text-white hover:bg-blue-700"
          >
            Search
          </button>
        </form>
        {loading ? (
          <h1 className="mt-4 text-xl font-bold">Loading...</h1>
        ) : data && data.length ? (
          data.map((x) => (
            <div key={x._id} className="mt-4 border p-4 rounded-md shadow-md">
              <DisplayFilm x={x} />

              <Link
                to={`film/${x._id}`}
                onClick={() => {
                  if (setID !== "") {
                    setID("");
                  }
                  setID(x._id);
                }}
                className="text-blue-500 hover:underline block mt-2"
              >
                Click to View
              </Link>
              <div className="mt-2 flex items-center space-x-2">
                <button
                  onClick={() => deleteFilm(x._id)}
                  className="p-2 bg-red-500 text-white hover:bg-red-700"
                >
                  Delete Film
                </button>
                <input
                  onChange={(e) => setModifiedTitle(e.target.value)}
                  placeholder="Update Film Title"
                  className="p-2 border border-gray-300"
                />
                <button
                  onClick={() => editTitle(x._id, modifiedTitle)}
                  className="p-2 bg-green-500 text-white hover:bg-green-700"
                >
                  Make changes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="mt-4 text-lg font-bold">
            {searchTerm ? "No results found" : "No Trailers Added"}
          </p>
        )}
      </div>
    </>
  );
}

export default Movies;
