import React, { Component } from "react";
import { Link } from "react-router-dom";
import Auth0Lock from "auth0-lock";

const clientId = require("../config").ci,
  domain = require("../config").cd;

export default class Banner extends Component {
  componentWillMount() {
    this.lock = new Auth0Lock(clientId, domain);
    this.lock.on("authenticated", (res) => {
      this.lock.getUserInfo(res.accessToken, (err, profile) => {
        localStorage.setItem("patient", res.accessToken);
        this.props.mh.push("/patientDashboard");
      });
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
    };
    this.showLock = this.showLock.bind(this);
  }
  showLock() {
    this.lock.show();
  }
  render() {
    return (
      <header>
        <div className="container">
          <div className="row">
            <div className="col-12 mt-0 mt-md-5">
              <h1 className="text-uppercase mt-5 pt-5 bng1">
                waiting for doctor
              </h1>
              <h1 className="text-uppercase bng2 font-weight-bolder">
                is no longer required
              </h1>
            </div>
            <div className="col-12 mt-3">
              <p className="text-muted d-none d-lg-block">
                The bold mission of this web app is to bring an end to the
                <br /> long queue piled up before a doctor thus enhancing his
                productivity
                <br /> and helping the patients save their precious time.
              </p>
            </div>
            <div className="col-12 mt-4 d-none d-lg-block">
              <Link
                to="/hospitalLogin"
                className="btn text-uppercase text-center btn-primary mr-5 px-4 py-2"
              >
                <i className="fa fa-user-md mr-2" aria-hidden="true"></i>Add a
                doctor
              </Link>
              <button
                className="btn text-uppercase text-center btn-success px-4 py-2"
                onClick={this.showLock}
              >
                <i className="fa fa-meetup mr-2" aria-hidden="true"></i>Place an
                appointment
              </button>
            </div>
            <div className="col-12 mt-4 d-block d-lg-none">
              <Link
                to="/hospitalLogin"
                className="btn btn-block idbt2 rounded-0 text-uppercase text-center px-4 py-2"
              >
                <i className="fa fa-user-md mr-2" aria-hidden="true"></i>Add a
                doctor
              </Link>
              <button
                onClick={this.showLock}
                className="btn btn-block idbt3 rounded-0 text-uppercase text-center mt-5 px-4 py-2"
              >
                <i className="fa fa-meetup mr-2" aria-hidden="true"></i>Place an
                appointment
              </button>
            </div>
            <div className="col-12"></div>
          </div>
        </div>
      </header>
    );
  }
}
