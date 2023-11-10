import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi, Register } from "../../api/auth/login";

export default function Signup2() {
  const navigate = useNavigate();
  const [login, setLogin] = useState<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const onSubmit = async () => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    try {
      if (
        login.email === "" ||
        (login.password === "" &&
          regex.test(login.email) &&
          !login.firstName &&
          !login.lastName)
      ) {
        alert("enter credentials");
      } else {
        const res = await Register(login);

        if (res.status === 200) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Sign Up</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={login.firstName}
          placeholder="Enter your first name here"
          onChange={(e) => {
            setLogin({ ...login, firstName: e.target.value });
          }}
          className={"inputBox"}
        />
        <br />
        <div className={"inputContainer"}>
          <input
            value={login.lastName}
            placeholder="Enter your last name here"
            onChange={(e) => {
              setLogin({ ...login, lastName: e.target.value });
            }}
            className={"inputBox"}
          />
          <br />
          <div className={"inputContainer"}>
            <input
              value={login.email}
              placeholder="Enter your email here"
              onChange={(e) => {
                setLogin({ ...login, email: e.target.value });
              }}
              className={"inputBox"}
            />
            <br />
            {/* <label className="errorLabel">{emailError}</label> */}
          </div>
          <div className={"inputContainer"}>
            <input
              value={login.password}
              placeholder="Enter your password here"
              onChange={(e) => {
                setLogin({ ...login, password: e.target.value });
              }}
              type="password"
              className={"inputBox"}
            />
            {/* <label className="errorLabel">{emailError}</label> */}
          </div>
          <br />

          {/* <label className="errorLabel">{passwordError}</label> */}

          <br />
          <div className={"inputContainer"}>
            <input
              className={"inputButton"}
              type="button"
              onClick={onSubmit}
              value={" Sign Up "}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
