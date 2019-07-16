import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { basename } from "./config";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

/* // Import Font Awesome Icons Set */
import 'font-awesome/css/font-awesome.min.css';
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";

import ScanProduct from './components/ScanProduct';




const renderApp = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12">
        <Router>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/scanproduct" component={ScanProduct}/>
          </Switch>
        </Router>
      </div>
    </div>
  </div>
);
ReactDOM.render(renderApp(), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
