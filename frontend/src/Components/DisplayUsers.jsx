import { useEffect, useState } from "react";
import Axios from "axios";

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function UserData() {
    try {
      setLoading(true);
      const r = await Axios.get("http://localhost:8000/register");
      setUsers(r.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    UserData();
  }, []);

  async function DeleteUser(id) {
    try {
      setLoading(true);
      const r = await Axios.delete(`http://localhost:8000/register/${id}`);
      UserData();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {loading
        ? "loading..."
        : users.map((x) => (
            <div key={x._id}>
              <br></br>
              <label>
                <p>ID is {x._id}</p>
                <h1>Username : {x.username}</h1>
                <h2>Password : {x.password}</h2>
                <h3>Mail : {x.mail}</h3>
                <img src={x.photo} alt=""></img>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    DeleteUser(x._id);
                  }}
                >
                  Delete User
                </button>
              </label>
              <br></br>
            </div>
          ))}
    </div>
  );
};

export default DisplayUsers;
