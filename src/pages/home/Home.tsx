

const Home = () => {
  //   const { loggedIn, email } = props;



  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <a href="/login">click here to login</a>
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
