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
      <h1 style={{ textAlign: "center" }}>Manage Shop</h1>
      <p>
        {data.map((x) => (
          <div key={x._id} style={{ margin: "2%", padding: "2%" }}>
            <h1>{x.itemName}</h1>
            <p>{x.itemDescription}</p>
            <h3>{x.itemQuantity} Items available in stock</h3>
            <h4>{x.itemAvailability ? "In Stock" : "Out of stock"}</h4>
            <img
              alt={`Image of ${x.itemName}`}
              src={x.itemPhoto}
              height={"fit-content"}
            ></img>
          </div>
        ))}
      </p>
    </div>
  );
};

export default ViewExisting;
