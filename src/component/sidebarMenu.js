import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import './../support/csssidebar.css'

class sidebarMenu extends React.Component{
    
    render(){
        return(
            
            <div className="text-left " style={{ position: "fixed", marginTop: "100px", marginLeft: '40px'}}>
                        {/* <div className="mb-2"><Link to='/face'>Face</Link></div>
                        <div className="mb-2">Eye</div>
                        <div className="mb-2">Lip</div>
                        <div className="mb-2">Lip</div> */}
                        <div><Link to='/face'><p className="menu">Face</p></Link></div>
                        <div><Link to='/eye'><p className="menu">Eye</p></Link></div>
                        <div><Link to='/lip'><p className="menu">Lip</p></Link></div>
                        <div><Link to='/skincare'><p className="menu">Skincare</p></Link></div>
                    </div>
        )
    }
};

const mapStateToProps = (state) => {
    return{
        role: state.user.role
    }
}
export default connect(mapStateToProps)(sidebarMenu);