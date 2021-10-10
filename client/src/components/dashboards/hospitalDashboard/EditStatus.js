import React, { Component } from "react";
import axios from "axios";
import HospitalLogin from "../../auth/hospital/HospitalLogin";
import PatientDashboard from "../patientDashboard/PatientDashboard";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class EditStatus extends Component {
  render() {
    let cmp;
    if (localStorage.getItem("hospital"))
      cmp = <Esd id={this.props.match.params.dcid} mh={this.props.history} />;
    else if (localStorage.getItem("patient")) cmp = <PatientDashboard />;
    else cmp = <HospitalLogin />;
    return <div>{cmp}</div>;
  }
}

class Esd extends Component {
  componentDidMount() {
    setInterval(() => this.setState({ isToken: false }), 7000);
  }
  constructor(props) {
    super(props);
    this.state = {
      status: "Inactive",
      token: "",
      isToken: false,
      loader: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    this.setState({loader:true});
    axios({
      url: `http://localhost:5000/api/doctor/delStatus-${this.props.id}`,
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("hospital"),
      },
    })
      .then((res) => this.props.mh.push("/hospitalDashboard"))
      .catch((err) => console.log(err));
  }
  onSubmit(e) {
    e.preventDefault();
    if (!this.state.token) this.setState({ isToken: true });
    else {
      this.setState({loader:true});
      let statusu = {
        status: this.state.status,
        currentToken: this.state.token,
      };
      axios({
        url: `http://localhost:5000/api/doctor/editStatus-${this.props.id}`,
        method: "post",
        headers: {
          Authorization: localStorage.getItem("hospital"),
        },
        data: statusu,
      })
        .then((res) => this.props.mh.push("/hospitalDashboard"))
        .catch((err) => console.log(err));
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
    return (
      <div className="mt-5">
        <div className="container">
          <div className="jumbotron shadow border rounded d-none d-md-block">
            <div className="container text-center">
              <p className="lead mb-5">
                The following URL can be used by the patients to track the
                status of their token :{" "}
              </p>
              <a
                href={`https://bristalava.herokuapp.com/search-${this.props.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`https://bristalava.herokuapp.com/search-${this.props.id}`}
              </a>
            </div>
          </div>
          <form
            className="shadow px-5 py-1 my-5 hlfm border-bottom rounded"
            onSubmit={this.onSubmit}
            style={{ background: "#fafafa" }}
          >
            <div className="form-group my-5">
              <label htmlFor="exampleInputPassword1">Select Status</label>
              <br />
              <select
                name="status"
                id="exampleInputPassword1"
                onChange={this.onChange}
                className="w-100"
              >
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Current Token</label>
              <input
                type="text"
                className={
                  this.state.isToken
                    ? "form-control is-invalid"
                    : "form-control"
                }
                name="token"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={this.state.token}
                onChange={this.onChange}
              />
              <p className="text-danger mt-3">
                {this.state.isToken
                  ? "Please enter the token number first."
                  : ""}
              </p>
            </div>
            <button
              type="submit"
              className="my-5 btn estu rounded-0 mx-auto d-block text-uppercase"
            >
              Update <i className="fa fa-check ml-1" aria-hidden="true"></i>
            </button>
          </form>
          <button
            onClick={this.onClick}
            type="submit"
            className="my-5 btn btn-block btn-outline-danger rounded-0 mx-auto d-block text-uppercase"
          >
            remove doctor{" "}
            <i className="fa fa-times ml-1" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}
