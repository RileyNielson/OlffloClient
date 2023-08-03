import * as React from "react";
import Layout from "../pages/layout";
import Home from "../pages/home";
import NoPage from "../pages/nopage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import OlffloApp from "../pages/olffloApp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="olffloApp" element={<OlffloApp />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
