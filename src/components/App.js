import React, { Component } from "react";
import QrReader from 'react-qr-scanner';

import ItemsList from "./ItemsList";


import Home from './Home';
import ScanProduct from './ScanProduct';

class App extends Component {

  handerCamera () {
    this.props.history.push('/scanproduct');
  }


  render() {
    return (
      <div className="full-height d-flex">
        <button className="btn btn-primary btn-lg" onClick={() => this.handerCamera()}>
          Scan to Associate
        </button>
      </div>
    )
  }
}

export default App;
