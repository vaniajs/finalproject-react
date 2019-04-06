import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

class Home extends React.Component {
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-2" style={{ marginTop: "100px", marginLeft: '40px', fontFamily: 'Montserrat', color: "#5C5C5C", fontSize: '14px' }}>
                        <div className="row mb-2">Face</div>
                        <div className="row mb-2">Eye</div>
                        <div className="row mb-2">Lip</div>
                        <div className="row mb-2">Skincare</div>
                    </div>
                    <div className="col-md-10 carousel slide justify-content-end" data-ride="carousel" id="carouselExampleSlidesOnly" style={{marginTop:"-160px"}}>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="w-40" src="https://images.ctfassets.net/p3w8f4svwgcg/1aipO8NVSjJvkyChGPXro6/fc56517e5ef3f51a362f3da9760fc396/SkincareSet_IMG_1.jpg?w=555&h=701&q=80" alt="First slide" />
                                </div>
                                <h1 style={{fontFamily:"PT Serif", zIndex:1, marginTop:"-50px"}}>"Insert Quote Here"</h1>
                                <div className="carousel-item">
                                    <img className="w-40" src="https://images.ctfassets.net/p3w8f4svwgcg/7leR53i6vBWD421N0mg6d5/a23208135dbe32136b3816dde1b06978/SkincareSet_IMG_2.jpg?w=555&h=701&q=80" alt="Second slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="..." alt="Third slide" />
                                </div>        
                        </div>
                    </div>
                    {/* <div className="col-md-2 text-left justify-content-end">
                    <h1 style={{fontFamily:"PT Serif", zIndex:1, marginTop:"-200px", position:""}}>"Insert Quote Here"</h1>
                    </div> */}
                    <div className="row">
                    <Link to ='/featured-products'><p style={{fontFamily: 'Montserrat', color: "#5C5C5C", fontSize: '14px', fontWeight:"bolder", marginTop:"400px"}}>SHOP NOW >></p></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;

