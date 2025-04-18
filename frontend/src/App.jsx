import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Signup from "./components/Signup";

const App = () => {

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};
export default App;
