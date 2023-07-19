import * as React from "react";
import Header from "./1.Header/header";
import GlowBar from "./1.Header/glowBar";
import MainCanvas from "./4.MainCanvas/mainCanvas";
import Footer from "./5.Footer/footer";

function App() {
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

export default App;
