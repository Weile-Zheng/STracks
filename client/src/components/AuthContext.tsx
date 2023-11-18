import React from "react";
import { useState } from "react";

/**************************************************************************
 * ClientContext OBJECT
 * AuthContext OBJECT
 * AuthProvider FUNCTIONAL Component
 *
 * State managing for user authentication.
 *
 * Track for:
 * authentication status [Bool]
 * return code 	[String]
 * access token  [String]
 *
 * USED for acquiring information from spotify api
 * SHARED between Callback, Home, and other spotify api interacting components
 * INITIALLY set in Callback.tsx.
 * WRAPPED around routes in App.tsx
 ***************************************************************************/

export const ClientContext = React.createContext("4c9d395af6dd467ab054393b3b189898");

export const AuthContext = React.createContext({
	isAuthenticated: false,
	code: "",
	accessToken: "",
	setAuthenticated: (_: boolean) => {},
	setCode: (_: string) => {},
	setAccessToken: (_: string) => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAuthenticated, setAuthenticated] = useState(false);
	const [code, setCode] = useState("");
	const [accessToken, setAccessToken] = useState("");
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setAuthenticated,
				code,
				setCode,
				accessToken,
				setAccessToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
