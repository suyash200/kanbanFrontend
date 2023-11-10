import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/dashboard";
import Kanban from "./components/kanban/kanban";
import Login2 from "./pages/auth/login2";
import Signup2 from "./pages/auth/signup2";
import ErrorElem from "./pages/error/error";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/login"
            element={<Login2 />}
            errorElement={<ErrorElem />}
          />
          <Route
            path="/signup"
            element={<Signup2 />}
            errorElement={<ErrorElem />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard />}
            errorElement={<ErrorElem />}
          />
          <Route
            path="/board/:name"
            element={<Kanban />}
            errorElement={<ErrorElem />}
          />
          <Route path="/404" element={<ErrorElem />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
