import React, { Component } from "react";


class Home extends Component {
    state = {
        scanData: '',
        items: [
            { sku: '11', imgUrl: '/images/img0.png', imgTitle: '', imgName: 'img0.png', title: 'List-based media 1', detail: 'Cras sit amet nibh libero. Nulla vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.' },
            { sku: '12', imgUrl: '/images/img1.png', imgTitle: '', imgName: 'img1.png', title: 'List-based media 2', detail: 'Cras sit amet nibh libero. Nulla vulputate at, tempus viverra turpis.' }
        ],
        selectedItem: '',
        currentItemIndex: null

    }

    render() {
        return (
            <React.Fragment>
                Home
            </React.Fragment>
        )
    }
}

export default Home;