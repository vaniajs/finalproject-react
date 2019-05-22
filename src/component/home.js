import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {cartLength} from '../1.actions/cartActions';  
import carousel from './../picts/carousel.gif';
import BG from './../picts/bg.png'

class Home extends React.Component {
    
    componentDidMount(){
        if(this.props.id){
            this.props.cartLength(this.props.username)
          }
    }
    
    render() {
        return (
            <div className="container-fluid" style={{marginTop:"40px"}}>
                {/* <div className="row"> */}
                    {/* <div className="carousel slide justify-content-end" data-ride="carousel" id="carouselExampleSlidesOnly" > */}
                        <div className="row">
                            <div className="col-md-8">
                                <img className="w-40" src={carousel} alt="GIF" style={{marginLeft:'-30px'}} />
                                <img src={BG} style={{zIndex:'-1',position:'fixed',marginTop:'-80px', marginLeft:'410px', marginTop:'60px', height:'600px',opacity:'0.8'}}/>

                                    <h1 className="text-left" style={{fontFamily: "Playfair Display",  fontWeight:"bolder", fontStyle:"italic", zIndex: 1, marginLeft:"780px", marginTop: "-400px", position: "fixed" }}>Skin First. <br/>Makeup Second. <br/>Smile Always :)</h1>
                            </div>
                            <div className="col-md-4">
                            <Link to='/featured-products'><p style={{ fontFamily: 'Montserrat', color: "#5C5C5C", fontSize: '14px', fontWeight: "bolder", marginTop:"480px", marginLeft:'-750px'}}>SHOP NOW >></p></Link>
                            </div>
                     
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.user.role,
        id: state.user.id,
        username: state.user.username
    }
}

export default connect(mapStateToProps,{cartLength})(Home);

