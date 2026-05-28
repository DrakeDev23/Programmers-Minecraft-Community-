import { useEffect, useState } from "react";
import { auth, setCsrfToken } from "../../api/client";

export default function AdminRoute({ children }) {
    const [checking, setChecking] = useState(true);
    const [authed, setAuthed] = useState(false);

    useEffect(() => {
        auth.me()
            .then((data) => {
                setCsrfToken(data.csrf_token);
                setAuthed(true);
            })
            .catch(() => {
                window.location.href = "/admin/login";
            })
            .finally(() => setChecking(false));
    }, []);

    if (checking) return null;
    if (!authed) return null;
    return children;
}