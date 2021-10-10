import React, { Component } from "react";
import Auth0Lock from "auth0-lock";
import { Link } from "react-router-dom";

const clientId = require("../../config").ci,
  domain = require("../../config").cd;

export default class PatientDashboard extends Component {
  render() {
    let cmp;
    if (localStorage.getItem("patient")) cmp = <Pat />;
    else this.props.history.push("/");
    return <div>{cmp}</div>;
  }
}

class Pat extends Component {
  componentDidMount() {
    this.lock = new Auth0Lock(clientId, domain);
    this.lock.getUserInfo(localStorage.getItem("patient"), (err, profile) => {
      if (err) throw err;
      this.setState({ name: profile.name, pic: profile.picture });
    });
  }
  constructor(props) {
    super(props);
    this.state = { name: "", pic: "" };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    localStorage.removeItem("patient");
  }
  render() {
    return (
      <div className="pt-5 tlef">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <img
                src={this.state.pic}
                alt="Unavailable"
                width="275"
                height="250"
                className="img-fluid d-block mx-auto rounded-circle"
              />
              <h5 className="mt-3 font-weight-bolder text-uppercase text-center">
                {this.state.name}
              </h5>
              <h5
                className="mt-3 mb-5 rounded-pill py-2 d-block mx-auto bg-success text-light text-center"
                style={{ width: "120px", fontFamily: "'Tinos', serif" }}
              >
                <i className="fa fa-check" aria-hidden="true"></i> Verified
              </h5>
            </div>
            <div className="col-md-6 text-center mb-5">
              <div
                className="card d-block mx-auto"
                style={{ maxWidth: "18rem" }}
              >
                <div className="card-header">
                  <Link to="/appointments">
                    <i
                      className="fa fa-list-alt mt-3 bhabi"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
                <div className="card-body p-4">
                  <h5 className="card-title ban font-weight-bolder text-uppercase my-3">
                    Book an appointment
                  </h5>
                  <p className="card-text tap my-3">
                    In order to book an appointment tap the above icon.
                  </p>
                  <Link
                    to="/"
                    onClick={this.onClick}
                    className="btn text-uppercase btn-block btn-outline-danger"
                  >
                    LogOut{" "}
                    <i className="fa fa-sign-out ml-2" aria-hidden="true"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}