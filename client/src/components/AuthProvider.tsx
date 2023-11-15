import { useState } from "react";
import AuthContext from "./Authcontext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [code, setAuthCode] = useState("");

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setAuthenticated: setIsAuthenticated,
				code,
				setCode: setAuthCode,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
