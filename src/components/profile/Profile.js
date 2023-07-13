import React from "react";
import styles from "./Profile.module.css";
import Assets from "../assets/Assets";
// import { useNavigate } from "react-router-dom";


function Profile() {
 

  return (
    <section className={styles.starting}>
      {/* {isLoggedIn ? <h1>Your Profile {currentUser.displayName}</h1> : <h1>Loading Profile...</h1>} */}
      <h1>Your Profile </h1>
      <Assets />
    </section>
  );
}

export default Profile;
