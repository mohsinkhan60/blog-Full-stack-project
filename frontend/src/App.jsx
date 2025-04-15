import { Route, Routes } from "react-router";
import Home from "./pages/Home";

const App = () => {

  return (
    <Routes>
      <Route index element={<Home />} />
    </Routes>
  );
};
export default App;
