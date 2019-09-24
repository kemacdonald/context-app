
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import CodingList from "./components/coding-list.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={CodingList} />
        <Route path="/create_coding_block" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;