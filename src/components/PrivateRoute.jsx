// import { Navigate, Outlet } from "react-router";

// export default function PrivateRoute() {
//     const loggedIn = true;
//     return <div>{loggedIn ? <Outlet /> : <Navigate to={"/sign-in"} />}</div>;
// }

import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.jsx";
import Spinner from "../components/Spinner";
export default function PrivateRoute() {
    const { loggedIn, checking } = useAuth();
    if (checking) {
        return (
            <>
                <Spinner />
            </>
        );
    }

    return loggedIn ? <Outlet /> : <Navigate to={"/sign-in"} />;
}
