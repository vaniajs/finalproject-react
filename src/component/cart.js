import React from 'react';
import '../support/cssheader.css';
import {connect} from 'react-redux';
import Axios from 'axios';


class ModalCart extends React.Component {

    state = {cart:[]}

    componentDidMount(){
      this.getCart()
    }

    getCart = () => {
      Axios.get('http://localhost:2000/cart/getCart?username='+this.props.username)
      .then((res)=>{
        this.setState({cart:res.data})
      })
      .catch((err)=>console.log(err))
    }

    renderCart = () => {
      var jsx = this.state.cart.map((val)=>{
        return(
          <tr>
            <td><img src={`http://localhost:2000/${val.image}`} width='50px' alt='img-prd'/>
            {
              val.discount > 0 ?
              <div className="text-center" style={{fontSize:'9px', width:'30px',position:"relative", marginTop:'-70px', marginLeft:'40px', backgroundColor:'#E16868', borderRadius:'10px', color: 'white', fontWeight:'bold'}}>{val.discount} %</div>
              : null
            }
            </td>
            <td>{val.product}</td>
            {
              val.discount>0?
              <td><s>Rp {val.price}</s> Rp {val.price-(val.price*val.discount/100)}</td>
              : <td>Rp {val.price}</td>

            }
            {/* {
              val.discount > 0 ?
              <td>{val.discount} %</td>
              : <td></td>
            } */}
            {
              val.qty > 1 ? <td>{val.qty}pcs</td>
              :   <td>{val.qty}pc</td>
            }

            <td>{(val.price-(val.price*val.discount/100))*val.qty}</td>
          </tr>
        )
      })
      return jsx
    }

    totalPrint = () => {
      var total = 0
     for(var i = 0; i<this.state.cart.length; i++){
      total += ((this.state.cart[i].price-(this.state.cart[i].discount/100*this.state.cart[i].price))*this.state.cart[i].qty)
     }
     return total
  }

    render() {
      return (
    
          <div id='modal-cart' style={{width:"400px",backgroundColor:"#FFF9F9",position:'absolute',top:"50px",right:"25px",color:'#E16868'}}>
              <p><b>Cart</b></p>
              <div className='row mb-2 table-responsive' style={{marginTop:'-5px'}}>
              <table className='text-left table w-auto' style={{fontSize:'11px', marginLeft:'20px',marginRight:'0px'}}>
                {
                  this.props.cart>0?
                  this.renderCart()
                  : <div style={{margin:'auto'}}>You have nothing in your cart :(</div>

                }
      
                {/* <tr>
                  <td className='text-right'><input type='button' value='CheckOut' className='mt-2' style={{border:'none', borderRadius:'10px', backgroundColor:'#E16868', color:'#FFF9F9'}}/></td>
                </tr> */}
              </table>
              {
                  this.props.cart>0?
                <p className='text-right'><b> TOTAL Rp {this.totalPrint()},- </b></p>
                :null
                }
              </div>
              {/* <div style={{color:"#FFF9F9"}}>a</div> */}
          </div>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return{
      idUser : state.user.id,
      username: state.user.username,
      cart: state.cart.cart
    }
  }

export default connect(mapStateToProps)(ModalCart);
