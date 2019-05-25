import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Modal from 'react-awesome-modal';
import { pendingTransLength } from './../1.actions/checkoutActions';
import Badge from 'react-bootstrap/Badge'


class HistoryDetail extends React.Component {
    state = { historyTrans: [], pendingTrans: [], history: false, pending: false, 
                modalHistory: false,
                detail: [], selectedInvoice : '', modalPay: false, selectedFile:'' }

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
                if(res.data>0){
                    this.setState({pending:true, history:false})
                }
            })
            .catch((err) => console.log(err))
    }

    btnDetailTrans = (invoice) => {
        this.setState({modalHistory:true})
        Axios.get('http://localhost:2000/checkout/detailHistory?invoice=' + invoice)
        .then((res)=>{
            this.setState({detail:res.data, selectedInvoice:invoice})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    btnDetail = (invoice) => {
        this.setState({modalHistory:true})
        Axios.get('http://localhost:2000/checkout/detailPending?invoice=' + invoice)
        .then((res)=>{
            this.setState({detail:res.data, selectedInvoice:invoice})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

   
    btnPay = (invoice) => {
        this.setState({modalPay:true})
        Axios.get('http://localhost:2000/checkout/detailPending?invoice=' + invoice)
        .then((res)=>{
            this.setState({detail:res.data, selectedInvoice:invoice})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    renderPayment = () => {
        var jsx = this.state.detail.map((val)=>{
            return(
                <tbody>
                <tr>{val.product} {val.qty}pc</tr>
                </tbody>

            )
        })
        return jsx
    }

    renderPending = () => {
        var jsx = this.state.pendingTrans.map((val, index) => {
            return (
                <tr>
                    <td>{val.invoice}</td>
                    <td></td>
                    <td>Rp {val.total}</td>
                    
                    {
                        val.paid==='pending'?
                        <td><input type='button' value='Detail Checkout' className='mt-2' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px' }} onClick={() => this.btnDetail(val.invoice)} />
                        <input type='button' value='PENDING' className='mt-2' style={{ opacity:'0.8',padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px', marginLeft: '10px' }} onClick={()=>this.btnPay(val.invoice)} disabled/>
                        </td>
                        :
                        <td>
                        <input type='button' value='Detail Checkout' className='mt-2' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px' }} onClick={() => this.btnDetail(val.invoice)} />
                        <input type='button' value='Pay Now' className='mt-2' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px', marginLeft: '10px' }} onClick={()=>this.btnPay(val.invoice)} />

                        </td>
                    }
                   
                
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

    renderDetail = () => {
        var jsx = this.state.detail.map((val)=>{
            return(
         
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
            )
        })
        return jsx
    }

    totalPrint = () => {
        var total = 0
        for (var i = 0; i < this.state.detail.length; i++) {
            total += ((this.state.detail[i].price - (this.state.detail[i].discount / 100 * this.state.detail[i].price)) * this.state.detail[i].qty)
        }
        return total
    }

    onChangeHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
      }
      

    btnUpload = (invoice) => {
          var formData = new FormData()
          formData.append('payment', this.state.selectedFile, this.state.selectedFile.name)
          Axios.get('http://localhost:2000/checkout?='+invoice)
          Axios
            .put('http://localhost:2000/checkout/payment?invoice='+invoice, formData)
            .then((res) => {
              console.log(res.data)
              this.setState({ modalPay: false, selectedFile:'', history: true})
              this.props.pendingTransLength(this.props.idUser)
              swal('Upload Success!', 'Your transaction will be processed soon', 'success')
            })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div className='container' style={{ marginTop: '50px' }}>
                {
                    this.state.history.length !== 0 ? null
                        : <p>You have no transation history</p>
                }
                {
                    // -------- HISTORY TRANS -------- //
                    this.state.history === true ?
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
                    // -------- PENDING TRANS -------- //
                    // this.state.pending == true || this.state.pendingTrans.length > 0 ?
                            <div>
                                <div className='row'>
                                    <div className='col-md-6' style={{ cursor: 'pointer' }}>
                                        <p onClick={() => this.setState({ pending: false, history: true })}>Transaction History</p>
                                    </div>
                                    <div className='col-md-6' style={{ cursor: 'pointer', borderBottomColor: '#E16868', borderBottom: 'solid 2px #E16868' }}>

                                        <p>Pending Transactions
                                            {
                                                this.state.pendingTrans.length > 0 ?
                                                <Badge pill variant='danger' style={{marginLeft:'-4px', marginTop:'-2px', width:'1%', position:"absolute", zIndex:'-1'}}><div className='danger' style={{color:'#d9534f', fontSize:'8px'}}>*</div></Badge>
                                                :null
                                            }
                                            
                                        </p>
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
                                                    : <p>You have no pending transactions</p>
                                                    
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            // :
                            // <div className='justify-content-center'>
                            //     <Link to='/featured-products'><input type='button' value='Continue Shopping' className='mt-2' style={{ border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9' }} /></Link>
                            // </div>
                }

                {/* MODAL DETAIL */}
                <section>
                <Modal
                style={{
                  fontFamily: "Source Sans Pro",
                  overflowY: "auto",
                  maxHeight: "100vh"
                }}
                visible={this.state.modalHistory}
                width="1200"
                height="600"
                effect="fadeInUp"
                onClickAway={() => this.setState({ modalHistory: false })}>
                <p
                  className="text-left"
                  style={{
                    margin: "20px",
                    fontWeight: "bold"
                  }}>Invoice {this.state.selectedInvoice}</p>
                  <div className='row table-responsive' style={{alignSelf:'auto'}}>
                <table className='text-left table' style={{margin:'20px'}}>
                    <thead>
                        <tr>
                            <td></td>
                            <td><b>Product</b></td>
                            <td><b>Price</b></td>
                            <td><b>Discount</b></td>
                            <td><b>Qty</b></td>
                            <td><b>Total</b></td> 
                        </tr>
                    </thead>
                    {this.renderDetail()}
                    </table>
                    </div>
                    <p>Total: Rp {this.totalPrint()}</p>
                </Modal>
                </section>

                {/* MODAL PAY */}
                <section>
                <Modal
                style={{
                  fontFamily: "Source Sans Pro",
                  overflowY: "auto",
                  maxHeight: "100vh"
                }}
                visible={this.state.modalPay}
                width="800"
                height="500"
                effect="fadeInUp"
                onClickAway={() => this.setState({ modalPay: false })}>
                <p
                  className="text-left"
                  style={{
                    margin: "20px",
                    fontWeight: "bold"
                  }}>Payment Confirmation</p>
                  <div className='table text-left' style={{margin:'20px'}}>
                    <thead>
                        <tr>
                            No Invoice {this.state.selectedInvoice}
                        </tr><hr/>
                    </thead>
                  {this.renderPayment()}<br/>
                  <p><b>Total: Rp {this.totalPrint()}</b></p>
                  <p>Bank Transfer to 162.120.1994 BCA <i>PT Glossier Indonesia</i></p>
                  <label>Upload Payment Proof</label><br/>
                  <input type="file" onChange={this.onChangeHandler} />
                  <input type='button' value='Upload' className='mt-2' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px' }} onClick={() => this.btnUpload(this.state.selectedInvoice)} />


                  </div>

                </Modal>
                </section>


            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        idUser: state.user.id,
        username: state.user.username,
        cart: state.cart.cart,
        trans: state.trans.pendTrans
    }
}

export default connect(mapStateToProps,{pendingTransLength})(HistoryDetail);