import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

export default class AddCredit extends Component {
  componentDidMount() {
    axios({
      url: "http://localhost:5000/api/doctor/credits",
      headers: {
        Authorization: localStorage.getItem("hospital"),
      },
    })
      .then((res) => this.setState({ credits: res.data.credits }))
      .catch((err) => console.log(err));
  }
  constructor(props) {
    super(props);
    this.state = {
      credits: 0,
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    localStorage.removeItem("hospital");
  }
  onToken(stripeToken) {
    axios({
      url: "http://localhost:5000/api/doctor/checkout",
      method: "post",
      data: { stripeToken },
      headers: {
        Authorization: localStorage.getItem("hospital"),
      },
    })
      .then((res) => {
        if (res.data.paymentSuccess === "Payment was successful")
          window.location.reload();
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="mt-3 p-4 text-light adc">
        <div className="container">
          <div className="row">
            <div className="col-md-4 d-block d-md-none">
              <h6 className="text-center mt-0 mt-md-2 text-uppercase">
                <span className="mr-3">Credits</span> :
                <span className="ml-4 crdes bg-warning text-dark font-weight-bolder px-2 py-1 shadow-lg">
                  {this.state.credits}
                </span>
              </h6>
            </div>
            <div className="col-md-4 d-none d-md-block">
              <h5 className="text-center mt-0 mt-md-2 text-uppercase">
                <span className="mr-3">Credits</span> :
                <span className="ml-4 crdes bg-warning text-dark font-weight-bolder px-2 py-1 shadow-lg">
                  {this.state.credits}
                </span>
              </h5>
            </div>
            <div className="col-md-4 text-center my-3 my-md-0">
              <StripeCheckout
                stripeKey="pk_test_i2jHlXfB1sFtyWyyc3Nhpg4x00QNgT3DUd"
                token={this.onToken}
                name="Add Credits To Dashboard"
                description="Pay online with card"
                panelLabel="Pay 10$"
                image="./images/download.jpg"
              >
                <button className="btn adcbt btn-block font-weight-bolder text-uppercase shadow-lg">
                  Add Credits{" "}
                  <i className="fa fa-usd ml-1" aria-hidden="true"></i>
                </button>
              </StripeCheckout>
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <Link
                to="/hospitalLogin"
                onClick={this.onClick}
                className="btn btn-warning rounded text-center text-uppercase mt-0 ml-md-3 mt-md-1"
              >
                logout
                <i className="fa fa-sign-out ml-2" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}