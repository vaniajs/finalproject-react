import React from 'react';
import FortuneCookie from './../picts/cookie-01.png';
import FortuneCrack from './../picts/crack-03.png';
import Axios from 'axios';
import { cartLength } from '../1.actions/cartActions';
import {connect} from 'react-redux';

class Fortune extends React.Component{

    state = {crack:false}

    btnCrack=()=>{
        Axios.post('http://localhost:2000/cart/gift?id='+this.props.id)
        .then((res)=>{
            // this.props.cartLength(this.props.username)
        })
        .catch((err)=>console.log(err))
        this.setState({crack:true})
        
    }

    render(){
        return(
            <div style={{marginTop:'100px', position:'fixed', zIndex:'1', marginLeft:'450px'}}>
                {
                    this.state.crack ?
                    <img src={FortuneCrack} width='800px' alt='fcookie'/>
                    :                
                    <img src={FortuneCookie} width='650px' onClick={this.btnCrack} alt='crack'/>


                }
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return{
        username: state.user.username,
        id: state.user.id
    }
}

export default connect(mapStateToProps,{cartLength})(Fortune);