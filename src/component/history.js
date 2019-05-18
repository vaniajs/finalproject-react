import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import Modal from 'react-awesome-modal';

class HistoryDetail extends React.Component {
    state = { historyTrans: [], pendingTrans: [], history: true, pending: false, 
                modalHistory: false,
                detailHistory: [] }

    componentDidMount() {
        this.getPendingTrans()
        this.getHistoryTrans()
    }

    getHistoryTrans = () => {
        Axios.get('http://localhost:2000/checkout/historyTrans?id=' + this.props.idUser)
            .then((res) => {
                this.setState({ historyTrans: res.data })
            })
            .catch((err) => console.log(err))
    }

    getPendingTrans = () => {
        Axios.get('http://localhost:2000/checkout/pendingTrans?id=' + this.props.idUser)
            .then((res) => {
                this.setState({ pendingTrans: res.data })
            })
            .catch((err) => console.log(err))
    }


    btnDetailTrans = (invoice) => {
        this.setState({modalHistory:true})
        Axios.get('http://localhost:2000/checkout/detailHistory?invoice=' + invoice)
        .then((res)=>{
            this.setState({detailHistory:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    renderPending = () => {
        var jsx = this.state.pendingTrans.map((val, index) => {
            return (
                <tr>
                    <td>{val.invoice}</td>
                    <td></td>
                    <td>Rp {val.total}</td>
                    <td><input type='button' value='Detail Checkout' className='mt-2' style={{ border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px' }} onClick={() => this.btnDetail(val.invoice)} />
                        <input type='button' value='Pay Now' className='mt-2' style={{ margin: 'auto', order: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px', marginLeft: '10px' }} onClick={this.btnConfirm} /></td>
                </tr>
            )
        })
        return jsx
    }

    renderHistory = () => {
        var jsx = this.state.historyTrans.map((val, index) => {
            return (
                <tr>
                    <td>{val.invoice}</td>
                    <td></td>
                    <td>Rp {val.total}</td>
                    <td ><input type='button' value='Detail Transaction' className='mt-2' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px' }} onClick={() => this.btnDetailTrans(val.invoice)} />
                    </td>
                </tr>
            )
        })
        return jsx
    }

    renderDetailHistory = () => {
        var jsx = this.state.detailHistory.map((val)=>{
            return(
                <Modal
                style={{
                  fontFamily: "Source Sans Pro",
                  overflowY: "auto",
                  maxHeight: "100vh"
                }}
                visible={this.state.modalHistory}
                width="1000"
                height="500"
                effect="fadeInUp"
                onClickAway={() => this.setState({ modalHistory: false })}>
                <p
                  className="text-left"
                  style={{
                    margin: "20px",
                    fontWeight: "bold"
                  }}>No Invoice {val.invoice}</p>
                <table className='table text-left' style={{margin:'20px'}}>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Product</td>
                            <td>Price</td>
                            <td>Discount</td>
                            <td>Qty</td>
                            <td>Total</td> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img src={`http://localhost:2000/${val.image}`} width='50px' alt='prd-img'/></td>
                            <td>{val.product}</td>
                            {
                                val.discount > 0 ?
                                <td><s style={{fontSize:'12px'}}>Rp {val.price}</s> Rp{val.price-(val.price*val.discount/100)}</td>
                                :                            
                                <td>Rp {val.price} </td>

                            }
                            <td>{val.discount}%</td>
                            <td>{val.qty}</td>
                            <td>Rp {(val.price-(val.price*val.discount/100))*val.qty}</td>

                        </tr>
                    </tbody>
                </table>
    
              </Modal>
            )
        })
        return jsx
    }

    totalPrint = () => {
        var total = 0
        for (var i = 0; i < this.state.cart.length; i++) {
            total += ((this.state.cart[i].price - (this.state.cart[i].discount / 100 * this.state.cart[i].price)) * this.state.cart[i].qty)
        }
        return total
    }



    render() {
        return (
            <div className='container' style={{ marginTop: '50px' }}>
                {
                    this.props.transaction !== 0 ? null
                        : <p>You have no transation history</p>
                }
                {
                    this.props.cart !== 0 && this.state.history == true ?
                        <div>
                            <div className='row'>
                                <div className='col-md-6' style={{ cursor: 'pointer', borderBottomColor: '#E16868', borderBottom: 'solid 2px #E16868' }}>
                                    <p>Transaction History</p>
                                </div>
                                <div className='col-md-6' style={{ cursor: 'pointer' }}>
                                    <p onClick={() => this.setState({ pending: true, history: false })}>Pending Transactions</p>
                                </div>
                            </div>
                            <div className='row'>
                                <table className='table text-left'>
                                    <thead>
                                        <tr>
                                            <th>Invoice No</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.renderHistory()
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div> :
                        this.state.pending == true || this.state.pendingTrans ?
                            <div>
                                <div className='row'>
                                    <div className='col-md-6' style={{ cursor: 'pointer' }}>
                                        <p onClick={() => this.setState({ pending: false, history: true })}>Transaction History</p>
                                    </div>
                                    <div className='col-md-6' style={{ cursor: 'pointer', borderBottomColor: '#E16868', borderBottom: 'solid 2px #E16868' }}>
                                        <p>Pending Transactions</p>
                                    </div>
                                </div>
                                <div className='row'>
                                    <table className='table text-left'>
                                        <thead>
                                            <tr>
                                                <th>Invoice No</th>
                                                <th>Date</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.pendingTrans ?
                                                    this.renderPending()
                                                    :
                                                    <p>You have no pending transactions</p>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            :
                            <div className='justify-content-center'>
                                <Link to='/featured-products'><input type='button' value='Continue Shopping' className='mt-2' style={{ border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9' }} /></Link>
                            </div>
                }

                {/* MODAL HISTORY */}
                <section>
                    {this.renderDetailHistory()}
                </section>


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

export default connect(mapStateToProps)(HistoryDetail);