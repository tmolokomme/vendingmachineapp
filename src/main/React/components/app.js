
import React, { Component } from 'react';

import Navbar from './navbar'
import DisplayPanel from './display-panel'
import BeverageList from './beverage-list'

class App extends Component {

    constructor(...props) {
        super(...props);
    }

    render() {
        return (
            <div className="container-fluid">
                <Navbar/>
                <DisplayPanel/>
                <BeverageList />
            </div>
        );
    }
}

export default App;
