import React from 'react';


class Footer extends React.Component {

  render() {
      const styling = {fontFamily:"Montserrat", color:"#E16868", letterSpacing:"2px", marginTop:"10px", fontSize:'11px'}
    return (
      // <div className="container" style={{backgroundColor:"#00308F",height:"1000px"}}>

      // </div>
      <div className="fluid-container" style={{backgroundColor:"#FFF9F9",position:"fixed", width:"100%", height:"40px", bottom:"0px", left:"0px", zIndex:'1'}}>
        <p style={styling} className="text-center"><i>@sociolla</i></p>
              
      </div>
    );
  }
}

export default Footer;
