import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const NewUser = (props) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    mail: "",
    photo: "",
  });
  const usernamefield = useRef();
  const passwordfield = useRef();

  // eslint-disable-next-line react/prop-types
  const { status, setStatus, loading, setLoading, setLogged } = props;

  const createUser = async (e) => {
    e.preventDefault();

    const { username, password, mail, photo } = data;
    try {
      setLoading(true);
      const response = await Axios.post("http://localhost:8000/register", {
        username,
        password,
        mail,
        photo,
      }); //destructured for more control over data object

      if (response.status === 201) {
        setStatus(`${data.username} Created`);
        setLogged(true);
        window.location.href = "http://localhost:5173/";
      } else if (response.status === 409) {
        setStatus(`${data.username} or ${data.mail} already exist`);
      } else if (response.status === 400) {
        setStatus("User already exists");
      }
    } catch (err) {
      console.error(err);
      setStatus(err.response.data.Alert);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Welcome to VeloFlix</h1>
      <h1>Register</h1>
      <form onSubmit={createUser}>
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
        <input
          type="email"
          onChange={handleChange}
          placeholder="Enter mail"
          name="mail"
        />
        <input
          onChange={handleChange}
          value={data.photo}
          placeholder="Enter Photo"
          name="photo"
        ></input>
        <p>{status ? status : ""}</p>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Create User"}
        </button>
      </form>
      <p>
        Already an user ? <Link to="/login">Click Here to Login!</Link>
      </p>
    </>
  );
};

export default NewUser;
