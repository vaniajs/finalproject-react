import React from "react";
import { connect } from "react-redux";
import Loader from 'react-loader-spinner';
import { userReg } from '../1.actions';
import { Redirect } from 'react-router-dom';
// import '../support/cssform.css';

class Register extends React.Component {
    state={error:'',reg:false}

    componentWillReceiveProps(newProps){
        if(newProps!==''){
            this.setState({error:newProps.error,reg:true})

        }
    }

    // componentDidUpdate(){
    //     if(this.props.username!==''){
    //         return <Redirect to='/verify'/>
    //     }
    // }

    btnReg = () => {
        var username = this.refs.username.value
        var email = this.refs.email.value
        var mobile = this.refs.mobile.value
        var password = this.refs.pass1.value
        var pass2 = this.refs.pass2.value
    //         {
    //     username==='' || email==='' || mobile==='' || password==='' || pass2===''?
    //     this.setState({error:'Please fill all the required field'})
    //     : password !== pass2 ?
    //     this.setState({error:'Wrong password confirmation'})
    //     : this.props.userReg(username,email,mobile,password)
    // }
        if(username==='' || email==='' || mobile==='' || password==='' || pass2===''){
            this.setState({error:'Please fill all the required field'})
        }else if(password !== pass2 ){
            this.setState({error:'Wrong password confirmation'})
        }else if(this.props.error){
            this.setState({error:this.props.error})
        }else{
            this.props.userReg(username,email,mobile,password)
            this.setState({reg:true})
            // swal('Thanks for registering!', 'Please check your email to verify', 'success')

            // this.setState({reg:true})
            // this.props.history.push
            // if(this.props.username!==''){
            //     this.setState({reg:true})
            // }
            // this.setState({reg:true})
      
        }

    }
    

    renderLoaderOrBtn = () =>{
        if(this.props.loading===true){
            return<Loader 
            type="ThreeDots"
            color="#E16868"
            height="100"	
            width="100"
            />  
        }
        return <input type="button" className="col-md-2 text-center" style={{ border: "none", backgroundColor: "#E16868", borderRadius: "50px", marginTop: "35px", color: "white", height: "40px" }} value="REGISTER" onClick={this.btnReg} />
    }

    render() {
        // if(this.props.cookie){
        //     return <Redirect to='/verify'/>
        // }

        if(this.state.reg){
            return <Redirect to='/verify'/>
        }

        var stylingP = { marginTop: "20px", color: "#5C5C5C", marginLeft: "-30px", fontFamily: "Montserrat", fontWeight: "600", letterSpacing:'2px', fontSize:'14px' }
        var stylingB = {marginRight: "20px", fontFamily: "Montserrat", marginTop: "-10px", fontSize: "12px" }

        return (

            <div className="container fluid">
                <div className="row" style={{ height: "80px" }} />
                {/* <div className="row justify-content-center">
                    <p className="col-md-6 text-left" style={stylingP}>N A M E</p>
                </div>
                <div className="row justify-content-center">
                    <input refs='nama1' type="text" className="col-md-3 tbox" style={stylingB} placeholder="First Name" />
                    <input refs='nama2' type="text" className="col-md-3 tbox" style={stylingB} placeholder="Last Name" />
                </div> */}

                <div className="row justify-content-center">
                    <p className="col-md-6 text-left" style={stylingP}>USERNAME</p>
                </div>
                <div className="row justify-content-center">
                    <input ref='username' type="text" className="col-md-6 tbox" style={stylingB} placeholder="@example123" />
                </div>

                <div className="row justify-content-center">
                    <p className="col-md-6 text-left" style={stylingP}>EMAIL</p>
                </div>
                <div className="row justify-content-center">
                    <input ref='email' type="text" className="col-md-6 tbox" style={stylingB} placeholder="example123@gmail.com" />
                </div>

                <div className="row justify-content-center">
                    <p className="col-md-6 text-left" style={stylingP}>MOBILE</p>
                </div>
                <div className="row justify-content-center">
                    <input ref='mobile' type="text" className="col-md-6 tbox" style={stylingB} placeholder="+628787878787" />
                </div>

                <div className="row justify-content-center">
                    <p className="col-md-6 text-left" style={stylingP}>PASSWORD</p>
                </div>
                <div className="row justify-content-center">
                    <input ref='pass1' type="password" className="col-md-3 tbox" style={stylingB} placeholder="Set Password" />
                    <input ref='pass2' type="password" className="col-md-3 tbox" style={stylingB} placeholder="Confirm Password" />
                </div>


                <div className="row justify-content-center">
                {this.renderLoaderOrBtn()}</div>
                <div className="row justify-content-center mt-4" style={{color:'#ff1493',fontSize:'12px', fontWeight:'500'}}>
                {
                    this.state.error!==''? this.state.error : null
                }</div>
                


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        username: state.user.username,
        email: state.user.email,
        role: state.user.role,
        error: state.user.error,
        cookie: state.user.cookie
    }
}

export default connect(mapStateToProps,{userReg})(Register);