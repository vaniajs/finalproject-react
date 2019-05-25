import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import './../support/cssmix.css';

class ProductDetail extends React.Component {
    state = { product: [], proteksi:'' }

    componentDidMount() {
        this.getDataApi()
        // this.proteksiJmlh()
    }

    proteksiJmlh=()=>{
        var jumlah = this.refs.jumlah.value
        if (jumlah<1){
            this.setState({proteksi:'Min pembelian 1pc'})
        }else{
            this.setState({proteksi:''})
        }
    }
    
    fnAlert=()=>{
        alert('Please register to purchase item')
    }

    addToCart = (id_product, id_user, idx) => {
        axios.get('http://localhost:2000/cart/getCart?username=' + this.props.username + '&id_product=' +id_product)
            .then((res) => {
                if (res.data.length > 0) {
                    axios.get('http://localhost:2000/cart/getIdCart?id_user=' + id_user + '&id_product=' + id_product)
                        .then((res2) => {
                            if(res2.data.length>0){
                            var qty = this.refs.jumlah.value
                            axios.put('http://localhost:2000/cart/addQty/' + res.data[0].id, { qty }
                            )
                                .then((res2) => {
                                    swal(`${this.state.product[idx].product}`,"HAS BEEN ADDED TO CART", "success")
                                    this.props.cartLength(this.props.username)
                                })
                                .catch((err) => console.log(err))
                            }
                            else{
                                var data = {
                                    id_user, id_product, qty: this.refs.jumlah.value
                                }
                                axios.post('http://localhost:2000/cart/newCart', data)
                                    .then((res) => {
                                        console.log(res)
                                        swal(`${this.state.product[idx].product}`,"HAS BEEN ADDED TO CART", "success")
                                        this.props.cartLength(this.props.username)

                                    })
                                    .catch((err) => {
                                        console.log(err)
                                    })
                            }
                        })
                        .catch((err) => console.log(err))
                }
                else {
                    var data = {
                        id_user, id_product, qty: this.refs.jumlah.value
                    }
                    axios.post('http://localhost:2000/cart/newCart', data)
                        .then((res) => {
                            console.log(res)
                            swal(`${this.state.product[idx].product}`,"HAS BEEN ADDED TO CART", "success")
                            this.props.cartLength(this.props.username)

                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            .catch((err) => console.log(err))
    }

    getDataApi = () => {
        var id = this.props.match.params.id
        axios.get('http://localhost:2000/products/productDetail/' + id)
            .then((res) => {
                console.log(res)
                this.setState({ product: res.data })

            })
            .catch((err) => {
                console.log(err)
            })
    }

    printDetail = () => {
        var jsx = this.state.product.map((val,idx) => {
            return (
                <div className='row' style={{ marginTop: '85px' }} >
                    <div className='col-md-4 text-left'>
                        <div className="card" style={{ width: '100%' }}>
                            <img className="card-img-top" src={`http://localhost:2000/${val.image}`} alt="Card cap" />
                           
                        </div>
                    </div>
                    <div className='col-md-6 text-left' style={{fontFamily:'Source Sans Pro'}}>
                        <h1 style={{ color: '#5C5C5C', fontSize: '20px', fontWeight:"bolder", fontFamily:'Montserrat' }}>{val.product}</h1>
                        <hr></hr>

                        {
                            val.discount>0?
                            <div style={{ backgroundColor: '#E16868', width: '50px', height: '24px', textAlign: 'center', color: 'white', display: 'inline-block', verticalAlign: 'center', fontWeight: '500' }}>{val.discount}%</div>
                            :null
                            
                        }
                        {
                            val.discount>0?
                            <span style={{ fontWeight: '600', fontSize: '14px', color: '#E16868', marginLeft: '10px', textDecoration: 'line-through' }} >Rp {val.price}</span>:
                            null
                        }
                       
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#FF5722', marginTop: '5px' }}>Rp {val.price - (val.price * val.discount / 100)}</div>

                        <div className='row'>
                            <div className='col-md-3 text-left'>
                                <div style={{ marginTop: '5px', fontWeight: '700', color: '#5C5C5C', fontSize: '12px' }}>Pcs</div>
                                <input ref='jumlah' type="number" min={1} className='form-control' style={{ fontSize: '12px', width: '60px', marginTop: '3px' }} onChange={this.proteksiJmlh} defaultValue='1' />
                                <p style={{ color: 'red', fontSize: '10px' }}>{this.state.proteksi}</p>
                            </div>
                            {/* <div className='col-md-3 text-left'>
                                <div style={{ marginTop: '5px', fontWeight: '700', color: '#5C5C5C', fontSize: '12px' }}>Stock</div>
                                <input type="text" style={{ fontSize: '12px', width: '60px', marginTop: '3px' }} value={val.qty} />
                            </div> */}
                        </div>

                        <div className='row'>
                            <div className="col-md-12 text-left">
                                <p style={{ color: '#5C5C5C', fontSize: '14px', marginTop: '-5px' }}><b>Description</b><br /></p>
                                <p style={{ color: '#5C5C5C', fontSize: '12px', marginTop: '-10px' }}>{val.description}</p>
                            </div>
                        </div>
                        {
                            this.props.username !== '' ?
                                <div className='row mt-1'>
                                    
                                    <div className='col-md-3 mb-2'>
                                    <input type="button" style={{ border: "none", backgroundColor: "#E16868", borderRadius: "20px", padding:'10px',fontWeight:'bolder', color: "white", height: "40px" }} value="Add to Cart" onClick={()=>this.addToCart(val.id,this.props.idUser,idx)}/>
                                    {/* className="col-md-2 text-center" */}
                                        {/* <input type='button' style={{ width: '100%', fontSize: '12px', fontWeight: '500' }} className='btn btn-success' value='Add to Cart' /> */}
                                    </div>
                                    
                                </div>
                                : <div>
                                    <div className='row mt-4'>
                                        
                                        <div className='col-md-3 mb-2'>
                                    <input type="button" style={{cursor:'default', border: "none", backgroundColor: "#E16868", borderRadius: "20px", padding:'8px', fontWeight:'bolder', color: "white", height: "40px", fontSize:'14px', opacity:'0.5'}} value="Add to Cart" onClick={this.fnAlert}/>
                                        </div>
                                    </div>
                                    <h8 className='acc'>Don't have any account yet? Register <Link to='/register' className='reg'>here</Link> </h8>
                                </div>
                        }


                    </div>
                </div>
                )
        })
        return jsx
    }

    render() {
        return (
            <div className='container' style={{ fontFamily: "Source Sans Pro" }}>
                    {this.printDetail()}
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        idUser: state.user.id
    }
}
export default connect(mapStateToProps)(ProductDetail);