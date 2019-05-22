import React from 'react';
import {Link} from 'react-router-dom';


class PageNotFound extends React.Component{
    render(){
        return(
            <div
          className="text-center"
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bolder",
            marginTop: "200px",
            color: "#5C5C5C"
          }}>
          <h1>404.<br />
            Page Not Found :(</h1>
          <Link to='/'>
            <p style={{
              color: "#E16868"
            }}>Return to Home</p>
          </Link>
        </div>
        )
    }
};

export default PageNotFound;