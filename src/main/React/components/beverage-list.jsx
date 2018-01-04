import React, { Component } from 'react';
import Beverage from './beverage'

import * as fetchBeverages from '../actions';
import { connect } from 'react-redux';

class BeverageList extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            beverageList: []
        }
        this.parentFunctionHandler = this.parentFunctionHandler.bind(this);
    }

    componentWillMount() {
        //console.debug('[ ------: componentWillMount( 1 ) ');
        this.props.fetchBeverages();
    }

    componentWillReceiveProps(nextProps) {
        //console.debug('[ ------: componentWillReceiveProps( 2 ) ');
        this.setState({
            beverageList: nextProps.beverages
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        //console.debug('[ ------: shouldComponentUpdate( 3 ) ');
        return true;
    }

    parentFunctionHandler(item) {
        // receive selected item from child component (beverage)
        // console.debug(item);
    }

    render() {
        let rows = [];
        // beverage injected from 'Content' component
        this.state.beverageList.forEach(beverage => {
            // create child beverage components, and bind this parent method (parentFunctionHandler)
            // so that we can call it from the child items
            rows.push(
                <Beverage
                    beverage={beverage}
                    key={beverage.name}
                    parentFunction={this.parentFunctionHandler}
                />
            );
        });

        return (
            <div className="container-fluid">
              <div className="row">
                  {rows}
              </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // what ever is returned from here will
    // be available to any subscriber as part
    // of the props object
    return {
        beverages: state.beverages.data,
    }
}

//function dispatchToProps(dispatch) {}

export default connect(mapStateToProps, fetchBeverages)(BeverageList);



