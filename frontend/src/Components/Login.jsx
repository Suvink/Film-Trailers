import { useState, useRef } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Login = (props) => {
  // eslint-disable-next-line react/prop-types
  const { setLogged, status, setStatus } = props;
  const [data, setData] = useState({ username: "", password: "" });
  const usernamefield = useRef();
  const passwordfield = useRef();
  const [loading, setLoading] = useState(false);

  const endPoint = "http://localhost:8000";

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
      }).then(() => {
        if (r.status === 200) {
          setStatus("User Logged in");
          setLogged(true);
          window.location.href = "http://localhost:5173/";
        } else if (r.status === 404) {
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
      <Link to="/newuser">Not an user yet ? Click Here 😊</Link>
      <Link to="/forgotpass">Forgot your password ? Click Here</Link>
    </div>
  );
};

export default Login;
