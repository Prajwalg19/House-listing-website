import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useAuth() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checking, setChecking] = useState(true);
    const auth = getAuth();
    useEffect(() => {
        onAuthStateChanged(auth, (ok) => {
            if (ok) {
                setLoggedIn(true);
            }
            setChecking(false);
        });
    });

    return { loggedIn, checking };
}
