import React from 'react';
import {connect} from 'react-redux';

class sidebarMenu extends React.Component{
    
    render(){
        return(
            // <div className="row">
            // this.props.role==="user"?
            <div className="text-left" style={{ position: "fixed", marginTop: "100px", marginLeft: '40px', fontFamily: 'Montserrat', color: "#5C5C5C", fontSize: '14px' }}>
                        <div className="mb-2">Face</div>
                        <div className="mb-2">Eye</div>
                        <div className="mb-2">Lip</div>
                        <div className="mb-2">Skincare</div>
                    </div>
            // :null
        
                    
            // </div>
        )
    }
};

const mapStateToProps = (state) => {
    return{
        role: state.user.role
    }
}
export default connect(mapStateToProps)(sidebarMenu);