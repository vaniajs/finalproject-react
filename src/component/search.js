import React from 'react';

class Search extends React.Component{
    render(){
        return(
            // <div className="row">
            <div className="container-fluid" style={{position:"fixed"}}>
                    <div className="float-lg-right" style={{ marginTop: "100px", marginRight: '40px', fontFamily: 'Montserrat', color: "#5C5C5C", fontSize: '14px' }}>
                        <div className="p-2">Search</div>
                        <input type="text" className="text-center" style={{ border: "none", backgroundColor: "#E16868", borderRadius: "50px", color: "white", height: "40px" }} placeholder="type your search" onClick={this.btnReg} />
                    </div>

            </div>
        )
    }
};

export default Search;