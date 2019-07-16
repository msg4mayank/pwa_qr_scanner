import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';

import ItemsList from "./ItemsList";

class ScanProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            delay: 100,
            result: null,
            items: [],
            cameraFlip: false,
            cameraOption: 'front'
        }
        this.handleScan = this.handleScan.bind(this);
    }

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
    handleCameraFlip = (e) => {
        e.preventDefault();
        this.setState({
            cameraFlip: !this.state.cameraFlip
        });
        this.setState({
            cameraOption: (this.state.cameraFlip ? 'front' : 'rear')
        });
    }

    render() {
        return (
            <div className="container-fluid bg-color">
                <div className="row-fluid">
                    <div className="col-12">
                        {!this.state.result && (
                            <div className="device-container">
                                <div className="camra-section">
                                    <QrReader
                                        delay={this.state.delay}
                                        onError={this.handleError}
                                        onScan={this.handleScan}
                                        facingMode={this.state.cameraOption}
                                    />
                                </div>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-primary btn-lg inherit-clr" onClick={(e) => this.handleCameraFlip(e)}>
                                        <i className="fa fa-camera" aria-hidden="true"></i>
                                    </button>
                                </div>

                            </div>
                        )}
                        {this.state.result && (
                            <div className="products-cotainer">
                                <ItemsList scanData={this.state.result}></ItemsList>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
};

export default ScanProduct;