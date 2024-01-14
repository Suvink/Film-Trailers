import { useEffect, useState, useContext } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { UserData } from "../App";

const API_URL = "http://localhost:8000";

const IDWisePage = () => {
  const datax = useContext(UserData);
  const { status, setStatus } = datax;
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const { id: urlId } = useParams();

  const handleSearchID = async () => {
    try {
      const response = await Axios.post(`${API_URL}/home/${urlId}`);
      setMovie(response.data);
      setStatus(response.data.Alert);
    } catch (error) {
      console.error("Error searching:", error);
      setStatus(error.response?.data?.Alert || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearchID();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : movie && Object.keys(movie).length ? (
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
          <img
            src={movie.photo || movie.alternate}
            alt={`Image of ${movie.title}`}
          ></img>
          <a href={movie.trailer}>
            {movie.trailer ? `Trailer for ${movie.title}` : ""}
          </a>
          <p>Added on {movie.createdAt}</p>
        </div>
      ) : (
        <p>No results found</p>
      )}
      <p>{status}</p>
    </div>
  );
};

export default IDWisePage;
