import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import DemoProjects from "./demoProjects";

function NotLoggedInHome(props) {

  const navigate = useNavigate();

  useEffect(() => {
    const carouselElement = document.getElementById("carousel");
    carouselElement.scrollLeft =
      (carouselElement.scrollWidth - carouselElement.offsetWidth) / 2;
  }, []);

  function handleHorizontalScroll(element, step) {
    var scrollAmount = 0;
    var scrollWidth;
    window.innerWidth > 760
      ? (scrollWidth = window.innerWidth / 2)
      : (scrollWidth = 200);
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= scrollWidth) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft <= 0) {
        document.getElementById("leftArrow").classList.add("disableButton");
        document.getElementById("rightArrow").classList.remove("disableButton");
      } else if (
        element.scrollLeft >=
        element.scrollWidth - element.clientWidth
      ) {
        document.getElementById("leftArrow").classList.remove("disableButton");
        document.getElementById("rightArrow").classList.add("disableButton");
      } else {
        document.getElementById("leftArrow").classList.remove("disableButton");
        document.getElementById("rightArrow").classList.remove("disableButton");
      }
    }, 5);
  }

  function handleDemoClick(project) {
    props.setProject(() => {
      navigate("/olffloApp");
      return project;
    });
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
      {/* <Link to="/signUp">
        <button id="signUpButton" type="submit">
          Sign Up
        </button>
      </Link> */}
      <h3 id="demoTitle">Try A Demo</h3>
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
          {DemoProjects.map((pic) => (
            <div
              className="homePic"
              style={{ backgroundColor: "white" }}
              onClick={() => handleDemoClick(pic)}
            >
              <p>{pic.title}</p>
              <div className="homePicDiv">
                <img
                  className="projectThumbnail"
                  src={pic.image}
                  alt={pic.title}
                />
              </div>
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
        <h2 id="subheading">A Project Management Tool For Anyone</h2>
        <div id="features">
          <div>
            {/* <h3>Make</h3> */}
            {/* <p>
              Prow scuttle parrel provost Sail ho shrouds spirits boom
              mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's
              nest nipperkin grog yardarm hempen halter furl. Swab barque
              interloper chantey doubloon starboard grog black jack gangway
              rutters.
            </p> */}
          </div>
          <div>
            {/* <h3>Manage</h3> */}
            {/* <p>
              Deadlights jack lad schooner scallywag dance the hempen jig
              carouser broadside cable strike colors. Bring a spring upon her
              cable holystone blow the man down spanker Shiver me timbers to go
              on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul
              squiffy black spot yardarm spyglass sheet transom heave to.
            </p> */}
          </div>
          <div>
            {/* <h3>Monetize</h3> */}
            {/* <p>
              Trysail Sail ho Corsair red ensign hulk smartly boom jib rum
              gangway. Case shot Shiver me timbers gangplank crack Jennys tea
              cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge
              of the seven seas boatswain schooner gaff booty Jack Tar transom
              spirits.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotLoggedInHome;
