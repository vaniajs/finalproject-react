import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { cartLength } from '../1.actions/cartActions';
import swal from 'sweetalert';

class Skin extends React.Component {

    state = { product: [], cart: [], dataFilter: [], searchFilter: '' }

    componentDidMount() {
        this.getDataApi()
    }

    getDataApi = () => {
        axios.get('http://localhost:2000/products/skin')
            .then((res) => {
                this.setState({ product: res.data })
            })
            .catch((err) => console.log(err))
    }

    searchFn = () => {
        this.setState({searchFilter: this.refs.search.value})
    }
   
    addToCart = (id_product, id_user, idx) => {
        axios.get('http://localhost:2000/cart/getCart?username=' + this.props.username + '&id_product=' +id_product)
            .then((res) => {
                if (res.data.length > 0) {
                    axios.get('http://localhost:2000/cart/getIdCart?id_user=' + id_user + '&id_product=' + id_product)
                        .then((res2) => {
                            if(res2.data.length>0){
                            var qty = 1
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
                                    id_user, id_product, qty: 1
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
                        id_user, id_product, qty: 1
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


    renderJsx = () => {
        var searchFilter = this.state.product.filter((val => {
            return (val.product.toLowerCase().startsWith(this.state.searchFilter))
        }))
        const jsx = searchFilter.map((val, idx) => {
            return (
                <Card.Group className="justify-content-center" itemsPerRow={4} style={{ margin: "40px" }}>
                    {
                        val.discount > 0 ? <div className='justify-content-center' style={{ alignContent: 'center', marginLeft: '100px', marginTop: '-10px', position: 'absolute', borderRadius: '20px', height: '25px', width: '60px', backgroundColor: '#E16868', color: '#FFF9F9', fontWeight: '400' }}>{val.discount}%</div>
                            : null
                    }
                    <Link to={'/product-detail/' + val.id}><Image src={`http://localhost:2000/${val.image}`} width="150px" /></Link>
                    <Card.Content className="text-left mt-1" style={{ fontFamily: "Montserrat", fontSize: "12px" }}>
                        <Card.Header>{val.product}</Card.Header>
                        {
                            val.discount > 0 ? <Card.Meta><s>Rp {val.price}</s> Rp {val.price - (val.price * val.discount / 100)}</Card.Meta>
                                : <Card.Meta> Rp {val.price}</Card.Meta>

                        }
                        {
                            this.props.id !== 0 ?
                                <Card.Meta onClick={() => this.addToCart(val.id, this.props.id, idx)} style={{ cursor: "pointer" }}>Add to Cart</Card.Meta>
                                : null
                        }
                    </Card.Content>
                </Card.Group>
            )
        })
        return jsx
      }

    render() {
        return (
            <div>
               
            <div className="container-fluid row" style={{ marginTop: "100px", marginLeft:'200px', marginRight:'200px', maxWidth:'1200px', marginBottom:'200px' }}>
          
            {this.renderJsx()}

          
                <div style={{ alignItems:'right', position:'fixed' ,marginTop: "0px", marginLeft: '1200px', fontFamily: 'Montserrat', color: "#5C5C5C", fontSize: '14px' }}>
                        <div className="p-2">Search</div>
                        <input type="text" ref='search' className="text-center searchbox" placeholder="type your search" onChange={this.searchFn} />
                    </div>
            </div>
           
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        cart: state.cart.cart,
        username: state.user.username

    }
}

export default connect(mapStateToProps, { cartLength })(Skin);

