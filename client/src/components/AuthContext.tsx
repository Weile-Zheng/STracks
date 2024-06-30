import React from "react";

/**************************************************************************
 * ClientContext OBJECT
 * AuthContext OBJECT
 * AuthProvider FUNCTIONAL Component
 *
 * State managing for clientID and user authentication.
 *
 * ClientContext -> ClientID(NOT SENSITIVE)
 * 		Does Not Change.
 *
 * AuthContext -> user authentication
 * 		Changes dynamically required code and access tokens returned from spotify.
 * 		Managed with AuthProvider for allowing dynamic change.
 *
 * 		Track for:
 * 		authentication status [Bool]
 * 		return code 	[String]
 * 		access token  [String]
 *
 * USED for acquiring information from spotify api
 * SHARED between Callback, Home, and other spotify api interacting components
 * INITIALLY set in Callback.tsx.
 * WRAPPED around routes in App.tsx
 ***************************************************************************/

// Not sensitive. Only need to secure "client secret" from spotify. 
export const ClientContext = React.createContext("4c9d395af6dd467ab054393b3b189898");

export const AuthContext = React.createContext({
	isAuthenticated: false,
	code: "",
	accessToken: "",
	setAuthenticated: (_: boolean) => {},
	setCode: (_: string) => {},
	setAccessToken: (_: string) => {},
});
