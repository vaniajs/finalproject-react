import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { connect } from 'react-redux'
import { cartLength } from '../1.actions/cartActions';
import swal from 'sweetalert';

class Etalase extends React.Component {

    state = { product: [], cart: [] }

    componentDidMount() {
        this.getDataApi()
    }

    getDataApi = () => {
        axios.get('http://localhost:2000/products/getProducts')
            .then((res) => {
                this.setState({ product: res.data })
            })
            .catch((err) => console.log(err))
    }

    btnSearch = () => {

    }

    addToCart = (id_product, id_user) => {
        axios.get('http://localhost:2000/cart/getCart?username=' + this.props.username)
            .then((res)=>{
                if(res.data.length>0){
                    axios.get('http://localhost:2000/cart/getIdCart?id_user='+id_user+'&id_product='+id_product)
                    .then((res)=>{
                        var qty = 1
                        axios.put('http://localhost:2000/cart/addQty/'+ res.data[0].id, {qty}
                        )
                        .then((res2)=>{
                            swal("ITEM HAS BEEN ADDED TO CART", "Make Payment Soon", "success")
                        })
                        .catch((err)=>console.log(err))
                    })
                    .catch((err)=>console.log(err))
                }
                else{
                    var data = {
                        id_user, id_product, qty:1
                    }
                    axios.post('http://localhost:2000/cart/newCart', data)
                    .then((res)=>{
                        console.log(res)
                        swal("ITEM HAS BEEN ADDED TO CART", "Make Payment Soon", "success")
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                }
            })
            .catch((err)=>console.log(err))
    }

    renderJsx = () => {
        const jsx = this.state.product.map((val) => {
            return (
                <Card.Group className="justify-content-center" itemsPerRow={4} style={{margin:"40px"}}>
                <Image src={`http://localhost:2000/${val.image}`} width="150px"/>
                <Card.Content className="text-left mt-1" style={{fontFamily:"Montserrat", fontSize:"12px"}}>
                  <Card.Header>{val.product}</Card.Header>
                  <Card.Meta>Rp {val.price}</Card.Meta>
                  <Card.Meta onClick={()=>this.addToCart(val.id, this.props.id)} style={{cursor:"pointer"}}>Add to Cart</Card.Meta>

                  {/* <Card.Description>{val.description}</Card.Description> */}
                </Card.Content>
                {/* <Card.Content extra>
                  <a>
                    <Icon name='user' />
                    {/* <input type="button" value='Add to Cart' style={{backgroundColor:'none',border:'none'}}/> */}
                  {/* </a>
                </Card.Content> */} 
              </Card.Group>
                // <Card style={{ border: 'none' }} className='col-md-3 ml-3'>
                //     <Link to={'/product/' + val.id}><Image className='mt-2' src={val.image} width='150px' /></Link>
                //     <Card.Content className='text-left mt-2' >
                //         <Card.Header className='mt-2' style={{ fontSize: '12px', fontWeight: '600', color: '#5C5C5C', backgroundColor: 'transparent', fontFamily: "Montserrat" }}>{val.product}</Card.Header>
                //         {
                //             val.diskon === 0 ?
                //                 <Card.Meta className='mb-3' style={{ color: '#E16868', fontWeight: '600', fontFamily: "Montserrat", fontSize: '14px' }}>Rp {val.price},00</Card.Meta>
                //                 :
                //                 <div><Card.Meta style={{ color: '#E16868', fontWeight: '600', fontFamily: "Montserrat", fontSize: '14px' }}>Rp {val.price - (val.price * val.discount / 100)},00</Card.Meta>
                //                     <Card.Meta style={{ fontSize: '13px' }}><s><i>Rp {val.price},00</i></s>
                //                         <p className='d-inline ml-2' style={{ backgroundColor: '#E16868', color: 'white', paddingRight: '2px', fontFamily: "Montserrat" }}> {val.discount}%</p></Card.Meta></div>
                //         }

                //     </Card.Content>
                //     <Card.Content extra>
                //         {/* <button className='float-left mt-2' style={{border:'none',borderRadius:'50px',paddingLeft:'18px', paddingRight:'18px',backgroundColor:'#ff1493',color:'white'}}> */}
                //         <button onClick={() => this.addToCart(val.id, this.props.id, val.nama, val.harga, val.img, val.diskon)} className='float-left mt-2 mb-2' style={{ fontFamily: "Montserrat", border: 'none', fontSize: '12px', fontWeight: '100', paddingLeft: '0px', color: '#E16868', backgroundColor: 'transparent' }}>
                //             Add to Cart <i className="fas fa-shopping-cart" />
                //         </button>
                //     </Card.Content>
                // </Card>
            )
        })
        return jsx
    }

    render() {
        return (
            <div className="container" style={{marginTop:"100px"}}>
                <div className="row">
                {this.renderJsx()}
                </div>
            </div>

            // <div className='container mt-4' style={{ marginBottom: '100px' }}>
            //     {/* <div className='mb-3 justify-content-end' style={{width:'120px' , padding:'5px', fontSize:'18px',color:'white',fontWeight:'bolder',backgroundColor:'#ff1493'}}><center>HOT ITEMS</center></div> */}
            //     <div className='row justify-content-end'>
            //         <div className='col-md-3'>
            //             <i className="fas fa-search ml-3" style={{ marginTop: '12px', position: "absolute" }} /><input type='text' placeholder='       Search' style={{ position: "relative", padding: '8px', border: 'none', borderRadius: '50px', backgroundColor: '#FFF9F9', color: "#5C5C5C" }} onChange={this.btnSearch} />
            //         </div>
            //         <div className='col-md-9'>
            //             <div className='row'>
            //                 <div className='ml-3 mb-3 justify-content-end' style={{ width: '120px', padding: '5px', fontSize: '18px', color: 'white', fontWeight: '800', backgroundColor: '#E16868' }}><center>HOT ITEMS</center></div>
            //             </div>
            //             <div className='row'>
            //                 {this.renderJsx()}
            //             </div>
            //         </div>
            //     </div>
            // </div>
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

export default connect(mapStateToProps, { cartLength })(Etalase);