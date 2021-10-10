import React, { Component } from "react";

export default class Feature extends Component {
  render() {
    return (
      <section className="pt-5">
        <div className="container mt-5 pt-5">
          <div className="row">
            <div className="col-12">
              <h3 className="text-uppercase text-center">
                <span className="mr-2">platform's</span>{" "}
                <span className="bf">benefits</span>
              </h3>
            </div>
            <div className="col-md-1 col-2 offset-md-5 offset-4 border-danger border mt-1"></div>
            <div className="w-100"></div>
            <div className="col-md-1 col-2 offset-6 border-danger border mt-2"></div>
          </div>
          <div className="row py-5">
            <div className="col-lg-4">
              <div className="card text-center py-4 mt-5">
                <i
                  className="fa fa-check-square-o mx-auto mt-3"
                  aria-hidden="true"
                ></i>
                <div className="card-body">
                  <h5 className="card-title font-weight-bolder">See Token</h5>
                  <p className="card-text lead">
                    Patients could track their token outside the clinics or
                    hospitals. Waiting for your token is no longer required.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card text-center py-4 mt-5">
                <i className="fa fa-users mx-auto mt-3" aria-hidden="true"></i>
                <div className="card-body">
                  <h5 className="card-title font-weight-bolder">Avoid Rush</h5>
                  <p className="card-text lead">
                    Say bye to long queue of patients inside your clinics or
                    hospitals waiting for their token number to be called.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card text-center py-4 mt-5">
                <i
                  className="fa fa-clock-o mx-auto mt-3"
                  aria-hidden="true"
                ></i>
                <div className="card-body">
                  <h5 className="card-title font-weight-bolder">More Time</h5>
                  <p className="card-text lead">
                    Due to less rush inside the clinics or hospitals doctors
                    could give more time to attend their patients properly.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card text-center py-4 mt-5">
                <i
                  className="fa fa-user-md mx-auto mt-3"
                  aria-hidden="true"
                ></i>
                <div className="card-body">
                  <h5 className="card-title font-weight-bolder">
                    Doctor Status
                  </h5>
                  <p className="card-text lead">
                    Patients could place an appointment online as well as check
                    the doctor status.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card text-center py-4 mt-5">
                <i
                  className="fa fa-newspaper-o mx-auto mt-3"
                  aria-hidden="true"
                ></i>
                <div className="card-body">
                  <h5 className="card-title font-weight-bolder">
                    Daily Articles
                  </h5>
                  <p className="card-text lead">
                    On this platform you could daily get some health related
                    news feed and articles.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card text-center py-4 mt-5">
                <i className="fa fa-lock mx-auto mt-3" aria-hidden="true"></i>
                <div className="card-body">
                  <h5 className="card-title font-weight-bolder">
                    Black Tokens
                  </h5>
                  <p className="card-text lead">
                    Tokens of the patients could not be sold out in black due to
                    secure chaining.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
