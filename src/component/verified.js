import React from 'react'
import queryString from 'query-string'
import Axios from 'axios';

class Home extends React.Component{
    componentDidMount(){
        this.verification()
    }
    
    verification = () => {
        var params = queryString.parse(this.props.location.search)
        console.log(params)
        Axios.put('http://localhost:2000/user/verified',{
            username: params.username,
            password: params.password
        })
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        // GET DATA USERNAME & PASSWORD DARI URL
        // JALANIN AXIOS POST MENUJU LINK API VERIFIKASI
    }

    render(){
        return(
            <div className="container" style={{marginTop:"100px"}}>
               Your account has been verified. You can now login with your email.
            </div>
        )
    }
}

export default Home