import { useNavigate } from "react-router-dom";
import { LoginApi } from "../../api/auth/login";
import "./login.css";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const onSubmit = async () => {
    try {
      const res = await LoginApi(login);

      if (res?.status === 200) {
        localStorage.setItem("token", res?.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const context = useContext()
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "auto",
        marginTop: "250px",
        // filter: "drop-shadow(0.6rem 0.6rem 1rem rgba(183, 183, 189, 0.8))",
      }}
    >
      <div className="mainComp">
        <h1>Login</h1>

        <div className="forms">
          <input
            value={login.email}
            onChange={(e) => {
              setLogin({ ...login, email: e.target.value });
            }}
            type="email"
            placeholder="Email"
          />
          <input
            value={login.password}
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
            }}
            type="password"
            placeholder="Password"
          />
        </div>
        <a href="/signup">
          {" "}
          <h4> dont have an Account? Signup</h4>
        </a>
        <button
          onClick={(e) => {
            onSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
