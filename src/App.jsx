import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/CreateProfile";
import NoProfileOnly from "./components/NoProfileOnly";
import AuthGate from "./components/AuthGate";
import RequireProfile from "./components/RequireProfile";


function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthGate />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<RequireProfile><Dashboard /></RequireProfile>} />
          <Route path="/create-profile" element={<NoProfileOnly><CreateProfile /></NoProfileOnly>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
