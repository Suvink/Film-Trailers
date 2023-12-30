import Axios from "axios";
import { useEffect, useState } from "react";

const ViewExisting = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  async function getItems() {
    try {
      const r = await Axios.get("http://localhost:8000/cart");
      setData(r.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function Order(id) {
    try {
      const r = await Axios.post(`http://localhost:8000/cart/${id}`);
      if (r.status === 201) {
        setStatus("Order Placed");
      }
    } catch (err) {
      console.error(err);
      setStatus(err.response.data.Alert);
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
            <button
              onClick={() => {
                Order(x._id);
              }}
            >
              Order
            </button>
            <p>{status}</p>
          </div>
        ))}
      </p>

      {/**Needs to contain button to click and delete/update specific item */}
    </div>
  );
};

export default ViewExisting;
