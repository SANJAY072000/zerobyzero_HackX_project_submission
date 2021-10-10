import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PatientDashboard from "../../dashboards/patientDashboard/PatientDashboard";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class HospitalRegister extends Component {
  componentDidMount() {
    setInterval(
      () =>
        this.setState({
          nEmpty: false,
          eEmpty: false,
          lEmpty: false,
          pEmpty: false,
          cpEmpty: false,
          dnsV: false,
          eV: false,
          pLength: false,
          cpEqual: false,
        }),
      7000
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      location: "",
      password: "",
      cp: "",
      nEmpty: false,
      eEmpty: false,
      lEmpty: false,
      pEmpty: false,
      cpEmpty: false,
      dnsV: false,
      eV: false,
      pLength: false,
      cpEqual: false,
      loader: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    if (e.target.name === "location" || e.target.name === "name")
      this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    else this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    if (
      !(
        this.state.name &&
        this.state.location &&
        this.state.email &&
        this.state.password &&
        this.state.cp
      )
    )
      if (!this.state.name) this.setState({ nEmpty: true });
    if (!this.state.location) this.setState({ lEmpty: true });
    if (!this.state.email) this.setState({ eEmpty: true });
    if (!this.state.password) this.setState({ pEmpty: true });
    if (!this.state.cp) this.setState({ cpEmpty: true });
    else {
      if (this.state.password.length < 8)
        this.setState({
          nEmpty: false,
          eEmpty: false,
          lEmpty: false,
          pEmpty: false,
          cpEmpty: false,
          dnsV: false,
          eV: false,
          pLength: true,
          cpEqual: false,
        });
      else if (this.state.password !== this.state.cp)
        this.setState({
          nEmpty: false,
          eEmpty: false,
          lEmpty: false,
          pEmpty: false,
          cpEmpty: false,
          dnsV: false,
          eV: false,
          pLength: false,
          cpEqual: true,
        });
      else {
        this.setState({ loader: true });
        let hospitalRegister = {
          hName: this.state.name,
          hLocation: this.state.location,
          hEmail: this.state.email,
          hPassword: this.state.password,
        };
        axios({
          method: "post",
          url: "http://localhost:5000/api/auth/register/hospital",
          data: hospitalRegister,
        })
          .then((res) => {
            this.setState({ loader: false });
            if (
              res.data.hospitalAlreadyRegistered ===
              "Your hospital is already registered"
            )
              this.setState({
                nEmpty: false,
                eEmpty: false,
                lEmpty: false,
                pEmpty: false,
                cpEmpty: false,
                dnsV: false,
                eV: true,
                pLength: false,
                cpEqual: false,
              });
            else this.props.history.push("/hospitalLogin");
          })
          .catch((err) => console.log(err));
      }
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
                  <span className="hre mr-3">
                    <i className="fa fa-hospital-o mr-4" aria-hidden="true"></i>
                    register here
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
                  Your Hospital/Clinic Name
                </label>
                <input
                  type="text"
                  className={
                    this.state.nEmpty
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="name"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <p className="text-danger mt-3">
                  {this.state.nEmpty
                    ? "Please enter your hospital/clinic name."
                    : ""}
                </p>
              </div>
              <div className="form-group my-5">
                <label htmlFor="exampleInputEmail2">
                  Your Hospital/Clinic Location
                </label>
                <input
                  type="text"
                  className={
                    this.state.lEmpty
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="location"
                  id="exampleInputEmail2"
                  aria-describedby="emailHelp"
                  placeholder="Enter Location"
                  value={this.state.location}
                  onChange={this.onChange}
                />
                <p className="text-danger mt-3">
                  {this.state.lEmpty
                    ? "Please enter your hospital/clinic location."
                    : ""}
                </p>
              </div>
              <div className="form-group my-5">
                <label htmlFor="exampleInputEmail3">
                  Your Hospital/Clinic Email
                </label>
                <input
                  type="email"
                  className={
                    this.state.eEmpty || this.state.dnsV || this.state.eV
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="email"
                  id="exampleInputEmail3"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
                <p className="text-danger mt-3">
                  {this.state.eEmpty
                    ? "Please enter your hospital/clinic email."
                    : ""}
                </p>
                <p className="text-danger mt-3">
                  {this.state.dnsV ? "Sorry this email does not exist." : ""}
                </p>
                <p className="text-danger mt-3">
                  {this.state.eV
                    ? "Your hospital/clinic is already registered."
                    : ""}
                </p>
              </div>
              <div className="form-group my-5">
                <label htmlFor="exampleInputPassword1">
                  Your Hospital/Clinic Password
                </label>
                <input
                  type="password"
                  className={
                    this.state.pEmpty || this.state.pLength
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
                  {this.state.pEmpty
                    ? "Please enter your hospital/clinic password."
                    : ""}
                </p>
                <p className="text-danger mt-3">
                  {this.state.pLength
                    ? "Password must be at least 8 characters long"
                    : ""}
                </p>
              </div>
              <div className="form-group my-5">
                <label htmlFor="exampleInputPassword2">
                  Confirm Your Password
                </label>
                <input
                  type="password"
                  className={
                    this.state.cpEmpty || this.state.cpEqual
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  name="cp"
                  id="exampleInputPassword2"
                  placeholder="Confirm Password"
                  onChange={this.onChange}
                  value={this.state.cp}
                />
                <p className="text-danger mt-3">
                  {this.state.cpEmpty
                    ? "Please confirm your hospital/clinic password."
                    : ""}
                </p>
                <p className="text-danger mt-3">
                  {this.state.cpEqual ? "Password does not match" : ""}
                </p>
              </div>
              <button
                type="submit"
                className="mt-5 btn btn-block edrgt rounded-0"
              >
                Register Here{" "}
                <i className="fa fa-sign-in ml-2" aria-hidden="true"></i>
              </button>
            </form>
            <h6 className="text-center text-muted mr-2 my-4">
              Already registered ?<Link to="/hospitalLogin"> Login Here !</Link>
            </h6>
          </div>
        </div>
      );
    return <div>{cmp}</div>;
  }
}