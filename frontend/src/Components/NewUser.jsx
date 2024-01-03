import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const NewUser = ({ setLogged }) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    mail: "",
    photo: "",
  });
  const usernamefield = useRef();
  const passwordfield = useRef();

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <h1>Welcome to VeloFlix</h1>
      <h1>Register</h1>
      <form onSubmit={createUser}>
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
        <input
          type="email"
          onChange={(e) => setData({ ...data, mail: e.target.value })}
          placeholder="Enter mail"
          value={data.mail}
        />
        <input
          onChange={(e) => {
            setData({ ...data, photo: e.target.value });
          }}
          value={data.photo}
          placeholder="Enter Photo"
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
