import React, { useEffect, useState } from "react";
import homePics from "./homePics";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useNavigate } from "react-router-dom";

function LoggedInHome(props) {
  const [arrowDisable, setArrowDisable] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);
  const navigate = useNavigate();

  function goToApp(projTitle) {
    navigate("/olffloApp");
  }

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
      } else if (
        element.scrollLeft >=
        element.scrollWidth - element.clientWidth
      ) {
        setArrowDisable(true);
        document.getElementById("leftArrow").classList.remove("disableButton");
        document.getElementById("rightArrow").classList.add("disableButton");
      } else {
        setArrowDisable(false);
        document.getElementById("leftArrow").classList.remove("disableButton");
        document.getElementById("rightArrow").classList.remove("disableButton");
      }
    }, 5);
  }
  return (
    <div id="homeBody">
      <div id="homeTitle">
        <h1>Welcome {props.user.userName}</h1>
      </div>
      <h3>Choose a project:</h3>
      <div id="homeCarousel">
        <div
          id="leftArrow"
          className="carouselButton leftButton disableButton"
          onClick={() => {
            handleHorizontalScroll(document.getElementById("carousel"), -10);
          }}
        >
          <ArrowCircleLeftIcon fontSize="large" />
        </div>
        <div id="carousel">
          {props.user.projects.map((proj) => (
            <div
              className="homePic"
              style={{ backgroundColor: proj.color }}
              onClick={() => {goToApp(proj.title)}}
            >
              {proj.title}
            </div>
          ))}
          <div
            className="homePic"
            style={{ backgroundColor: "white" }}
            onClick={() => {goToApp("New Project")}}
          >
            Start New Project...
          </div>
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
    </div>
  );
}

export default LoggedInHome;
