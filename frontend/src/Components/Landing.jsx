import NewUser from "./NewUser";
import Login from "./Login";

const LandingPage = (props) => {
  // eslint-disable-next-line react/prop-types
  const { logged, setLogged, setUser } = props;
  if (!logged) {
    return <NewUser setLogged={setLogged} setUser={setUser}></NewUser>;
  } else {
    return <Login setLogged={setLogged}></Login>;
  }
};

export default LandingPage;
