import React, { Component } from 'react';
import Header from './component/header';
import LandingPage from './component/landingPage';
import Home from './component/home';
import Footer from './component/footer';
import Sidebar from './component/sidebarMenu';
import Search from './component/search';
import Register from './component/register';
import Login from './component/login';
import Etalase from './component/etalase';
import ManageProduct from './component/manageProduct3';
import ProductDetail from './component/productDetail';
import Verify from './component/verify';
import Verified from './component/verified';
import { keepLogin } from './1.actions'
import { connect } from 'react-redux';
import axios from 'axios';
import { Route , withRouter , Switch } from 'react-router-dom';
import Cookie from 'universal-cookie';
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
    if(ck!==undefined){
      this.props.keepLogin(ck)
    }
    // if(this.props.role==="admin"){
    //   this.setState({showSidebar:false})
    // }
    this.getDataCart(ck)
  }

  componentWillReceiveProps(newProps){
    this.setState({pathName:newProps.location.pathname})
  }

  getDataCart = (a) => {
    axios.get('http://localhost:2000/user?username='+a)
    .then((res)=>{
      axios.get('http://localhost:2000/cart?idUser='+res.data[0].id)
      .then((res)=>{
        //console.log('masuk')
        // this.setState({cart:res.data})
        this.props.updateCart(res.data.length)
      })
      .catch((err)=>console.log(err))
    })
    .catch((err)=>console.log(err))

  }
  
  render() {
    return (
      <div className="App">
        <Header />
        {
          this.state.pathName==='/manage-product' || this.state.pathName==='/verify' || this.state.pathName==='/register' || this.state.pathName==='/login' ?null
          :        <Sidebar />
        }
        {/* <Search /> */}
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
}

const mapStateToProps = (state) => {
  return{
    role: state.user.role
  }
}

export default withRouter(connect(mapStateToProps,{keepLogin})(App));
