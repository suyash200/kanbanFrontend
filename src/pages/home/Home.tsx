import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  //   const { loggedIn, email } = props;
  const navigate = useNavigate();

  const onButtonClick = () => {
    // You'll update this function later
  };
 
  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div  onClick={onButtonClick}>click here to login</div>
      <div className={"buttonContainer"}>
        {/* <input
          className={"inputButton"}
          type="button"
         
          //   value={loggedIn ? "Log out" : "Log in"}
        /> */}
        {/* {loggedIn ? <div>Your email address is {email}</div> : <div />} */}
      </div>
    </div>
  );
};

export default Home;
