/* eslint-disable react/prop-types */
import { useState, useRef, useContext } from "react";
import { UserData } from "../App";
import Axios from "axios";
import { Link } from "react-router-dom";

const Login = (props) => {
  const { status, setStatus, loading, setLoading } = useContext(UserData);
  const [data, setData] = useState({ username: "", password: "" });
  const usernamefield = useRef();
  const passwordfield = useRef();
  // eslint-disable-next-line no-unused-vars
  const { logged, setLogged } = props;

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
        if (r.response.status === 200) {
          setStatus("User Logged in");
          setLogged(true);
          window.location.href = "http://localhost:5173/";
        } else if (r.response.status === 404) {
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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "5%", justifyContent: "space-evenly" }}>
      <h1>Login Page</h1>
      <form onSubmit={LogUser}>
        <input
          type="text"
          ref={usernamefield}
          onChange={handleChange}
          placeholder="Enter Username"
          name="username"
        />
        <input
          ref={passwordfield}
          type="password"
          onChange={handleChange}
          placeholder="Enter password"
          name="password"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
        <h1> {status}</h1>
      </form>
      <br></br>
      <Link to="/newuser">Not an user yet ? Click Here 😊</Link>
      <br></br>
      <Link to="/forgotpass">Forgot your password ? Click Here</Link>
    </div>
  );
};

export default Login;
