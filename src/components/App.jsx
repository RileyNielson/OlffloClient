import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../pages/layout";
import Home from "../pages/home";
import NoPage from "../pages/nopage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OlffloApp from "../pages/olffloApp";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import RecordList from "../components/recordList";
import Edit from "../components/edit";


function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);

  console.log(user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home loggedIn={user !== null ? true: false} setUser={setUser} user={user} />} />
          <Route path="login" element={<Login setUser={setUser} />} />
          <Route path="signUp" element={<SignUp setUser={setUser} />} />
          <Route path="olffloApp" element={<OlffloApp user={user}/>} />
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
