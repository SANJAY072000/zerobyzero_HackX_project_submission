import React, { Component } from "react";
import Banner from "./Banner";
import Feature from "./Feature";
import HospitalDashboard from "../dashboards/hospitalDashboard/HospitalDashboard";
import PatientDashboard from "../dashboards/patientDashboard/PatientDashboard";

export default class Welcome extends Component {render() {
    let cm;
    if (localStorage.getItem("hospital") || localStorage.getItem("patient")) {
      if (localStorage.getItem("hospital")) cm = <HospitalDashboard />;
      else if (localStorage.getItem("patient")) cm = <PatientDashboard />;
    } else
      cm = (
        <div>
          <Banner mh={this.props.history} />
          <Feature />
          <div className="my-5 text-center font-weight-bolder">
            copyright@ "zerobyzero"
          </div>
        </div>
      );
    return <div>{cm}</div>;
  }
}
