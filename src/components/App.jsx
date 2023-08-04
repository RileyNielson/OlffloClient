import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../pages/layout";
import Home from "../pages/home";
import NoPage from "../pages/nopage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OlffloApp from "../pages/olffloApp";
import Login from "../pages/login";
import RecordList from "../components/recordList";
import Edit from "../components/edit";
import Create from "../components/create";

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home loggedIn={user !== null ? true: false} setUser={setUser}/>} />
          <Route path="login" element={<Login setUser={setUser} />} />
          <Route path="olffloApp" element={<OlffloApp />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        {/* <Route exact path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
