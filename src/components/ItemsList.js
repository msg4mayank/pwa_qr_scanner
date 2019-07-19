import React, { Component } from "react";
import imageConf from "../data/image-conf";

import PepToast from "./PepToast";
import axios from "axios";

class ItemsList extends Component {
  state = {
    toastShow: false,
    style: {
      opacity: 1,
      background: "#4cad10",
      position: "fixed",
      margin: "auto",
      bottom: "-100%",
      left: 0,
      right: 0,
      transition: "0.3s all",
      color: "#fff"
    },
    scanData: "",
    items: imageConf,
    selectedItem: "",
    currentItemIndex: null
  };

  componentDidMount() {
    this.setState({
      scanData: this.props.scanData
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.scanData !== this.props.scanData) {
      this.setState({
        scanData: nextProps.scanData
      });
    }
  }
  handleData(item, index) {
    this.setState({ toastShow: false });
    const skuId = this.state.scanData.replace(":", "");
    this.setState({
      selectedItem: `{"data":"sku:${skuId}:${item.imgName}"}`,
      currentItemIndex: index
    });
  }
  handleClick = () => {
    console.log("this.state.selectedItem", this.state.selectedItem);
    const url =
      window.location.href.indexOf("https") > -1
        ? "https://qrscan-app.azurewebsites.net/"
        : "http://qrscan-app.azurewebsites.net/";
    axios
      .post(url, this.state.selectedItem)
      .then(response => {
        console.log("response ", response);
        let st = Object.assign({}, this.state.style);
        st.bottom = "0";
        this.setState({ style: st });
      })
      .catch(error => {
        let st = Object.assign({}, this.state.style);
        st.bottom = "-100%";
        this.setState({ style: st });
      });
  };
  render() {
    const { scanData } = this.state;
    const data = scanData.split(":");
    let selfId = data[0];
    let pusherId = data[1];

    return (
      <React.Fragment>
        <h3 className="hdr">
          Self ID: <span>{selfId}</span> Pusher ID: <span> {pusherId}</span>
        </h3>
        <ul className="list-unstyled">
          {this.state.items.map((item, i) => (
            <li
              className="media"
              onClick={() => this.handleData(item, i)}
              key={i}
            >
              <img src={item.imgUrl} className="mr-3" alt={item.imgTitle} />
              <div className="media-body">
                <h5 className="mt-0 mb-1">{item.title}</h5>
                {item.detail}
              </div>
              {this.state.currentItemIndex === i && (
                <i className="fa fa-check" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>
        <button
          className={"btn btn-primary btn-lg btn-save"}
          onClick={this.handleClick}
          disabled={this.state.selectedItem === "" ? true : false}
        >
          Save
        </button>
        <PepToast
          toggleToastShow={() => {
            let st = Object.assign({}, this.state.style);
            st.bottom = "-100%";
            this.setState({ style: st });
          }}
          style={this.state.style}
        />
      </React.Fragment>
    );
  }
}

export default ItemsList;
