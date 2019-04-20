import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cr1 from './../picts/carousel1.jpg';
import cr2 from './../picts/carousel2.jpg';

class Home extends React.Component {
    render() {
        return (
            <div className="container" style={{ marginTop: "100px" }}>
                {/* <div className="row"> */}
                {/* <div className="carousel slide justify-content-end" data-ride="carousel" id="carouselExampleSlidesOnly" > */}
                <div className="row">
                    <div className="col-md-8 carousel slide" data-ride="#carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img className="d-block w-40" src={cr1} alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="d-block w-40" src={cr2} alt="Second slide" />
                            </div>
                        </div>
                        {/* <img className="w-40" src="https://images.ctfassets.net/p3w8f4svwgcg/1aipO8NVSjJvkyChGPXro6/fc56517e5ef3f51a362f3da9760fc396/SkincareSet_IMG_1.jpg?w=555&h=701&q=80" alt="First slide" /> */}
                        <h1 className="text-left" style={{ fontFamily: "Playfair Display", fontWeight: "bolder", fontStyle: "italic", zIndex: 1, marginLeft: "520px", marginTop: "-400px", position: "fixed" }}>Skin First. <br />Makeup Second. <br />Smile Always :)</h1>
                    </div>
                    <div className="col-md-4">
                        <Link to='/featured-products'><p style={{ fontFamily: 'Montserrat', color: "#5C5C5C", fontSize: '14px', fontWeight: "bolder", marginTop: "600px" }}>SHOP NOW >></p></Link>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.user.role
    }
}

export default connect(mapStateToProps)(Home);

