import NewUser from "./NewUser";
import Login from "./Login";
import { useContext, useState } from "react";

const LandingPage = (props) => {
  const { logged, setLogged } = props;
  if (!logged) {
    return <NewUser setLogged={setLogged}></NewUser>;
  } else {
    return <Login setLogged={setLogged}></Login>;
  }
};

export default LandingPage;
