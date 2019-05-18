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
            <td><img src={`http://localhost:2000/${val.image}`} width='50px' alt='img-prd'/></td>
            <td>{val.product}</td>
            <td>Rp {val.price}</td>
            <td>{val.discount}%</td>
            <td>{val.qty}</td>
          </tr>
        )
      })
      return jsx
    }
  
    render() {
      return (
          // <Modal show={this.state.show} onHide={this.handleClose}>
          //   <Modal.Header closeButton>
          //     <Modal.Title>Modal heading</Modal.Title>
          //   </Modal.Header>
          //   <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          //   <Modal.Footer>
          //     <Button variant="secondary" onClick={this.handleClose}>
          //       Close
          //     </Button>
          //     <Button variant="primary" onClick={this.handleClose}>
          //       Save Changes
          //     </Button>
          //   </Modal.Footer>
          // </Modal>
          <div id='modal-cart' style={{width:"400px",backgroundColor:"#FFF9F9",position:'absolute',top:"50px",right:"25px"}}>
              <p>Cart</p>
              <table className='text-left' style={{fontSize:'12px', margin:'15px'}}>
                {this.renderCart()}
                {/* <tr>
                  <td className='text-right'><input type='button' value='CheckOut' className='mt-2' style={{border:'none', borderRadius:'10px', backgroundColor:'#E16868', color:'#FFF9F9'}}/></td>
                </tr> */}
              </table>
          </div>
      );
    }
  }
  
  const mapStateToProps = (state) => {
    return{
      idUser : state.user.id,
      username: state.user.username
    }
  }

export default connect(mapStateToProps)(ModalCart);
