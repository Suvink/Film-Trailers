import Axios from "axios";
import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { auth, db } from "./FireConfig";
import { collection, getDocs } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Firebase = () => {
  const [user, setUser] = useState({ mail: "", password: "" });
  const [data, setData] = useState([]);

  const testFirelol = async () => {
    try {
      await Axios.post("http://localhost:8000/fire", user);
    } catch (err) {
      console.error(err);
    }
  };

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, user.mail, user.password);
    } catch (err) {
      console.error(err);
    }
  };

  const findDocs = async () => {
    try {
      const findMovies = collection(db, "items");
      const querySnapshot = await getDocs(findMovies);
      const newData = querySnapshot.docs.map((doc) => doc.data());
      setData(newData);
      console.log(newData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    findDocs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Firebase page</h1>
      <p>{JSON.stringify(data)}</p>
      <input
        onChange={handleChange}
        name="mail"
        placeholder="Enter mail"
      ></input>
      <input
        onChange={handleChange}
        name="password"
        placeholder="Enter password"
      ></input>
      <button onClick={testFirelol}>Create Firebase account</button>
      <button onClick={signIn}>Sign Up</button>
    </div>
  );
};

export default Firebase;
