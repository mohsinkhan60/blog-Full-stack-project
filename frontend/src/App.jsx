import { Route, Routes, Navigate } from "react-router";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./auth";

const App = () => {
  const [logged] = useAuth();

  return (
    <Routes>
      {logged ? (
        <>
          {/* Route for the root path */}
          <Route path="/" element={<Home />} />
          {/* Redirect any unmatched paths to the home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          {/* Routes for signup and login */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Redirect any unmatched paths to the login page */}
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default App;