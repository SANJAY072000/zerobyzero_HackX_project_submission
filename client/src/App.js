import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Switch} from "react-router";
import Welcome from "./components/home/Welcome";
import HospitalLogin from "./components/auth/hospital/HospitalLogin";
import HospitalRegister from "./components/auth/hospital/HospitalRegister";
import HospitalDashboard from "./components/dashboards/hospitalDashboard/HospitalDashboard";
import AddDoctor from "./components/dashboards/hospitalDashboard/AddDoctor";
import EditStatus from "./components/dashboards/hospitalDashboard/EditStatus";
import PatientDashboard from "./components/dashboards/patientDashboard/PatientDashboard";
import Appointment from "./components/dashboards/patientDashboard/Appointment";
import TrackDoctor from "./components/dashboards/TrackDoctor";
import NoMatch from "./components/NoMatch";
import CircularProgress from '@material-ui/core/CircularProgress';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loader:true
    };
  }

  componentDidMount(){
    this.setState({loader:false});
  }

  render() {
    if(this.state.loader)
    return (
    <div  className="d-flex justify-content-center align-items-center" style={{
      "height":"400px"
    }}>
    <CircularProgress/>
    </div>
    );
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/hospitalLogin" component={HospitalLogin} />
          <Route path="/hospitalRegister" component={HospitalRegister} />
          <Route path="/hospitalDashboard" component={HospitalDashboard} />
          <Route path="/addDoctor" component={AddDoctor} />
          <Route path="/edit-:dcid" component={EditStatus} />
          <Route path="/patientDashboard" component={PatientDashboard} />
          <Route path="/appointments" component={Appointment} />
          <Route path="/search-:id" component={TrackDoctor} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}
