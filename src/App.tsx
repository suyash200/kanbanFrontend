import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login";
import Dashboard from "./pages/dashboard/dashboard";
import Kanban from "./components/kanban/kanban";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/board/:name" element={<Kanban />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
