import Axios from "axios";
import { useState } from "react";

const ForgotPass = (props) => {
  // eslint-disable-next-line react/prop-types
  const { status, setStatus } = props;
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const ForgotPass = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const r = await Axios.post("http://localhost:8000/register/forgot", {
        data,
      });
      if (r.status === 200) {
        setStatus("Ok");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <p>Fill this 👇🏻 to update your password!</p>
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
        <button disabled={loading}>
          {loading ? "Loading..." : "Forgot Password"}
        </button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default ForgotPass;
