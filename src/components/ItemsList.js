import React, { Component } from "react";
import img0 from '../images/img0.png'
import img1 from '../images/img1.png'
import img2 from '../images/img2.png'


class ItemsList extends Component {
    state = {
        scanData:'',
        items: [
            {imgUrl: '/images/img0.png', imgTitle:'', title: 'List-based media 1', detail: 'Cras sit amet nibh libero. Nulla vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'},
            {imgUrl: '/images/img1.png', imgTitle:'', title: 'List-based media 2', detail: 'Cras sit amet nibh libero. Nulla vulputate at, tempus viverra turpis.'}
        ]
    }
    componentDidMount(){}
    componentWillReceiveProps(nextProps) {
        console.log('scanData', nextProps)
        this.setState({
            scanData: nextProps.scanData
        })
        if(nextProps.scanData !== this.props.scanData){
            console.log('nextProps updated', nextProps)
            this.setState({
                scanData: nextProps.scanData
            })
        }
    }
    handleData(item) {
        console.log('item', item)
    }
    render() {
        return(
            <React.Fragment>
                {/* <h3 className="hdr">Self ID:  <span>7</span> Pusher ID: <span> 3</span></h3> */}
                <h3 className="hdr"><span>{this.state.scanData}</span></h3>
                <ul className="list-unstyled">
                    {this.state.items.map((item, i)=> (
                        <li className="media" onClick={()=> this.handleData(item)} key={i}>
                            <img src={img0} className="mr-3" alt={item.imgTitle}/>
                            <div className="media-body">
                                <h5 className="mt-0 mb-1">{item.title}</h5>
                                {item.detail}
                                
                            </div>
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </li>
                    ))}
                    

                </ul>
            </React.Fragment>
        )
    }
}

export default ItemsList;