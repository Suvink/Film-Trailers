import Axios from "axios";
import { useEffect, useState } from "react";

const ViewExisting = () => {
  const [data, setData] = useState([]);
  async function getItems() {
    try {
      const r = await Axios.get("http://localhost:8000/cart");
      setData(r.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div>
      <h1>Manage Shop</h1>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
};

export default ViewExisting;
