import React from 'react';
import '../support/cssheader.css';
import {connect} from 'react-redux'
import {Modal,Button} from 'react-bootstrap';
import Axios from 'axios';

class ModalCart extends React.Component {
    // constructor(props, context) {
    //   super(props, context);
  
    //   this.handleShow = this.handleShow.bind(this);
    //   this.handleClose = this.handleClose.bind(this);
  
    //   this.state = {
    //     show: true,
    //   };
    // }
  
    // handleClose() {
    //   this.setState({ show: false });
    // }
  
    // handleShow() {
    //   this.setState({ show: true });
    // }

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
            <td>{val.product}</td>
            <td>Rp {val.price}</td>
            <td>{val.discount}% </td>
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
          <div id='modal-cart' style={{width:"300px",backgroundColor:"#FFF9F9",height:"200px",position:'absolute',top:"50px",right:"25px"}}>
              <table>
                {this.renderCart()}
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
