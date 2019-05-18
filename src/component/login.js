import React from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { onLogin } from './../1.actions/userActions';
import { cartLength } from './../1.actions/cartActions';
import '../support/cssform.css';
import Cookie from 'universal-cookie';

const cookie = new Cookie()
class Login extends React.Component {
    componentWillReceiveProps(newProps){
        cookie.set('userData',newProps.username,{path:'/'})
    }

    
    btnLogin = () => {
        var username = this.refs.username.value
        var password = this.refs.password.value
        this.props.onLogin(username,password)
        // alert(this.props.id)
        if(this.props.id!==0){
            this.props.cartLength(username)
        }
    }

    renderLoaderOrButton = () => {
        if(this.props.loading===true){
            return<Loader 
            type="ThreeDots"
            color="#E16868"
            height="100"	
            width="100"
            />  
        }
        return <input type='button' className="col-md-2 text-center" style={{ border: "none", backgroundColor: "#E16868", borderRadius: "50px", marginTop: "35px", color: "#FFF9F9", height: "40px" }} onClick={this.btnLogin} value='LOGIN'></input>    
        
    }

    // errorMsg = () => {
    //     return this.props.error
    // }

    render() {
        if(this.props.username!==''){
            return <Redirect to="/"/>
        }
        
        var stylingP = { marginTop: "20px", color: "#5C5C5C", marginLeft: "-30px", fontFamily: "Montserrat", fontWeight: "600", letterSpacing:'2px', fontSize:'14px' }
        var stylingB = {marginRight: "20px", fontFamily: "Montserrat", marginTop: "-10px", fontSize: "12px" }

        return (
            <div className="container fluid">
                <div className="row" style={{ height: "80px" }} />

                <div className="row justify-content-center">
                    <p className="col-md-4 text-left" style={stylingP}>USERNAME</p>
                </div>
                <div className="row justify-content-center">
                    <input type="text" className="col-md-4 tbox" style={stylingB} placeholder="@example123" ref='username' />
                </div>


                <div className="row justify-content-center">
                    <p className="col-md-4 text-left" style={stylingP}>PASSWORD</p>
                </div>
                <div className="row justify-content-center">
                    <input type="password" className="col-md-4 tbox" style={stylingB} placeholder="Confirm Password" ref='password' />
                </div>

                <div className="row justify-content-center">
                    {this.renderLoaderOrButton()}</div>
                    {/* {this.errorMsg()} */}
                    <div className="row justify-content-center mt-4" style={{color:'#ff1493',fontSize:'12px', fontWeight:'500'}}>
                    {this.props.error}
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        username: state.user.username,
        loading: state.user.loading,
        error: state.user.error,
        id: state.user.id

    }
}

export default connect(mapStateToProps,{onLogin,cartLength})(Login);