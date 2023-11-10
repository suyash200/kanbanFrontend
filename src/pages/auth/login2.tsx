import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../api/auth/login";

export default function Login2() {
  const navigate = useNavigate();
  const [login, setLogin] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    try {
      if (
        login.email === "" ||
        (login.password === "" && regex.test(login.email))
      ) {
        alert("enter credentials");
      } else {
        const res = await LoginApi(login);

        if (res?.status === 200) {
          localStorage.setItem("token", res?.data.token);
          localStorage.setItem("login", "true");

          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
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
        {/* <label className="errorLabel">{emailError}</label> */}
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={login.password}
          placeholder="Enter your password here"
          onChange={(e) => {
            setLogin({ ...login, password: e.target.value });
          }}
          className={"inputBox"}
        />
        {/* <label className="errorLabel">{passwordError}</label> */}
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onSubmit}
          value={"Log in"}
        />
      </div>
    </div>
  );
}
