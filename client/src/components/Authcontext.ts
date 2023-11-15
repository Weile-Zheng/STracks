import React from "react";

const AuthContext = React.createContext({
	isAuthenticated: false,
	code:"", 
	// @ts-ignore
	setAuthenticated: (value: boolean) => {},
	// @ts-ignore	
	setCode: (value: string) => {}
});

export default AuthContext;
