import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const IDWisePage = () => {
  const API_URL = "http://localhost:8000";
  const [idData, setIDData] = useState([]);
  const { id } = useParams();

  const handleSearchID = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.get(`${API_URL}/home/${id}`);
      setIDData(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  useEffect(() => {
    handleSearchID();
  }, []);

  return (
    <div>
      <h2>Testing ID Wise Page</h2>
      {idData && idData.length ? (
        <div>
          <h3>Data for ID {id}</h3>
          <ul>
            {idData.map((item) => (
              <li key={item.id}>
                {item.name}: {item.value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Invalid Film</p>
      )}
    </div>
  );
};

export default IDWisePage;
