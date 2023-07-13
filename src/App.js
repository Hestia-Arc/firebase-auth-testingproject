import React, { useContext, useEffect } from "react";
import Layout from "./components/layout/Layout";
import "./App.css";
// import MainHeader from './components/MainHeader/MainHeader';
// import Auth from './components/auth/Auth'
import Home from "./components/Home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Profile from "./components/profile/Profile";
import { auth, createUserProfile, userProfile } from "./firebase/firebaseUtil";
import { onSnapshot } from "firebase/firestore";
import AuthContext from "./store/authCtx";

function App() {
  const {isLoggedIn} = useContext(AuthContext);
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {

        const user = await createUserProfile(userAuth);

        onSnapshot(user, (querySnapshot) => {
          // setUser(querySnapshot.data());
          console.log(querySnapshot);
        });


      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // console.log('the current user ' + JSON.stringify(currentUser));

  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<Home />} />

        <Route path="/auth" element={!isLoggedIn ? <Auth /> : <Navigate to='/profile'/>} />

        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to='/auth' />} />
      </Routes>
    </Layout>
  );
}

export default App;
