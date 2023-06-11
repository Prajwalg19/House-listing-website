import { BrowserRouter as Bingo, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";
import Offers from "./pages/Offers";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
    return (
        <Bingo>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/sign-in" element={<SignIn />}></Route>
                <Route path="/sign-out" element={<SignOut />}></Route>
                <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                <Route path="/offers" element={<Offers />}></Route>
            </Routes>
        </Bingo>
    );
}

export default App;
