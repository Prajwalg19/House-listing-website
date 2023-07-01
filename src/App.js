import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
function App() {
    return (
        <>
            <ToastContainer />
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/offers" element={<Offers />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
