import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { updateCart } from '../1.actions';
import swal from 'sweetalert';

class Etalase extends React.Component {

    state = { product: [], cart: [] }

    componentDidMount() {
        this.getDataApi()
        axios.get('http://localhost:2000/cart?idUser=' + this.props.id)
                    .then((res) => {
                        alert(res.data.length)
                        this.props.cart(res.data.length)})
                    .catch((err) => console.log(err))
    }

    getDataApi = () => {
        axios.get('http://localhost:2000/products')
            .then((res) => {
                this.setState({ product: res.data })
                // axios.get('http://localhost:2000/cart?idUser=' + this.props.id)
                //     .then((res) => {
                //         alert(res.data.length)
                //         this.props.cart(res.data.length)})
                //     .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    btnSearch = () => {

    }

    addToCart = (idProduk, idUser, nama, harga, img) => {
        //return(dispatch)=>{
        axios.get('http://localhost:2000/cart?idUser=' + idUser + '&idProduk=' + idProduk)
            .then((res) => {
                if (res.data.length > 0) {
                    // var newQty = res.data[0].qty+1
                    axios.put('http://localhost:2000/cart/' + res.data[0].id, {
                        idProduk, idUser, nama, harga, img, qty: res.data[0].qty + 1
                    })
                        .then((res) => {
                            console.log(res)
                            swal("ITEM HAS BEEN ADDED TO CART", "Make Payment Soon", "success")
                        })
                        .catch((err) => console.log(err))
                }
                else {
                    axios.post('http://localhost:2000/cart', {
                        idProduk, idUser, nama, harga, img, qty: 1
                    })
                        .then((res) => {
                            console.log(res)
                            axios.get('http://localhost:2000/cart?idUser='+this.props.id)
                                .then((res) => {
                                    this.setState({ cart: res.data })
                                    this.props.updateCart(this.state.cart.length)
                                })
                            swal("ITEM HAS BEEN ADDED TO CART", "Make Payment Soon", "success")
                        })
                        .catch((err) => console.log(err))
                }
            })
            .catch((err) => console.log(err))



    }
    //}

    // addToCart = (idProduk,idUser,nama,harga,img) => {
    //     this.props.addToCart(idProduk,idUser,nama,harga,img)
    //     axios.get('http://localhost:2000/cart?idUser=12')
    //     .then((res)=>{
    //         // this.setState({cart:res.data})
    //         this.props.updateCart(res.data.length)
    //         })
    //     .err((err)=>console.log(err))
    //     swal ("ITEM HAS BEEN ADDED TO CART","Make Payment Soon","success")
    // }

    renderJsx = () => {
        const jsx = this.state.product.map((val) => {
            return (
                <Card style={{ border: 'none' }} className='col-md-3 ml-3'>
                    <Link to={'/product/' + val.id}><Image className='mt-2' src={val.img} width='150px' /></Link>
                    <Card.Content className='text-left mt-2' >
                        <Card.Header className='mt-2' style={{ fontSize: '12px', fontWeight: '600', color: '#5C5C5C', backgroundColor: 'transparent', fontFamily: "Montserrat" }}>{val.nama}</Card.Header>
                        {
                            val.diskon === 0 ?
                                <Card.Meta className='mb-3' style={{ color: '#E16868', fontWeight: '600', fontFamily: "Montserrat", fontSize: '14px' }}>Rp {val.harga},00</Card.Meta>
                                :
                                <div><Card.Meta style={{ color: '#E16868', fontWeight: '600', fontFamily: "Montserrat", fontSize: '14px' }}>Rp {val.harga - (val.harga * val.diskon / 100)},00</Card.Meta>
                                    <Card.Meta style={{ fontSize: '13px' }}><s><i>Rp {val.harga},00</i></s>
                                        <p className='d-inline ml-2' style={{ backgroundColor: '#E16868', color: 'white', paddingRight: '2px', fontFamily: "Montserrat" }}> {val.diskon}%</p></Card.Meta></div>
                        }

                    </Card.Content>
                    <Card.Content extra>
                        {/* <button className='float-left mt-2' style={{border:'none',borderRadius:'50px',paddingLeft:'18px', paddingRight:'18px',backgroundColor:'#ff1493',color:'white'}}> */}
                        <button onClick={() => this.addToCart(val.id, this.props.id, val.nama, val.harga, val.img, val.diskon)} className='float-left mt-2 mb-2' style={{ fontFamily: "Montserrat", border: 'none', fontSize: '12px', fontWeight: '100', paddingLeft: '0px', color: '#E16868', backgroundColor: 'transparent' }}>
                            Add to Cart <i className="fas fa-shopping-cart" />
                        </button>
                    </Card.Content>
                </Card>
            )
        })
        return jsx
    }

    render() {
        return (

            <div className='container mt-4' style={{ marginBottom: '100px' }}>
                {/* <div className='mb-3 justify-content-end' style={{width:'120px' , padding:'5px', fontSize:'18px',color:'white',fontWeight:'bolder',backgroundColor:'#ff1493'}}><center>HOT ITEMS</center></div> */}
                <div className='row justify-content-end'>
                    <div className='col-md-3'>
                        <i className="fas fa-search ml-3" style={{ marginTop: '12px', position: "absolute" }} /><input type='text' placeholder='       Search' style={{ position: "relative", padding: '8px', border: 'none', borderRadius: '50px', backgroundColor: '#FFF9F9', color: "#5C5C5C" }} onChange={this.btnSearch} />
                    </div>
                    <div className='col-md-9'>
                        <div className='row'>
                            <div className='ml-3 mb-3 justify-content-end' style={{ width: '120px', padding: '5px', fontSize: '18px', color: 'white', fontWeight: '800', backgroundColor: '#E16868' }}><center>HOT ITEMS</center></div>
                        </div>
                        <div className='row'>
                            <h1>{this.props.cart}{this.props.id}</h1>
                            {this.renderJsx()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        cart: state.cart.cart

    }
}

export default connect(mapStateToProps, { updateCart })(Etalase);