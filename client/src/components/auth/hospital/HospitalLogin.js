import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PatientDashboard from "../../dashboards/patientDashboard/PatientDashboard";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class HospitalLogin extends Component {
  componentDidMount() {
    setInterval(
      () =>
        this.setState({
          incorrectEmail: false,
          incorrectPassword: false,
          hospitalEmailEmpty: false,
          hospitalPasswordEmpty: false,
        }),
      7000
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      incorrectEmail: false,
      incorrectPassword: false,
      hospitalEmailEmpty: false,
      hospitalPasswordEmpty: false,
      loader: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if (!(this.state.email.length && this.state.password.length)) {
      if (!this.state.email.length) this.setState({ hospitalEmailEmpty: true });
      if (!this.state.password.length)
        this.setState({ hospitalPasswordEmpty: true });
    } else {
      this.setState({ loader: true });
      let hospitalLogin = {
        hEmail: this.state.email,
        hPassword: this.state.password,
      };
      axios({
        url: "http://localhost:5000/api/auth/login/hospital",
        method: "post",
        data: hospitalLogin,
      })
        .then((res) => {
          this.setState({ loader: false });
          if (
            res.data.hospitalNotRegistered === "Your hospital is not registered"
          )
            this.setState({
              incorrectEmail: true,
              incorrectPassword: false,
              hospitalEmailEmpty: false,
              hospitalPasswordEmpty: false,
            });
          else if (
            res.data.passwordIncorrect === "Your hospital password is incorrect"
          )
            this.setState({
              incorrectEmail: false,
              incorrectPassword: true,
              hospitalEmailEmpty: false,
              hospitalPasswordEmpty: false,
            });
          else {
            localStorage.setItem("hospital", res.data.token);
            this.props.history.push("/hospitalDashboard");
          }
        })
        .catch((err) => console.log(err));
    }
  }
  render() {
    if (this.state.loader)
      return (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "400px",
          }}
        >
          <CircularProgress />
        </div>
      );
    let cmp;
    if (localStorage.getItem("patient")) cmp = <PatientDashboard />;
    else
      cmp = (
        <div className="mt-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4 className="font-weight-bolder text-center text-uppercase">
                  <span className="hle mr-3">
                    <i className="fa fa-sign-in mr-4" aria-hidden="true"></i>
                    login here
                  </span>{" "}
                  <br />
                  <br />
                  <span className="lead">for the hospitals/clinics</span>
                </h4>
              </div>
            </div>
            <form
              className="p-5 mt-5 hlfm border rounded"
              onSubmit={this.onSubmit}
            >
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  Hospital/Clinic's Registered Email
                </label>
                <input
                  type="email"
                  className={
                    this.state.incorrectEmail || this.state.hospitalEmailEmpty
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="email"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <p className="text-danger mt-3">
                  {this.state.incorrectEmail
                    ? "Sorry Your hospital/clinic is not registered."
                    : ""}
                </p>
                <p className="text-danger mt-3">
                  {this.state.hospitalEmailEmpty
                    ? "Please enter your hospital/clinic email."
                    : ""}
                </p>
              </div>
              <div className="form-group my-5">
                <label htmlFor="exampleInputPassword1">
                  Hospital/Clinic's Password
                </label>
                <input
                  type="password"
                  className={
                    this.state.incorrectPassword ||
                    this.state.hospitalPasswordEmpty
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="password"
                  id="exampleInputPassword1"
                  placeholder="Enter Password"
                  onChange={this.onChange}
                  value={this.state.password}
                />
                <p className="text-danger mt-3">
                  {this.state.incorrectPassword
                    ? "Sorry You entered wrong password."
                    : ""}
                </p>
                <p className="text-danger mt-3">
                  {this.state.hospitalPasswordEmpty
                    ? "Please enter your hospital/clinic password."
                    : ""}
                </p>
              </div>
              <button
                type="submit"
                className="mt-5 btn btn-block edibt rounded-0"
              >
                Login Here{" "}
                <i className="fa fa-sign-in ml-2" aria-hidden="true"></i>
              </button>
            </form>
            <h6 className="text-center text-muted mr-2 my-4">
              Not registered yet ?
              <Link to="/hospitalRegister"> Register Here !</Link>
            </h6>
          </div>
        </div>
      );
    return <div>{cmp}</div>;
  }
}