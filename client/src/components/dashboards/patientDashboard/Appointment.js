import React, { Component } from "react";
import axios from "axios";
import Auth0Lock from "auth0-lock";

const clientId = require("../../config").ci,
  domain = require("../../config").cd;

export default class Appointment extends Component {
  render() {
    let cmp;
    if (localStorage.getItem("patient")) cmp = <Rat mh={this.props.history} />;
    else this.props.history.push("/");
    return <div>{cmp}</div>;
  }
}

class Rat extends Component {
  componentDidMount() {
    axios({
      url: "http://localhost:5000/api/appointment/locdom",
    })
      .then((res) =>
        this.setState({ domai: res.data.dom, locatio: res.data.loc })
      )
      .catch((err) => console.log(err));
  }
  constructor(props) {
    super(props);
    this.state = {
      domai: [],
      locatio: [],
      doctors: [],
      location: "",
      domain: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onClick(id) {
    this.lock = new Auth0Lock(clientId, domain);
    this.lock.getUserInfo(localStorage.getItem("patient"), (err, profile) => {
      if (err) throw err;
      else {
        axios({
          url: `http://localhost:5000/api/appointment/book-${id}-${profile.email}`,
        })
          .then((res) => {
            if (
              res.data.appointmentSuccess === "Appointment Placed Successfully"
            )
              console.log("Check your email for details");
          })
          .catch((err) => console.log(err));
      }
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    axios({
      url: "http://localhost:5000/api/appointment/docs",
      method: "post",
      data: {
        loc: this.state.location,
        dom: this.state.domain,
      },
    })
      .then((res) => this.setState({ doctors: res.data.dol }))
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="font-weight-bolder text-center text-uppercase">
                <span className="hre mr-3">
                  <i
                    className="fa fa-list-alt mt-3 mr-3 bhabi animated bounce"
                    aria-hidden="true"
                  ></i>
                  book an appointment
                </span>{" "}
                <br />
                <br />
                <span className="lead">with doctor and get your token</span>
              </h4>
            </div>
          </div>
          <form
            className="p-5 mt-5 hlfm border rounded"
            onSubmit={this.onSubmit}
          >
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Choose the location of hospital/clinic
              </label>
              <select
                name="location"
                className="w-75"
                id="exampleInputEmail1"
                value={this.state.location}
                onChange={this.onChange}
              >
                <option value="">Select the option</option>
                {this.state.locatio.map((a, i) => (
                  <option value={a} key={i}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group my-5">
              <label htmlFor="exampleInputPassword1">
                Choose domain of your consultation
              </label>
              <select
                name="domain"
                className="w-75"
                id="exampleInputPassword1"
                value={this.state.domain}
                onChange={this.onChange}
              >
                <option value="">Select the option</option>
                {this.state.domai.map((a, i) => (
                  <option value={a} key={i}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-5 btn btn-block edrgt rounded-0"
            >
              Search <i className="fa fa-search ml-2" aria-hidden="true"></i>
            </button>
          </form>
          {this.state.doctors.map((a, i) => (
            <div className="row border pt-2 my-5 shadow rounded" key={i}>
              <div className="col-md-6 text-center">
                <img
                  src={a.img}
                  alt="Unavailable"
                  width="250"
                  height="250"
                  className="img-fluid rounded-circle mt-3"
                />
              </div>
              <div className="col-md-6 my-5 lead d-block d-md-none text-center">
                {`Name : ${a.name}`}
                <br />
                <br />
                {`Id : ${a._id}`}
              </div>
              <div className="col-md-6 my-5 lead d-none d-md-block">
                {`Name : ${a.name}`}
                <br />
                <br />
                {`Id : ${a._id}`}
              </div>
              <div
                className="col-12 d-flex justify-content-between mt-4 pt-4 px-5"
                style={{ background: "#e9ecef" }}
              >
                <h6 className="text-uppercase">
                  token :
                  <span className="ml-2 crdes bg-info text-light p-2">
                    {a.currentToken}
                  </span>
                </h6>
                <button
                  className={
                    a.status === "Active" ? "btn btn-primary mb-4" : "d-none"
                  }
                  onClick={this.onClick(a._id)}
                >
                  Get An Appointment
                </button>
                <p className="">
                  Status :
                  <span
                    className={
                      a.status === "Active"
                        ? "ml-2 crdes bg-success text-light p-2"
                        : "ml-2 crdes bg-danger text-light p-2"
                    }
                  >
                    {a.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}