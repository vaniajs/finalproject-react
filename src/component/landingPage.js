import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import '../support/cssbackground.css';
import '../support/cssform.css';

class LandingPage extends React.Component {
  render() {
    return (
      <center><div className="container row">
              <div className="col-md-6 bg-imej" />

              <div style={{ height: "700px" }} className="col-md-6 bg-im">
          <h1 className="display-3 ttl" style={{ marginTop: "200px" }}>Hello, world!</h1>
          <p className="lead ontop" style={{ color: "rgb(0,48,143)" }}>WELCOME TO MY WEBSITE</p>
          <hr className="my-2 ontop" style={{ borderColor: "gb(0,48,143)" }} />
          <p className="ontop" style={{ color: "rgb(0,48,143)" }}>Don't have any account yet?</p>
          <p className="lead ontop">
            <Button className="ontop" style={{ backgroundColor: "deeppink", border: "none", borderRadius: "50px", height: "40px", width: "200px" }}>REGISTER NOW</Button>
          </p>
        </div>
        {/* <Jumbotron style={{ height: "700px" }} className="col-md-6 bg-im">
          <h1 className="display-3 ttl" style={{ marginTop: "200px" }}>Hello, world!</h1>
          <p className="lead ontop" style={{ color: "rgb(0,48,143)" }}>WELCOME TO MY WEBSITE</p>
          <hr className="my-2 ontop" style={{ borderColor: "gb(0,48,143)" }} />
          <p className="ontop" style={{ color: "rgb(0,48,143)" }}>Don't have any account yet?</p>
          <p className="lead ontop">
            <Button className="ontop" style={{ backgroundColor: "#00308F", border: "none", borderRadius: "50px", height: "40px", width: "200px" }}>REGISTER NOW</Button>
          </p>
        </Jumbotron> */}
      </div>
      </center>
    )
  }
}

export default LandingPage;
