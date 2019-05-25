import React from 'react';
import queryString from 'query-string';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends React.Component{
    componentDidMount(){
        this.verification()
    }
    
    verification = () => {
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        // alert(params)
        Axios.put('http://localhost:2000/user/verified?username='+params.username)
        // ,{
        //     username: params.username
        //     // password: params.password
        // })
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        // GET DATA USERNAME & PASSWORD DARI URL
        // JALANIN AXIOS POST MENUJU LINK API VERIFIKASI
    }

    render(){
        return(
            <div className="container" style={{
                fontFamily: "Montserrat",
                fontWeight: "bolder",
                marginTop: "100px",
                color: "#5C5C5C",
              }}>
               Your account has been verified. You can now <Link to='/login' style={{color:'#E16868'}}>login</Link> with your email.
            </div>
        )
    }
}

export default Home