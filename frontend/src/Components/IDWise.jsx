import { useEffect, useState, useContext } from "react";
import { UserData } from "../App";
import Axios from "axios";

const IDWisePage = () => {
  const datax = useContext(UserData);
  const { status, setStatus, id } = datax;
  const API_URL = "http://localhost:8000";
  const [idData, setIDData] = useState([]);

  const handleSearchID = async () => {
    try {
      const response = await Axios.post(`${API_URL}/home/${id}`);
      setIDData(response.data);
      setStatus(response.data.Alert);
    } catch (error) {
      console.error("Error searching:", error);
      setStatus(error.response.data.Alert);
    }
  };

  useEffect(() => {
    handleSearchID();
    console.log(id);
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
      <p>{status}</p>
    </div>
  );
};

export default IDWisePage;
