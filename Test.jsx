import { useEffect, useState } from "react";

const TestPage = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div>
      <input
        onChange={handleChange}
        placeholder="Enter Username"
        name="username"
      ></input>
      <input
        onChange={handleChange}
        placeholder="Enter password"
        name="password"
      ></input>
      <button
        onClick={() => {
          setData(data);
        }}
      >
        Handle
      </button>
    </div>
  );
};

export default TestPage;
