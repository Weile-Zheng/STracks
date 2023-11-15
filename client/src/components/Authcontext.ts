import React from "react";

const AuthContext = React.createContext({
	isAuthenticated: false,
	code:"", 
	accessToken:"",
	// @ts-ignore
	setAuthenticated: (value: boolean) => {},
	// @ts-ignore	
	setCode: (value: string) => {},
	// @ts-ignore
	setToken:(value:string)=>{}
});

export default AuthContext;
