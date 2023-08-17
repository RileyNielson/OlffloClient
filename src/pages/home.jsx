import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/1.Header/header";
import "./home.css";
import Footer from "../components/3.Footer/footer";
import NotLoggedInHome from "../components/2.Home/notLoggedInHome";
import LoggedInHome from "../components/2.Home/loggedInHome";

function Home(props) {
  return (
    <div id="homeMainContainer">
      <Header
        loggedIn={props.loggedIn}
        setUser={props.setUser}
        user={props.user}
      />
      {props.loggedIn ? (
        <LoggedInHome
          user={props.user}
          setUser={props.setUser}
          setProject={props.setProject}
          project={props.project}
        />
      ) : (
        <NotLoggedInHome />
      )}
      <div id="homeFooter">
        <Footer />
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
