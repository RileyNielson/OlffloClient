import React, { useEffect, useRef, useState } from "react";
import homePics from "./homePics";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

function NotLoggedInHome() {
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const [firstTime, setFirstTime] = useState(true);

  useEffect(() => {
    if (firstTime) {
      const carouselElement = document.getElementById("carousel");
      carouselElement.scrollLeft =
        (carouselElement.scrollWidth - carouselElement.offsetWidth) / 2;
      setScrollPos(carouselElement.scrollLeft);
      setFirstTime(false);
    }
  });

  function handleHorizontalScroll(element, step) {
    let scrollAmount = 150;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      setScrollPos(element.scrollLeft);
      scrollAmount += Math.abs(step);
      if (scrollAmount >= element.offsetWidth) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft <= 0) {
        setArrowDisable(true);
        document.getElementById("leftArrow").classList.add("disableButton");
        document.getElementById("rightArrow").classList.remove("disableButton");
      } else if (element.scrollLeft >= element.scrollWidth - element.clientWidth){
        setArrowDisable(true);
        document.getElementById("leftArrow").classList.remove("disableButton");
        document.getElementById("rightArrow").classList.add("disableButton");
      } else{
        setArrowDisable(false);
        document.getElementById("leftArrow").classList.remove("disableButton");
        document.getElementById("rightArrow").classList.remove("disableButton");
      }
    }, 5);
  }

  return (
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
      <div id="homeCarousel">
        <div
          id="leftArrow"
          className="carouselButton leftButton"
          onClick={() => {
            handleHorizontalScroll(document.getElementById("carousel"), -10);
          }}
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </div>
        <div id="carousel">
          {homePics.map((pic) => (
            <div className="homePic" style={{ backgroundColor: pic.color }}>
              {pic.title}
            </div>
          ))}
        </div>
        <div
          id="rightArrow"
          className="carouselButton rightButton"
          onClick={() => {
            handleHorizontalScroll(document.getElementById("carousel"), 10);
          }}
        >
          <ArrowCircleRightIcon fontSize="large" />
        </div>
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
              cable holystone blow the man down spanker Shiver me timbers to go
              on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul
              squiffy black spot yardarm spyglass sheet transom heave to.
            </p>
          </div>
          <div>
            <h3>Teams</h3>
            <p>
              Trysail Sail ho Corsair red ensign hulk smartly boom jib rum
              gangway. Case shot Shiver me timbers gangplank crack Jennys tea
              cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge
              of the seven seas boatswain schooner gaff booty Jack Tar transom
              spirits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotLoggedInHome;
