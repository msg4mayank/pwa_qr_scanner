import React, { Component } from "react";
import img0 from "../images/img0.png";
/* import img1 from "../images/img1.png";
import img2 from "../images/img2.png"; */
import PepToast from "./PepToast";
import axios from "axios";

class ItemsList extends Component {
  state = {
    toastShow: false,
    scanData: "",
    items: [
      {
        sku: "11",
        imgUrl: "/images/img0.png",
        imgTitle: "",
        imgName: "img0.png",
        title: "List-based media 1",
        detail:
          "Cras sit amet nibh libero. Nulla vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus."
      },
      {
        sku: "12",
        imgUrl: "/images/img1.png",
        imgTitle: "",
        imgName: "img1.png",
        title: "List-based media 2",
        detail:
          "Cras sit amet nibh libero. Nulla vulputate at, tempus viverra turpis."
      }
    ],
    selectedItem: "",
    currentItemIndex: null
  };

  componentDidMount() {
    this.setState({
      scanData: this.props.scanData
    });
    // console.log('this.props.currentItemIndex scanData',this.props.scanData)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.scanData !== this.props.scanData) {
      // console.log('nextProps updated', nextProps)
      this.setState({
        scanData: nextProps.scanData
      });
    }
  }
  handleData(item, index) {
    // this.setState({
    //     selectedItem: {
    //         scanData : this.state.scanData,
    //         selectedItem: item.title
    //     },
    //     currentItemIndex: index
    // });
    this.setState({ toastShow: false });
    const skuId = this.state.scanData.replace(":", "");
    this.setState({
      selectedItem: `{"data":"sku:${skuId}:${item.imgName}"}`,
      currentItemIndex: index
    });
    // sku:510:Dorites.jpg
  }
  handleClick = () => {
    console.log("this.state.selectedItem", this.state.selectedItem);
    const url = window.location.href.indexOf("https") > 0 ? "https://137.135.79.84:9443" : "http://137.135.79.84:9090"
    axios
      .post(url, this.state.selectedItem)
      .then(response => {
        console.log(response);
        this.setState({ toastShow: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ toastShow: false });
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
              <img src={img0} className="mr-3" alt={item.imgTitle} />
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
        {/* <button className={'btn btn-primary btn-lg btn-save '+(this.state.currentItemIndex >= '0' ? '': 'disabled')} onClick={this.handleClick}>Save</button> */}
        <button
          className={"btn btn-primary btn-lg btn-save"}
          onClick={this.handleClick}
          disabled={this.state.selectedItem === "" ? true : false}
        >
          Save
        </button>
        <PepToast
          toggleToastShow={() => this.setState({ toastShow: false })}
          show={this.state.toastShow}
          style={{
            background: "#4cad10",
            position: "fixed",
            margin: "auto",
            bottom: this.state.toastShow ? "0" : "-100%",
            left: 0,
            right: 0,
            transition: "0.3s all",
            color: "#fff"
          }}
        />
      </React.Fragment>
    );
  }
}

export default ItemsList;
