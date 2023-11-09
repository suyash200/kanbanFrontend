import GetAllBoardsApi from "../../api/auth/kanban";
import { LoginApi } from "../../api/auth/login";
import "./login.css";
import { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const onSubmit = async () => {
    const res = await LoginApi(login);
    // res.status === 200 ? localStorage.setItem("token", res.data.token) : null;
    if (res.status === 200) {
      localStorage.setItem("token", res.data.token);
    }
    const getAllBoards= await GetAllBoardsApi()
    
    return res;
   
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
          />
          <input
            value={login.password}
            onChange={(e) => {
              setLogin({ ...login, password: e.target.value });
            }}
            type="password"
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
