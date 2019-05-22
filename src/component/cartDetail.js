import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import AddBtn from './../support/icon/add.png';
import MinBtn from './../support/icon/min.png';
import MinDisBtn from './../support/icon/min-dis.png';
import DelBtn from './../support/icon/delete.png';

class cartDetail extends React.Component {
    state = { cart: [] }

    componentDidMount() {
        this.getCart()
    }

    getCart = () => {
        Axios.get('http://localhost:2000/cart/getCart?username=' + this.props.username)
            .then((res) => {
                this.setState({ cart: res.data })
            })
            .catch((err) => console.log(err))
    }

    AddQty = (id) => {
        var qty = 1
        Axios.put('http://localhost:2000/cart/addQty/' + id, { qty })
        .then((res)=>{
            this.getCart()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    MinQty = (id,jumlah) => {
        if (jumlah>1){
        var qty = 1
        Axios.put('http://localhost:2000/cart/minQty/' + id, { qty })
        .then((res)=>{
            this.getCart()
        })
        .catch((err)=>{
            console.log(err)
        })
        }
    }

    DelBtn = (id,index) => {
        var yes = window.confirm(`Are you sure you want to remove ${this.state.cart[index].product} from cart?`)
        if(yes){
            Axios.delete('http://localhost:2000/cart/delCart/'+id)
            .then((res)=>{
                this.getCart()
                swal(`${this.state.cart[index].product}`, 'has been deleted from cart', 'success')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }

    renderCart = () => {
        var jsx = this.state.cart.map((val,index) => {
            return (
                <tr>
                    <td><img src={DelBtn} width='20px' onClick={()=>this.DelBtn(val.id,index)} style={{cursor:'pointer'}} alt='btn'/></td>
                    <td>{index+1}</td>
                    <td><img src={`http://localhost:2000/${val.image}`} width='50px' alt='img-prd'/></td>
                    <td>{val.product}</td>
                    <td>Rp {val.price}</td>
                    <td>{val.discount}%</td>
                    <td>
                        {
                            val.qty == 1 ?
                            <img src={MinDisBtn} width='20px' className='mr-2' onClick={()=>this.MinQty(val.id,val.qty)} style={{cursor:'pointer'}} alt='btn'/>
                            :
                            <img src={MinBtn} width='20px' className='mr-2' onClick={()=>this.MinQty(val.id,val.qty)} style={{cursor:'pointer'}} alt='btn'/>
                        }
                        {val.qty}

                        <img src={AddBtn} width='20px' className='ml-2' onClick={()=>this.AddQty(val.id)} style={{cursor:'pointer'}} alt='btn'/>
                        
                        </td>
                    <td>Rp {(val.price-(val.discount/100*val.price))*val.qty},-</td>
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


    btnCheckOut = () => {
        
        for (var i=0; i<this.state.cart.length; i++){
            var newData = {
                id_user: this.props.idUser,
                id_product: this.state.cart[i].id_product,
                qty: this.state.cart[i].qty,
                paid: 'no',
                date: new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear()
                // invoice: Date.now()
            }
            Axios.post('http://localhost:2000/checkout/success', newData)
            .then((res)=>{
                console.log(res)
                swal("THANKS FOR PURCHASING", "Make Payment Soon", "success")
                this.setState({cart:[]})
                this.getCart()
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        
    }

    render() {
        return (
            <div className='container' style={{ marginTop: '50px'}}>
                {
                    this.props.cart !== 0 ? <p>Cart List</p>
                        : <p>Your cart is empty</p>
                }
                {
                    this.props.cart !== 0 ?
                        <table className='table text-left'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>No</th>
                                <th></th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>  
                        </thead>  
                        <tbody>
                        {this.renderCart()}
                        </tbody>
                            <p style={{fontWeight:'bold'}}>TOTAL: Rp {this.totalPrint()},-</p>
                            <input type='button' value='CheckOut' className='mt-2' style={{ border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px' }} onClick={this.btnCheckOut}/>
                        </table>
                        :
                        <div className='justify-content-center'> 
                        <Link to='/featured-products'><input type='button' value='Continue Shopping' className='mt-2' style={{border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9'}} /></Link>
                        </div>
                }

            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        idUser: state.user.id,
        username: state.user.username,
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps)(cartDetail);