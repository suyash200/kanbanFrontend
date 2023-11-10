import { useNavigate } from "react-router-dom";
import { Register } from "../../api/auth/login";
import "./login.css";
import { useState } from "react";

export default function Signup() {
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
    try {
      const res = await Register(login);
      // res.status === 200 ? localStorage.setItem("token", res.data.token) : null;
      if (res.status === 200) {
        navigate("/login");
      }

      return res;
    } catch (error) {
      console.error(error);
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
        <h1>SignUp</h1>

        <div className="forms">
          <input
            value={login.firstName}
            onChange={(e) => {
              setLogin({ ...login, firstName: e.target.value });
            }}
            type="text"
            placeholder="first name"
          />
          <input
            value={login.lastName}
            onChange={(e) => {
              setLogin({ ...login, lastName: e.target.value });
            }}
            type="text"
            placeholder="Last Name"
          />
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
