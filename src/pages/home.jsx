import React from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "../components/1.Header/header";
import './home.css';
import GlowBar from "../components/1.Header/glowBar";
import Footer from "../components/3.Footer/footer";

function Home() {
  return (
    <div id="homeMainContainer">
      <Header />
      <GlowBar />
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/landing">landing</Link>
          </li>
          <li>
            <Link to="/olffloApp">Contact</Link>
          </li>
        </ul>
      </nav>

    <Footer />
      <Outlet />
    </div>
  );
}

export default Home;
