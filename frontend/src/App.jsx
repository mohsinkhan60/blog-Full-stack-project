import { Route, Routes, Navigate } from "react-router";
import Home from "./pages/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unmatched paths to Home */}
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect unmatched paths to Login */}
        </>
      )}
    </Routes>
  );
};

export default App;