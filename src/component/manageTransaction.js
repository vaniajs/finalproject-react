import React from 'react';
import Axios from 'axios';
import Modal from 'react-awesome-modal';
import swal from 'sweetalert';


class ManageTransaction extends React.Component{
    state = {data:[], modal: false, selectedInvoice:'', img:''}

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        Axios.get('http://localhost:2000/checkout/allTrans')
        .then((res)=>{
            console.log(res)
            this.setState({data:res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    fnModal = (invoice, url) => {
        this.setState({selectedInvoice:invoice, modal: true, img:url})

    }

    btnConfirm = (invoice) => {
        Axios.put('http://localhost:2000/checkout/payment-success/'+invoice)
        .then((res)=>{
            this.getData()
            swal('Payment Confirmed', 'Please process the shipment soon', 'success')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    btnDecline = (invoice) => {
        Axios.put('http://localhost:2000/checkout/payment-declined/'+invoice)
        .then((res)=>{
            this.getData()
            swal('Payment Declined', 'Transaction will not be processed', 'warning')
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    printData = () => {
        var jsx = this.state.data.map((val)=>{
            return(
                <tr>
                    <td>{val.invoice}</td>
                    <td>{val.id_user}</td>
                    <td>Rp {val.total}</td>
                    <td>
                        <img src={`http://localhost:2000/${val.payment}`} width='50px' style={{cursor:'pointer'}} onClick={()=>this.fnModal(val.invoice,val.payment)} alt='btn'/>
                    </td>
                    <td>
                        {
                            val.paid === 'declined' ? 'Declined' :
                            val.paid === 'yes' ? 'Completed'  : <div><input type='button' value='Confirm' className='mt-2' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px', marginLeft: '10px' }} onClick={()=>this.btnConfirm(val.invoice)} />
                            <input type='button' value='Decline' className='mt-2' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px', marginLeft: '10px' }} onClick={()=>this.btnDecline(val.invoice)} /></div>
                        }
                    </td>    


                </tr>
            )
        })
        return jsx
    }

    render(){
        return(
            <div className='container' style={{marginTop:'20px'}}>
            <p>Manage Transaction</p>
                <div className='row'>
                    <table className='table text-left'>
                        <thead>
                            <tr>
                                <td>No Invoice</td>
                                <td>User ID</td>
                                <td>Total Transaction</td>
                                <td>Payment Proof</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.printData()}
                        </tbody>
                    </table>
                </div>


                {/* MODAL PAYMENT PROOF */}
                <section>
                <Modal
                style={{
                  fontFamily: "Source Sans Pro",
                  overflowY: "auto",
                  maxHeight: "100vh"
                }}
                visible={this.state.modal}
                width="800"
                height="500"
                effect="fadeInUp"
                onClickAway={() => this.setState({ modal: false })}>
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
                    <center><img src={`http://localhost:2000/${this.state.img}`} width='650px' alt='btn'/></center>

                  </div>

                </Modal>
                </section>
            </div>
        )
    }
};

export default ManageTransaction;
