import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class sidebarMenu extends React.Component{
    
    render(){
        return(
            
            <div className="text-left" style={{ position: "fixed", marginTop: "100px", marginLeft: '40px', fontFamily: 'Montserrat', color: "#5C5C5C", fontSize: '14px' }}>
                        {/* <div className="mb-2"><Link to='/face'>Face</Link></div>
                        <div className="mb-2">Eye</div>
                        <div className="mb-2">Lip</div>
                        <div className="mb-2">Lip</div> */}
                        <div className="mb-2"><Link to='/face'>Face</Link></div>
                        <div className="mb-2"><Link to='/eye'>Eye</Link></div>
                        <div className="mb-2"><Link to='/lip'>Lip</Link></div>
                        <div className="mb-2"><Link to='/skincare'>Skincare</Link></div>
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