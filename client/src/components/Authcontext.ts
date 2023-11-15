import React from 'react';

const AuthContext = React.createContext({
  isAuthenticated: false,
  setAuthenticated: (value:boolean)=> {
  }
});

export default AuthContext;