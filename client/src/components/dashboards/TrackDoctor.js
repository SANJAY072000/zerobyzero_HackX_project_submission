
import React, { Component } from "react";
import axios from "axios";

export default class TrackDoctor extends Component {
  componentDidMount() {
    axios({
      url: `http://localhost:5000/api/doctor/search-${this.props.match.params.id}`,
    })
      .then((res) => this.setState({ doctor: res.data.doctor }))
      .catch((err) => console.log(err));
  }
  constructor(props) {
    super(props);
    this.state = {
      doctor: [],
    };
  }
  render() {
    return (
      <div className="mt-3">
        {this.state.doctor.map((a, i) => (
          <div className="container" key={i}>
            <div
              className="card text-center d-block mx-auto pt-2 pb-3 px-5 h-25 shadow-lg border-bottom"
              style={{ background: "#eeeeee", width: "350px" }}
            >
              <div className="card-body">
                <p className="card-title lead text-uppercase text-primary">
                  Token
                </p>
                <h1
                  className="card-text mt-5 display-3 font-weight-bold pb-3"
                  style={{ color: "#3949ab" }}
                >
                  {a.currentToken}
                </h1>
              </div>
            </div>
            <div className="row border pt-2 my-5 shadow rounded">
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
                <p>
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
          </div>
        ))}
      </div>
    );
  }
}