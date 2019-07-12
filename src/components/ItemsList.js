import React, { Component } from "react";
import cart1 from '../images/img0.png'

class ItemsList extends Component {
    state = {
        scanData:''
    }
    componentDidMount(){}
    componentWillReceiveProps(nextProps) {
        if(nextProps.scanData !== this.props.scanData){
            console.log('nextProps updated', nextProps)
            this.setState({
                scanData: nextProps.scanData
            })
        }
    }
    handleData = ()=> {
        alert('sdf')
    }
    render() {
        return(
            <React.Fragment>
                {/* <h3 className="hdr">Self ID:  <span>7</span> Pusher ID: <span> 3</span></h3> */}
                <h3 className="hdr"><span>{this.state.scanData}</span></h3>
                <ul className="list-unstyled">
                    <li className="media" onClick={this.handleData}>
                        <img src={cart1} className="mr-3" alt="..."/>
                        <div className="media-body">
                        <h5 className="mt-0 mb-1">List-based media object</h5>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                    </li>
                    <li className="media">
                        <img src={cart1} className="mr-3" alt="..."/>
                        <div className="media-body">
                        <h5 className="mt-0 mb-1">List-based media object</h5>
                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </div>
                    </li>
                </ul>
            </React.Fragment>
        )
    }
}

export default ItemsList;