import React, { useEffect, useState } from "react";
import Axios from "axios";

const DisplayUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function UserData() {
      try {
        setLoading(true);
        const r = await Axios.get("http://localhost:8000/register")
          .then((r) => {
            setUsers(r.data);
          })
          .catch((e) => {
            setUsers(e.response.data);
          });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    UserData();
  }, []);
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
              </label>
              <br></br>
            </div>
          ))}
    </div>
  );
};

export default DisplayUsers;
