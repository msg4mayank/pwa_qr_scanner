import React, { Component } from "react";
import { default as QrReader } from "react-qr-reader";
import ItemsList from "./ItemsList";

class ScanProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 100,
      result: null,
      items: [],
      cameraFlip: false,
      cameraOption: "environment",
      userAgent: "all"
    };

    this.handleScan = this.handleScan.bind(this);
  }
  componentDidMount = () => {
    if (navigator.userAgent.indexOf("Safari") != -1 && (navigator.platform.indexOf("iPhone") != -1 || navigator.platform.indexOf("iPad") != -1 || navigator.platform.indexOf("iPod") != -1)) {
      this.setState({ userAgent: "safari" });
    }
    else {
      this.setState({ userAgent: "all" });
    }
  }

  handleScan(data) {
    if (data) {
      this.setState({
        result: data
      });
    }
  }
  handleError(err) {
    console.error(err);
  }
  handleCameraFlip = e => {
    console.log("Flip Started", this.state.cameraFlip);
    e.preventDefault();
    this.setState({
      cameraFlip: !this.state.cameraFlip
    });
    this.setState({
      cameraOption: this.state.cameraFlip ? "user" : "environment"
    });
  };

  render() {
    return (
      <div className="container-fluid bg-color">
        <div className="row-fluid">
          <div className="col-12">
            {!this.state.result && (
              <div className="device-container">
                <div className="camra-section">
                  <QrReader
                    style={{ maxHeight: "500px" }}
                    delay={this.state.delay}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    facingMode={this.state.cameraOption}
                  />
                </div>
                {this.state.userAgent === "all" && <div className="d-flex align-items-center">
                  <button
                    className="btn btn-primary btn-lg inherit-clr"
                    onClick={e => this.handleCameraFlip(e)}
                  >
                    <i className="fa fa-camera" aria-hidden="true" />
                  </button>
                </div>}
              </div>
            )}

            {this.state.result && (
              <div className="products-cotainer">
                <ItemsList scanData={this.state.result} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ScanProduct;
