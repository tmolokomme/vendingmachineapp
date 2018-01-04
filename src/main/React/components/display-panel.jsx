import React, {Component} from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert2'
import * as actions from '../actions';

var spacer = { marginTop: "5px", marginBottom: "5px" };

var style1 = { height: "300px" }; // style="background-image: url('https://mdbootstrap.com/img/Photos/Horizontal/Work/6-col/img%20(41).jpg');"
var style2 = { height: "300px" }; // style="background-image: url('https://mdbootstrap.com/img/Photos/Horizontal/Work/6-col/img%20(14).jpg');"

class DisplayPanel extends Component {

    constructor(...props) {
        super(...props);
        this.state = {
            selectedBeverage: {},
            enableButtons: false,
            timeout: 3,
            notes: 0,
            coins: 0,
            stateFlag: false,
            hasErrors: false
        };
        this.handlePayment = this.handlePayment.bind(this);
        this.cancelTransaction = this.cancelTransaction.bind(this);

    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, info);
    }

    componentWillReceiveProps(nextProps) {

        // console.debug('nextProps.selectedBeverage ', nextProps.selectedBeverage);
        // console.debug('this.state.selectedBeverage ', this.state.selectedBeverage);
        // console.debug('------ ', nextProps.userAmount);
        // console.debug('------ ', nextProps.selectedBeverage.quantity);
        // console.debug('------ ', this.state.selectedBeverage.quantity);

        if (!Object.keys(nextProps.selectedBeverage).length == 0) {
            this.setState({
                enableButtons: true,
                selectedBeverage: nextProps.selectedBeverage
            });
        }

        if (nextProps.selectedBeverage.name === this.state.selectedBeverage.name
            && nextProps.userAmount === 0) {
            this.setState({
                enableButtons: false,
                selectedBeverage: {}
            });
        }

    }

    addStateAmount(received_amount) {
        received_amount += this.props.userAmount;
        return received_amount;
    }

    cancelTransaction(event) {

        var amount = this.props.userAmount;
        var received_amount = parseFloat(amount);
        console.debug('[ == cancelling transaction...  ' + received_amount + " amt string: " + amount);
        if (received_amount != null && received_amount > 0) {
            swal({
                title: 'Transaction Cancelled!',
                text: 'Dispatching a refund of: R ' + parseFloat(received_amount).toFixed(2) + ' !',
                timer: 5000,
                onOpen: () => {
                    swal.showLoading()
                }
            }).then((result) => {
                if (result.dismiss === 'timer') {
                    console.debug('Closed window after the change was dispatched.')
                }
            });
        }

        this.setState({
            enableButtons: false,
            selectedBeverage: {}
        });
        this.props.reset({
            userAmount: 0,
            message: '',
            selected: {}
        });

    }

    handlePayment(event) {

        event.preventDefault();
        var amount = this.extractAmount(event.target.innerHTML);

        var required_amount = parseFloat(this.props.selectedBeverage.price);
        var received_amount = parseFloat(amount);

        console.debug('[ == required: ', required_amount);
        console.debug('[ == received: ', received_amount);

        var totalIncludingState = this.addStateAmount(received_amount);

        if (totalIncludingState >= required_amount) {

            this.props.acceptPayment(totalIncludingState);

            let change = totalIncludingState - required_amount;

            console.debug('[ ** received: ', totalIncludingState);
            console.debug('[ ** change: ', change);

            swal({
                title: 'Transaction Complete!',
                html: "Your change for credit of: <b>R "+parseFloat(totalIncludingState).toFixed(2)+"</b> is being processed.",
                type: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok!'
            }).then(() => {
                    swal(
                        'Cleared!',
                        'Change: R ' + parseFloat(change).toFixed(2) + ' dispatched.',
                        'success'
                    )
            });

            // invoke api to deduct a product item from the total quantity
            this.props.deductProduct(this.props.selectedBeverage);

            this.props.reset({
                userAmount: 0,
                message: '',
                selected: {}
            });

        } else {
            this.props.acceptPayment(received_amount);
            // alert message
            const msg = 'Insufficient payment for selection [' + this.props.selectedBeverage.name + ' - Price: R' + parseFloat(this.props.selectedBeverage.price).toFixed(2) + '], Please add more notes or coins.';
            this.props.updateDisplay(msg);
        }
    }

    extractAmount(string) {
        if (string === '50c') {
            return 0.5;
        } else {
            return string.replace(/^\D+/g, '');
        }
    }

    render() {

        return (
            <div>
                <div style={spacer}> &nbsp; </div>
                <div className="card card-body">

                    <div className="col-md-12">

                        <ul className="nav md-pills pills-default d-flex justify-content-center">
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#panel11" role="tab"><h5>{this.props.message}</h5></a>
                            </li>
                        </ul>

                        <div className="tab-content mb-1">

                            <div className="tab-pane fade  show active" id="panel11" role="tabpanel">

                                <div className="row">

                                    <div className="col-md-12">

                                        <section className="section mb-1">

                                            <div className="row">

                                                <div className="col-md-6 mb-r">
                                                    <div className="card card-image unique-color" style={style1}>

                                                        <div className="text-white text-left d-flex align-items-left py-5 px-4">
                                                            <div className="align-items-left">
                                                                <h4 className="mb-4 mt-4 font-bold">Credit: R <span>{parseFloat(this.props.userAmount).toFixed(2)}</span></h4>
                                                                <button className="btn btn-md info-color" disabled={!this.state.enableButtons} onClick={this.handlePayment}>R 50</button>
                                                                <button className="btn btn-md info-color" disabled={!this.state.enableButtons} onClick={this.handlePayment}>R 20</button>
                                                                <button className="btn btn-md info-color" disabled={!this.state.enableButtons} onClick={this.handlePayment}>R 10</button>
                                                                <br/>
                                                                <button className="btn btn-md info-color" disabled={!this.state.enableButtons} onClick={this.handlePayment}>R 5</button>
                                                                <button className="btn btn-md info-color" disabled={!this.state.enableButtons} onClick={this.handlePayment}>R 2</button>
                                                                <button className="btn btn-md info-color" disabled={!this.state.enableButtons} onClick={this.handlePayment}>R 1</button>
                                                                <button className="btn btn-md info-color" disabled={!this.state.enableButtons} onClick={this.handlePayment}>50c</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6 mb-r">
                                                    <div className="card card-image unique-color" style={style2}>

                                                        <div className="text-white text-left d-flex py-6 px-4">
                                                            <div>
                                                                {Object.keys(this.state.selectedBeverage).length > 0 ? (
                                                                    <div>
                                                                        <p>Selected Product:</p>
                                                                        <div className="row">
                                                                            <div className="col mt-4">
                                                                                <h4 className="mb-4 mt-4 font-bold">{this.state.selectedBeverage.name} {this.state.selectedBeverage.size}</h4>
                                                                                <img className="img-fluid" src={"ui/img/custom/" + this.state.selectedBeverage.image} width={this.state.selectedBeverage.w} height={this.state.selectedBeverage.h} alt="Card cap"/>
                                                                                <p>R {parseFloat(this.state.selectedBeverage.price).toFixed(2)}</p>
                                                                            </div>
                                                                            <div className="col">
                                                                                <button className="btn info-color align-bottom" onClick={this.cancelTransaction}>Cancel</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    ) : (
                                                                        <div>
                                                                            <h4 className="mb-4 mt-4 font-bold">Nothing Selected</h4>
                                                                            <p>{this.props.message}</p>
                                                                        </div>
                                                                    )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                        </section>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //console.debug('displayPanel.getState:', state);
    return {
        selectedBeverage: state.beverages.selected,
        message: state.beverages.message,
        userAmount: state.beverages.userAmount,
        stateFlag: true
    }
}

function dispatchToProps(dispatch) {}

export default connect(mapStateToProps, actions)(DisplayPanel);
