import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
const Home = () => {
  //   const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    // You'll update this function later
    navigate("/login");
  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          //  value={loggedIn ? "Log out" : "Log in"}
          value={"Login"}
        />
        {/* {loggedIn ? <div>Your email address is {email}</div> : <div />} */}
      </div>
    </div>
  );
};

export default Home;
