import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Movies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modifiedUser, setModifiedUser] = useState("");

  useEffect(() => {
    async function fetchFromBack() {
      try {
        setLoading(true);
        const response = await Axios.get("http://localhost:8000/home");
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFromBack();
  }, []);

  async function deleteFilm(id) {
    try {
      setLoading(true);
      await Axios.delete(`http://localhost:8000/home/${id}`);
      setData((prevData) => prevData.filter((film) => film._id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function editTitle(id, film) {
    try {
      setLoading(true);
      await Axios.put(`http://localhost:8000/home/${id}`, {
        title: film,
      }).then((r) => {
        if (r.status === 200) {
          window.location.reload();
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = async (e, searchTerm) => {
    e.preventDefault();
    try {
      setData([]);
      setLoading(true);
      const response = await Axios.get(
        `http://localhost:8000/home/${searchTerm}`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
                <input
                  value={modifiedUser}
                  onChange={(e) => {
                    setModifiedUser(e.target.value);
                  }}
                  placeholder="Update Film Title"
                />
                <button
                  onClick={() => {
                    editTitle(x._id, modifiedUser);
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

        <Link to="/addfilm">Add Film</Link>
      </div>
    </>
  );
}

export default Movies;
