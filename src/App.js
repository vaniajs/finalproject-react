import React, { Component } from 'react';
import Header from './component/navbarNew';
import Home from './component/home';
import Footer from './component/footer';
import Sidebar from './component/sidebarMenu';
import Register from './component/register';
import Login from './component/login';
import Etalase from './component/etalase';
import Face from './component/etalaseFace';
import Eye from './component/etalaseEye';
import Lip from './component/etalaseLip';
import Skin from './component/etalaseSkin';
import ManageProduct from './component/manageProduct4';
import ProductDetail from './component/productDetail2';
import CartDetail from './component/cartDetail';
import HistoryDetail from './component/history';
import ManageTransaction from './component/manageTransaction';
import Verify from './component/verify';
import Verified from './component/verified';
import PageNotFound from './component/pageNotFound';
// import Wheel from './component/wheel2';
import { keepLogin, cartLength, cookieChecked} from './1.actions'
import { connect } from 'react-redux';
import { Route , withRouter , Switch } from 'react-router-dom';
import Cookie from 'universal-cookie';
import Loader from 'react-loader-spinner';
import './support/cssheader.css';
import './support/font.css';
import './support/cssbackground.css';
import './App.css';
import BG from './../src/picts/bg.png';
import Fortune from './component/fortune';



const objCookie = new Cookie()
class App extends Component {

  state = {cart: [], showSidebar: true, pathName:''}


  componentDidMount(){
    if(objCookie.get('userData')!==undefined){
      this.props.keepLogin(objCookie.get('userData'))
    }else{
      this.props.cookieChecked()
    }
  }


  componentWillReceiveProps(newProps){
    this.setState({pathName:newProps.location.pathname})
  }

  render() {
    if(this.props.cookie){
      return (
        <div className="App">
          <Header />
          {
            this.state.pathName==='/manage-product' || this.state.pathName==='/verify' || this.state.pathName==='/register' || this.state.pathName==='/login' || this.state.pathName==='/cart-detail' || this.state.pathName==='/history' || this.state.pathName==='/manage-transaction' || this.state.pathName==='/' || this.state.pathName==='/verified' ? null
            :        <Sidebar />
          }
          {/* {
            this.state.pathName==='/manage-product' || this.state.pathName==='/verify' || this.state.pathName==='/register' || this.state.pathName==='/login' || this.state.pathName==='/cart-detail'?null
            :        <Search />

          } */}
          {
            this.state.pathName==='/featured-products' || this.state.pathName === '/face' || this.state.pathName === '/eye' || this.state.pathName === '/lip' || this.state.pathName === '/skincare' ?
            <img src={BG} style={{zIndex:'-1',position:'fixed',marginTop:'60px', marginLeft:'410px', height:'600px',opacity:'0.4'}} alt='bg'/>
            : <img src={BG} style={{zIndex:'-1',position:'fixed',marginTop:'60px', marginLeft:'410px', height:'600px',opacity:'0.8'}} alt='bg'/>

          }
   
          {/* {
            this.state.fortune ?
            <Fortune/>
            : null
          } */}
          {
            this.props.cart === 2 ?
            <Fortune/>
            : null
          }

          <Switch>
       
          <Route path="/" component={Home} exact />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login}/>
          <Route path="/featured-products" component={Etalase}/>
          <Route path="/face" component={Face} exact />
          <Route path="/eye" component={Eye} exact />
          <Route path="/lip" component={Lip} exact />
          <Route path="/skincare" component={Skin} exact />

          <Route path="/manage-product" component={ManageProduct}/>
          <Route path="/product-detail/:id" component={ProductDetail}/>
          <Route path="/cart-detail" component={CartDetail}/>
          <Route path="/history" component={HistoryDetail}/>
          <Route path="/manage-transaction" component={ManageTransaction}/>

          <Route path="/verify" component={Verify} exact />
          <Route path="/verified" component={Verified} exact />
          {/* <Route path="/wheel" component={Wheel} exact /> */}
          <Route path='/fortune' component={Fortune} />

          <Route path='*' component={PageNotFound} />

          </Switch>

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
    cookie: state.user.cookie,
    cart: state.cart.cart
  }
}

export default withRouter(connect(mapStateToProps,{keepLogin,cartLength,cookieChecked})(App));
