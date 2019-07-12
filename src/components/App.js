import React, { Component } from "react";
import QrReader from 'react-qr-scanner';

import ItemsList from "./ItemsList";


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: null,
      isCamraEnable: false,
      items: []
    }

    this.handleScan = this.handleScan.bind(this)
  }

  componentDidMount = () => {

  };

  handleScan(data) {
    if (data) {
      this.setState({
        result: data
      })
    }

  }
  handleError(err) {
    console.error(err)
  }
  handerCamra() {
    this.setState({
      isCamraEnable: true
    })
  }

  render() {
    /* const previewStyle = {
      height: 100,
      width: 320,
    } */
    return (
      <div className="container-fluid bg-color">
        <div className="row-fluid">
          <div className="col-12">
            {!this.state.result && (
              <div className="device-container">
                <h2>SCAN you bar code</h2>
                <div className="camra-section">
                  {this.state.isCamraEnable && (
                    <QrReader
                      delay={this.state.delay}
                      onError={this.handleError}
                      onScan={this.handleScan}
                    />
                  )}
                </div>
                <button className="btn btn-warning btn-lg" onClick={() => this.handerCamra()}>
                  {this.state.isCamraEnable ? 'Scan Me' : 'Scan QR Code'}
                </button>
              </div>
            )}
            
            {this.state.result && (
            <div className="products-cotainer">
              <ItemsList scanData={this.state.result}></ItemsList>
            </div>
            )}
          </div>
        </div>
        {/* <QrReader
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
            />
            <h1>{this.state.result}</h1> */}
      </div>
    );
  }
}

export default App;
