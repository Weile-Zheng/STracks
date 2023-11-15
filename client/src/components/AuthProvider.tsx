import { useState } from "react";
import AuthContext from "./Authcontext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setAuthenticated: setIsAuthenticated }}
        >
            {children}
        </AuthContext.Provider>
    );
};
