import React, { Component } from "react";
import img0 from '../images/img0.png';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import axios from 'axios';


class Home extends Component {
    state = {
        scanData:'',
        items: [
            {sku: '11', imgUrl: '/images/img0.png', imgTitle:'', imgName:'img0.png', title: 'List-based media 1', detail: 'Cras sit amet nibh libero. Nulla vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.'},
            {sku: '12', imgUrl: '/images/img1.png', imgTitle:'', imgName:'img1.png', title: 'List-based media 2', detail: 'Cras sit amet nibh libero. Nulla vulputate at, tempus viverra turpis.'}
        ],
        selectedItem:'',
        currentItemIndex: null
        
    }

    componentDidMount(){
        
    }
    componentWillReceiveProps(nextProps) {
        // if(nextProps.scanData !== this.props.scanData){
        //     // console.log('nextProps updated', nextProps)
            
        // }
    }
    
    render() {
        return(
            <React.Fragment>
               Home
            </React.Fragment>
        )
    }
}

export default Home;