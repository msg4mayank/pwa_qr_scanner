import React, { Component } from "react";
import { Toast } from "react-bootstrap";
class PepToast extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false, style: {} };
  }
  componentWillReceiveProps = nextProp => {
    if (nextProp.show) {
      this.setState({ style: nextProp.style });
      setTimeout(() => {
        let st = Object.assign({}, this.state.style);
        st.bottom = "-100%";
        this.setState({ style: st });
      }, 5000);
    }
  };
  componentDidMount = () => { };

  render() {
    return (
      <Toast
        style={this.props.style}
        onClose={this.props.toggleToastShow}
        animation={true}
      >
        <Toast.Header>Alert</Toast.Header>
        <Toast.Body>Data Sent Successfuly</Toast.Body>
      </Toast>
    );
  }
}
export default PepToast;
