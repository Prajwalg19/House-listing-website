import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-out" element={<SignOut />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/offers" element={<Offers />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
