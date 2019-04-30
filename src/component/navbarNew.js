import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import {resetUser} from '../1.actions/userActions';  
import {cartLength} from '../1.actions/cartActions';  
import { Link } from 'react-router-dom';
import ModalCart from './cart';
import { connect } from 'react-redux';
import Cookie from 'universal-cookie';


const objCookie = new Cookie()

class NavbarNew extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  componentDidMount(){
    if(this.props.id){
      this.props.cartLength(this.props.username)
    }
  }

  state = {modal:false}

  btnLogout = () => {
    objCookie.remove('userData')
    this.props.resetUser()
  }

  render() {
    
    const styling = { fontFamily: 'Montserrat', color: "#5C5C5C" , fontSize:'14px'}
    return (
      // <div style={{position:"fixed"}}>
        <Navbar light expand="md" style={{backgroundColor:"#FFF9F9"}} sticky="top">
          <NavbarBrand href="/"><img src='http://s3-ap-southeast-1.amazonaws.com/glints-id-dashboard/job-banner-pic/242365aaf4655ba28403433fff1c44fb.png' width='100px'/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {/* <Nav className="ml-auto" navbar> */}
            {this.props.username !== '' ?
                <Nav className="ml-auto" navbar>
                  <NavItem className='bt-link'>
                    <NavLink className='bt-link' style={styling} className='bt-link'>Dear, <b>{this.props.username}</b></NavLink>
                  </NavItem>

                  {this.props.role === 'admin'?
                  <NavItem className='bt-link'>
                  <Link to='/manage-product' className='bt-link'><NavLink className='bt-link' style={styling} className='bt-link'><i className="fas fa-sliders-h"/> Manage Products</NavLink></Link>
                </NavItem>
                :<NavItem className='bt-link'>
                  
                <Link to='/' className='bt-link' onMouseOver={()=>this.setState({modal:true})} onMouseLeave={()=>this.setState({modal:false})}><NavLink className='bt-link' style={styling} className='bt-link'><i className="fas fa-shopping-cart s-cart"/> {this.props.cart}  </NavLink></Link>
                {this.state.modal===true?<ModalCart/>:null}
              </NavItem>
                
              }
                  
                  <NavItem className='bt-link'>
                    <Link to='/' className='bt-link'><NavLink onClick={this.btnLogout} className='bt-link' style={styling} className='bt-link'><i className="fas fa-sign-in-alt"/>LOGOUT </NavLink></Link>
                  </NavItem></Nav>
              : 
                <Nav className="ml-auto float-right" navbar>
                  <NavItem className='bt-link'>
                    <Link to='/register' className='bt-link'><NavLink className='bt-link' style={styling}><i className="fas fa-user-plus" /> REGISTER</NavLink></Link>
                  </NavItem>
                  <NavItem className='bt-link'>
                    <Link to='/login' className='bt-link'><NavLink className='bt-link' style={styling} className='bt-link'><i className="fas fa-sign-in-alt" /> LOGIN</NavLink></Link>
                  </NavItem></Nav>

            }
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            {/* </Nav> */}
          </Collapse>
        </Navbar>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    role: state.user.role,
    cart: state.cart.cart,
    id : state.user.id,
  }
}

export default connect(mapStateToProps,{resetUser,cartLength})(NavbarNew);
