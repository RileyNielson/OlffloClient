import * as React from "react";
import Header from "../components/1.Header/header";
import GlowBar from "../components/1.Header/glowBar";
import MainCanvas from "../components/2.MainCanvas/mainCanvas";
import Footer from "../components/3.Footer/footer";

function OlffloApp() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="mainContainer">
          <Header />
          <GlowBar />
          <MainCanvas />
          <Footer />
        </div>
      </header>
    </div>
  );
}

export default OlffloApp;
