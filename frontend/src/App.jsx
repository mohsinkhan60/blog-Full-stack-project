import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";

const App = () => {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
export default App;
