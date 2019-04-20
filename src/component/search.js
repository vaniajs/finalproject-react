import React from 'react';

class Search extends React.Component{
    render(){
        return(
            // <div className="row">
            <div className="container-fluid">
                    <div className="d-flex justify-content-end" style={{ position: "fixed", marginTop: "100px", marginRight: '40px', fontFamily: 'Montserrat', color: "#5C5C5C", fontSize: '14px' }}>
                        <div className="p-2 mb-2">Search</div>
                    </div>
            </div>
        )
    }
};

export default Search;