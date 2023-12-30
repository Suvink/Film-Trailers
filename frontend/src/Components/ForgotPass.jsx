import Axios from "axios";
import { useState } from "react";

const ForgotPass = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const ForgotPass = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const r = await Axios.post("http://localhost:8000/register/forgot", data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <p>This is a test page if user forgets password</p>
      <form onSubmit={ForgotPass}>
        <input
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
          placeholder="Enter email"
        ></input>
        <input
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
          placeholder="Enter Updated Password"
        ></input>
        <button>Forgot Password</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default ForgotPass;
