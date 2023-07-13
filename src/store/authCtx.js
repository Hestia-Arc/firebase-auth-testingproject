import { useState, createContext} from 'react'
import {auth} from '../firebase/firebaseUtil'

const AuthContext = createContext({
  isLoggedIn: false,
  logIn: (token) => {},
  logOut: () => {},
});

const retrieveStorageToken = () => {
  const storedToken = localStorage.getItem('token');

  return storedToken;
}


export const AuthContextProvider = (props) => {
  
  const tokenData = retrieveStorageToken();
  let initialToken;
  

  if (tokenData) {
    initialToken = tokenData;
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logIn = (token) => {
    setToken(token);

    localStorage.setItem('token', token);
    
  }


  const logOut = () => {
    setToken(null);
    localStorage.clear();
    auth.signOut()
    
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    logIn: logIn,
    logOut: logOut,
  }

  return <AuthContext.Provider value={contextValue} > {props.children} </AuthContext.Provider>
}

export default AuthContext;

