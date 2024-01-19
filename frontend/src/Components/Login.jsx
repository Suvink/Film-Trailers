/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useRef, useContext } from "react";
import { UserData } from "../App";
import Axios from "axios";
import { Link } from "react-router-dom";
import { googleProvider, auth } from "./Fire/FireConfig";
import { signInWithPopup, signOut } from "firebase/auth";

const Login = (props) => {
  const { status, setStatus, loading, setLoading } = useContext(UserData);
  const [data, setData] = useState({ username: "", password: "" });
  const usernamefield = useRef();
  const passwordfield = useRef();
  const { setLogged } = props;

  const endPoint = "http://localhost:8000";

  console.log(auth?.currentUser?.email);

  const LogUser = async (e) => {
    e.preventDefault();
    if (status !== "") {
      setStatus("");
    }

    const { username, password } = data;

    try {
      setLoading(true);
      const response = await Axios.post(`${endPoint}/login`, {
        username,
        password,
      });

      if (response.data.status === 200) {
        setStatus(response.data.data.Alert);
        setLogged(true);
      } else if (response.data.status === 404) {
        setStatus(response.data.data.Alert);
      } else {
        setStatus("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const signUpGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);

      if (response && response.user) {
        setLogged(true);
        setStatus("Google sign-in successful");
      } else {
        setStatus("Error while logging in!");
      }
    } catch (err) {
      console.error(err);
      setStatus("Failed to sign in with Google");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

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
        <button onClick={signUpGoogle}>Sign Up With Google!</button>
        <br></br>
        <button onClick={handleLogout}>Log Out!</button>
        <h1> {status}</h1>
      </form>
      <br></br>
      <Link to="/newuser">Not a user yet? Click Here 😊</Link>
      <br></br>
      <Link to="/forgotpass">Forgot your password? Click Here</Link>
    </div>
  );
};

export default Login;
