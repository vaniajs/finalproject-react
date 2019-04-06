import React, { Component } from 'react';
import Header from './component/header';
import LandingPage from './component/landingPage';
import Home from './component/home';
import Footer from './component/footer';
import Register from './component/register';
import Login from './component/login';
import Etalase from './component/etalase';
import ManageProduct from './component/manageProduct2';
import ProductDetail from './component/productDetail';
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


const objCookie = new Cookie()
class App extends Component {

  state = { cart: []}

  componentDidMount(){
    var ck = objCookie.get('userData')
    if(ck!==undefined){
      this.props.keepLogin(ck)
    }
    this.getDataCart(ck)
  }

  getDataCart = (a) => {
    axios.get('http://localhost:2000/users?username='+a)
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
        
        <Route path="/" component={Home} exact />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login}/>
        <Route path="/featured-product" component={Etalase}/>
        <Route path="/manage-product" component={ManageProduct}/>
        <Route path="/product/:id" component={ProductDetail}/>

        <Footer />


        </div>
    );
  }
}

export default withRouter(connect(null,{keepLogin})(App));
