import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProductDetail extends React.Component {
    state={product:{},proteksi:''}

    componentDidMount(){
        this.getDataApi()
        this.proteksiJmlh()

    }

    getDataApi=()=>{
        var idUrl = this.props.match.params.id
        axios.get('http://localhost:2000/products/'+ idUrl)
        .then((res)=>{
            console.log(res)
            this.setState({product:res.data})

        })
        .catch((err)=>{
            console.log(err)
        })
    }

    proteksiJmlh=()=>{
        var jumlah = this.refs.jumlah.value
        if (jumlah<1){
            this.setState({proteksi:'Min pembelian 1pc'})
        }else{
            this.setState({proteksi:''})
        }
    }

    render() {
        var {nama,img,diskon,desc,harga,ctgry,brand,qty} = this.state.product
        return (
            <div className='container' style={{fontFamily: "Montserrat"}}>
                <div className='row' style={{marginTop:'85px'}}>
                    <div className='col-md-4 text-left'>
                        <div className="card" style={{ width: '100%' }}>
                            <img className="card-img-top" src={img} alt="Card cap" />
                            {/* <div className="card-body">
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div> */}
                        </div>
                    </div>
                    <div className='col-md-8 text-left'>
                        <h1 style={{color:'#5C5C5C',fontSize:'20px'}}>{nama}</h1>
                        <h1 style={{color:'#5C5C5C',fontSize:'16px',fontWeight:'700'}}>{brand}</h1>
                        <hr></hr>

                        <div style={{backgroundColor:'#E16868',width:'50px',height:'24px', textAlign:'center', color:'white', display:'inline-block',verticalAlign:'center',fontWeight:'500'}}>{diskon}%</div>
                        <span style={{fontWeight:'600', fontSize:'14px', color:'#E16868', marginLeft:'10px', textDecoration:'line-through'}} >Rp {harga}</span>
                        <div style={{fontSize:'16px', fontWeight:'700',color:'#FF5722', marginTop:'5px'}}>Rp {harga - (harga*diskon/100)}</div>
                        
                        <div className='row'>
                            <div className='col-md-3 text-left'>
                            <div style={{marginTop:'5px',fontWeight:'700', color:'#5C5C5C',fontSize:'12px'}}>Pcs</div>
                            <input ref='jumlah' type="number" min={1} className='form-control' style={{fontSize:'12px' ,width:'60px', marginTop:'3px'}} onChange={this.proteksiJmlh} defaultValue='1'/>
                            <p style={{color:'red',fontSize:'10px'}}>{this.state.proteksi}</p>
                            </div>
                            <div className='col-md-3 text-left'>
                            <div style={{marginTop:'5px',fontWeight:'700', color:'#5C5C5C',fontSize:'12px'}}>Stock</div>
                            <input type="text"style={{fontSize:'12px' ,width:'60px', marginTop:'3px'}} value={qty}/>
                        </div>
                        </div>

                        <div className='row'>
                            <div className="col-md-12 text-left">
                            <p style={{color:'#5C5C5C',fontSize:'14px',marginTop:'-5px'}}><b>Description</b><br/></p>
                            <p style={{color:'#5C5C5C',fontSize:'12px',marginTop:'-10px'}}>{desc}</p>
                            </div>
                        </div>
                        {
                            this.props.username !== '' ?
                            <div className='row mt-1'>
                            <div className='col-md-3'>
                            <input style={{width:'100%',fontSize:'12px',fontWeight:'500'}} className='btn border-secondary' value='Add to Wishlist'/>
                            </div>
                            <div className='col-md-3'>
                            <input style={{width:'100%', fontSize:'12px',fontWeight:'500'}} className='btn btn-primary' value='Purchase Now'/>
                            </div>
                            <div className='col-md-3 mb-2'>
                            <input style={{width:'100%', fontSize:'12px',fontWeight:'500'}} className='btn btn-success' value='Add to Cart'/>
                            </div>
                            {/* <input className='btn btn-primary col-md-3' value='Beli Sekarang'/>
                            <input className='btn btn-success col-md-2' value='Masukkan ke Keranjang'/> */}
                            </div>
                        :   <div>
                            <div className='row mt-4'>
                            <div className='col-md-2'>
                            <input style={{width:'100%',fontSize:'12px',fontWeight:'500'}} disabled className='btn border-secondary' value='Add to Wishlist'/>
                            </div>
                            <div className='col-md-3'>
                            <input style={{width:'100%', fontSize:'12px',fontWeight:'500'}} disabled className='btn btn-primary' value='Beli Sekarang'/>
                            </div>
                            <div className='col-md-3 mb-2'>
                            <input style={{width:'100%', fontSize:'12px',fontWeight:'500'}} disabled className='btn btn-success' value='Masukkan ke Keranjang'/>
                            </div>
                            </div>
                            <h8>Don't have any account yet? <Link to = '/register'>Register</Link></h8>
                            </div>
                        }  
                        
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        username: state.user.username
    }
}
export default connect(mapStateToProps)(ProductDetail);