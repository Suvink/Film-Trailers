import Axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { UserData } from "../App";
import ItemsPage from "./Items";
const ViewExisting = () => {
  const datax = useContext(UserData);
  const { status, setStatus, loading, setLoading, data, setData } = datax;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getItems() {
    try {
      setLoading(true);
      const r = await Axios.get("http://localhost:8000/cart");
      setData(r.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function Order(id) {
    try {
      setLoading(true);
      const r = await Axios.post(`http://localhost:8000/cart/${id}`);
      if (r.status === 201) {
        setStatus("Order Placed");
      }
    } catch (err) {
      console.error(err);
      setStatus(err.response.data.Alert);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getItems();
  }, [getItems]);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Manage Shop</h1>
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {data && data.length ? (
              data.map((x) => (
                <div key={x._id} style={{ margin: "2%", padding: "2%" }}>
                  <ItemsPage data={x}></ItemsPage>
                  <button
                    onClick={() => {
                      Order(x._id);
                    }}
                  >
                    Order
                  </button>
                  <p>{status}</p>
                </div>
              ))
            ) : (
              <h1>No items exist</h1>
            )}
          </div>
        )}
      </div>

      {/**Needs to contain button to click and delete/update specific item */}
    </div>
  );
};

export default ViewExisting;
