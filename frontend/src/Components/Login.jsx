import { useState, useRef } from "react";
import Axios from "axios";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const usernamefield = useRef();
  const passwordfield = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const endPoint = "";

  async function LogUser(e) {
    e.preventDefault();
    if (status !== "") {
      setStatus("");
    }

    const { username, password } = data;
    try {
      setLoading(true);
      const r = await Axios.post(`${endPoint}/login`, {
        username,
        password,
      }).then((r) => {
        if (r.status === 200) {
          setStatus("User Logged in");
        } else if (r.status === 409) {
          setStatus("Username or Password invalid, please try again!");
        } else {
          setStatus("Something went wrong!");
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={LogUser}>
        <input
          type="text"
          ref={usernamefield}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          placeholder="Enter Username"
          value={data.username}
        />
        <input
          ref={passwordfield}
          type="password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
          placeholder="Enter password"
          value={data.password}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        {status}
      </form>
    </div>
  );
};

export default Login;
