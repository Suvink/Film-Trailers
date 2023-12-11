import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const NewUser = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    mail: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await Axios.post("http://localhost:8000/register", data);

      if (response.status === 201) {
        setStatus(`${data.username} Created`);
      } else if (response.status === 409) {
        setStatus(`${data.username} or ${data.mail} already exist`);
      } else {
        setStatus("Error");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link to="/manage">View Users</Link>
      <h1>Register</h1>
      <form onSubmit={createUser}>
        <input
          type="text"
          onChange={(e) => setData({ ...data, username: e.target.value })}
          placeholder="Enter Username"
          value={data.username}
        />
        <input
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Enter password"
          value={data.password}
        />
        <input
          type="email"
          onChange={(e) => setData({ ...data, mail: e.target.value })}
          placeholder="Enter mail"
          value={data.mail}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Create User"}
        </button>
      </form>
    </>
  );
};

export default NewUser;
