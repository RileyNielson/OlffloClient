import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/1.Header/header";
import "./home.css";
import Footer from "../components/3.Footer/footer";
import homePics from "./homePics";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function Home(props) {
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);

  function handleHorizontalScroll(element, step) {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= 1000) {
        clearInterval(slideTimer);
      }
      console.log(element.scrollLeft);
      if (element.scrollLeft <= 100) {
        setArrowDisable(true);
        console.log(arrowDisable);
      } else {
        setArrowDisable(false);
      }
    }, 5);
  }

  return (
    <div id="homeMainContainer">
      <Header loggedIn={props.loggedIn} setUser={props.setUser}/>
      <div id="homeBody">
        <div id="homeTitle">
          <h1>
            Make Your Work <span>Flow</span>
          </h1>
        </div>
        <h3>
          Olfflo allows you to create intuitive workflows to simplify your
          processes.
        </h3>
        <button id="signUpButton" type="button">
          Sign Up
        </button>
        <div
          className="carouselButton leftButton"
          onClick={() => {
            handleHorizontalScroll(elementRef.current, -10);
          }}
          disabled={arrowDisable}
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </div>
        <div id="homeCarousel" ref={elementRef}>
          {homePics.map((pic) => (
            <div className="homePic" style={{ backgroundColor: pic.color }}>
              {pic.title}
            </div>
          ))}
        </div>
        <div
          className="carouselButton rightButton"
          onClick={() => {
            handleHorizontalScroll(document.getElementById("homeCarousel"), 10);
          }}
        >
          <ArrowCircleRightIcon fontSize="large" />
        </div>
        <div id="featuresContainer">
          <h2>A Project Management Tool For Everyone</h2>
          <div id="features">
            <div>
              <h3>Free</h3>
              <p>
                Prow scuttle parrel provost Sail ho shrouds spirits boom
                mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's
                nest nipperkin grog yardarm hempen halter furl. Swab barque
                interloper chantey doubloon starboard grog black jack gangway
                rutters.
              </p>
            </div>
            <div>
              <h3>Pro</h3>
              <p>
                Deadlights jack lad schooner scallywag dance the hempen jig
                carouser broadside cable strike colors. Bring a spring upon her
                cable holystone blow the man down spanker Shiver me timbers to
                go on account lookout wherry doubloon chase. Belay yo-ho-ho
                keelhaul squiffy black spot yardarm spyglass sheet transom heave
                to.
              </p>
            </div>
            <div>
              <h3>Teams</h3>
              <p>
                Trysail Sail ho Corsair red ensign hulk smartly boom jib rum
                gangway. Case shot Shiver me timbers gangplank crack Jennys tea
                cup ballast Blimey lee snow crow's nest rutters. Fluke jib
                scourge of the seven seas boatswain schooner gaff booty Jack Tar
                transom spirits.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="homeFooter">
        <Footer />
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
