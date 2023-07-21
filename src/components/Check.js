import { useAuth } from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import Spinner from "./Spinner";
function Check() {
    const { loggedIn, checking } = useAuth();
    if (checking) {
        return <Spinner />;
    }
    return <div>{loggedIn ? <Outlet /> : <Navigate to="/sign-in" />}</div>;
}

export default Check;
