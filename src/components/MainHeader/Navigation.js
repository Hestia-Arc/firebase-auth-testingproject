import React from "react";
import classes from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import AuthContext from "../../store/authCtx";

function Navigation() {

    const {isLoggedIn, logOut } = useContext(AuthContext);

  function handleBtn() {
     logOut()
    }

  return (
    <nav className={classes.nav}>
      <ul>

        {isLoggedIn && 
        <li>
          
          <a href="/profile">Profile</a>{" "}
        </li>
        }

        {isLoggedIn && 
        <li>
          <a href="/">Admin</a>
        </li>
        }

        {isLoggedIn && 
        <li>
          <button onClick={handleBtn}>Logout</button>
        </li>
            }

        {!isLoggedIn &&     
        <li>
          <Link to="/auth">LogIn</Link>
        </li>
        }
      </ul>
    </nav>
  );
}

export default Navigation;
