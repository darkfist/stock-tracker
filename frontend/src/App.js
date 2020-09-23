import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import CompaniesList from "./components/companies-list.component";
import AddCompany from "./components/add-company.component";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <br />
        <Route path="/" exact component={CompaniesList} />
        <Route path="/add-company" component={AddCompany} />
      </Router>
    </div>
  );
}

export default App;
