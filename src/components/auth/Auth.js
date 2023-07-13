import React, { useRef, useState, useContext } from "react";
import classes from "./Auth.module.css";
import AuthContext from "../../store/authCtx";
import { useNavigate } from "react-router-dom";
import { createUserProfile, loginWithEmailAndPassword, signInWithGoogle, signUpWithEmailAndPassword } from "../../firebase/firebaseUtil";

function Auth() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();
  const navigate = useNavigate();
  const {logIn} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);



  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

   const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const displayName = usernameInputRef.current.value;

    if (isLogin) {
    
      try {
       const userCredential = await loginWithEmailAndPassword(enteredEmail,enteredPassword);
        const token = userCredential.user.accessToken;

        logIn(token);
        navigate('/profile');

        
      
      
      } catch(error) {
        console.error(error);
      }
      
    } else { 
      try {
        const {user} = await signUpWithEmailAndPassword(enteredEmail, enteredPassword);
        await createUserProfile(user, {displayName}); 

      console.log(user);
      } catch(error) {
        console.error(error);
      }



      
    }

    

    // Tasks 19/06/23
    //1 when user is registering, confirm if it is an existing user,
    // if the user exists say there is already an existing user

    // -----------------------------
    //2 if the user is trying to log in,
    // and the user name is not corresponding with the one in the local storage,
    // tell us that invalid credentials
  }

  const googleHandler = async () => {
    const userCredential = await signInWithGoogle();

    console.log(userCredential);

    const token = userCredential.user.accessToken;

        logIn(token);
        navigate('/profile');
    
  }

  

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={submitHandler}>
      <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          <button onClick={googleHandler}>Login with Google</button>
        </div>
      </form>
    </section>
  );
}

export default Auth;
