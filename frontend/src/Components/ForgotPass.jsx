import { useState } from "react";

const ForgotPass = () => {
  const [data, setData] = useState({ email: "", username: "" });

  const ForgotPass = () => {};

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
        <button>Forgot Password</button>
      </form>
    </div>
  );
};

export default ForgotPass;
