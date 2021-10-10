import React, { Component } from "react";
import AddCredit from "./AddCredit";
import DoctorList from "./DoctorList";
import HospitalLogin from "../../auth/hospital/HospitalLogin";
import axios from "axios";
import PatientDashboard from "../patientDashboard/PatientDashboard";

export default class HospitalDashboard extends Component {
  componentDidMount() {
    axios({
      url: "http://localhost:5000/api/doctor/credits",
      headers: {
        Authorization: localStorage.getItem("hospital"),
      },
    })
      .then((res) => this.setState({ credits: res.data.credits,loader:false }))
      .catch((err) => console.log(err));
  }
  constructor(props) {
    super(props);
    this.state = {
      credits: 0,
    };
  }
  render() {
    let cmp;
    if (localStorage.getItem("hospital"))
      cmp = (
        <div>
          <AddCredit />
          <DoctorList credits={this.state.credits} />
        </div>
      );
    else if (localStorage.getItem("patient")) cmp = <PatientDashboard />;
    else cmp = <HospitalLogin />;
    return <div>{cmp}</div>;
  }
}
