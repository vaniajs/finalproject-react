import React, { Component } from 'react';
import Header from './component/navbarNew';
import LandingPage from './component/landingPage';
import Home from './component/home';
import Footer from './component/footer';
import Sidebar from './component/sidebarMenu';
import Search from './component/search';
import Register from './component/register';
import Login from './component/login';
import Etalase from './component/etalase';
import ManageProduct from './component/manageProduct4';
import ProductDetail from './component/productDetail';
import Verify from './component/verify';
import Verified from './component/verified';
import { keepLogin, cartLength, cookieChecked} from './1.actions'
import { connect } from 'react-redux';
import axios from 'axios';
import { Route , withRouter , Switch } from 'react-router-dom';
import Cookie from 'universal-cookie';
import Loader from 'react-loader-spinner';
import Cart from './component/cart'
import './support/cssheader.css';
import './support/font.css';
import './support/cssbackground.css';

import './App.css';
import { register } from './serviceWorker';
import productDetail from './component/productDetail';
import sidebarMenu from './component/sidebarMenu';


const objCookie = new Cookie()
class App extends Component {

  state = {cart: [], showSidebar: true, pathName:''}

  componentDidMount(){
    var ck = objCookie.get('userData')
    // var id = objCookie.get('userId')
    if(ck!==undefined){
      this.props.keepLogin(ck)
    }
    else{
      this.props.cookieChecked()
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({pathName:newProps.location.pathname})
  }


  // getDataCart = (a) => {
  //   axios.get('http://localhost:2000/user?username='+a)
  //   .then((res)=>{
  //     axios.get('http://localhost:2000/cart?idUser='+res.data[0].id)
  //     .then((res)=>{
  //       //console.log('masuk')
  //       // this.setState({cart:res.data})
  //       this.props.cart(res.data.length)
  //     })
  //     .catch((err)=>console.log(err))
  //   })
  //   .catch((err)=>console.log(err))

  // }
  render() {
    if(this.props.cookie){
      return (
        <div className="App">
          <Header />
          {
            this.state.pathName==='/manage-product' || this.state.pathName==='/verify' || this.state.pathName==='/register' || this.state.pathName==='/login' ?null
            :        <Sidebar />
          }
          {
            this.state.pathName==='/manage-product' || this.state.pathName==='/verify' || this.state.pathName==='/register' || this.state.pathName==='/login' ?null
            :        <Search />

          }
          
          <Route path="/" component={Home} exact />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login}/>
          <Route path="/featured-products" component={Etalase}/>
          <Route path="/manage-product" component={ManageProduct}/>
          <Route path="/product/:id" component={ProductDetail}/>
          <Route path="/verify" component={Verify} exact />
          <Route path="/verified" component={Verified} exact />

          <Footer />
  
          </div>
      );
    }
    return(
         <div className='justify-content-center' style={{marginTop:"400px",marginLeft:"800px"}}>
            <Loader 
            type="ThreeDots"
            color="#E16868"
            height="100"	
            width="100"
            />  
         </div>
    )
    
  }
}

const mapStateToProps = (state) => {
  return{
    role: state.user.role,
    id: state.user.id,
    cookie: state.user.cookie
  }
}

export default withRouter(connect(mapStateToProps,{keepLogin,cartLength,cookieChecked})(App));
