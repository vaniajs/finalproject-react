import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';

class MngProduct extends React.Component {

    state = { rows: [], edit: false, selectEdit: 0 }
    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get('http://localhost:2000/products/getProducts')
            .then((res) => this.setState({ rows: res.data }))
            .catch((err) => console.log(err))
    }

    btnDelete = (par) => {
        axios.delete('http://localhost:2000/products/' + par)
            .then((res) => {
                this.getData()
            })
            .catch((err) => console.log(err))
    }

    // btnEdit = (par) => {
    //     this.setState({ edit: true })
    //     alert(par)
    // }

    btnEdit = () => {
        return(
<Modal trigger={<Button>Scrolling Content Modal</Button>}>
    <Modal.Header>Profile Picture</Modal.Header>
    <Modal.Content image scrolling>
      <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' wrapped />

      <Modal.Description>
        <Header>Modal Header</Header>
        <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
          <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' style={{ paddingBottom: 5 }} />
      </Modal.Description>
    </Modal.Content>
    <Modal.Actions>
      <Button primary>
        Proceed <Icon name='chevron right' />
      </Button>
    </Modal.Actions>
  </Modal>
        )}

    btnCancel = () => {
        this.setState({selectEdit: 0})
    }

    btnSave = () => {
        var nama = this.refs.nama.value
        var harga = this.refs.harga.value
        var diskon = this.refs.disc.value
        var desc = this.refs.desc.value
        var img = this.refs.img.value
        var qty = this.refs.qty.value
        var category = this.refs.ctgry.value
        var newProduct = { nama, harga, diskon, desc, img, qty, category }
        axios.post('http://localhost:2000/products', newProduct)
            .then((res) => {
                console.log(res)
                this.getData()
            })
            .catch((err) => console.log(err))
    }

    printData = () => {
        var jsx = this.state.rows.map((val) => {
            return (
                
                    this.state.selectEdit===val.id?
                    <tr style={{ fontSize: "12px" }}>
                    <td>{val.id}</td>
                    <td><input ref="namaEdit" type="text" defaultValue={val.product}/></td>
                    <td><input ref="hargaEdit" type="text" defaultValue={val.price}/></td>
                    <td><input ref="diskonEdit" type="text" defaultValue={val.discount}/></td>
                    <td><input className="text-area" style={{ overflowY: "scroll", height: "80px", width:"400px" }} defaultValue={val.description}/></td>
                    <td><input ref="imgEdit" type="text" defaultValue={val.image}/></td>
                    <td><input ref="namaEdit" type="text" defaultValue={val.qty}/></td>
                    <td><input ref="namaEdit" type="text" defaultValue={val.category}/></td>
                    <td><input type="button" value="Save" className="btn btn-success" onClick={() => this.btnSaveEdit(val.id)} /></td>
                    <td><input type="button" value="Cancel" className="btn btn-danger" onClick={this.btnCancel} /></td>
                </tr>
                :
                <tr style={{ fontSize: "12px" }}>
                    <td>{val.id}</td>
                    <td>{val.product}</td>
                    <td>{val.price}</td>
                    <td>{val.discount}</td>
                    <td><div className="text-area" style={{ overflowY: "scroll", height: "80px", width:"400px" }}>{val.description}</div></td>
                    <td><img src={val.image} width="80px" /></td>
                    <td>{val.qty}</td>
                    <td>{val.category}</td>
                    <td><input type="button" value="Edit" className="btn btn-warning" onClick={() => this.setState({selectEdit:val.id})} /></td>
                    <td><input type="button" value="Delete" className="btn btn-danger" onClick={() => this.btnDelete(val.id)} /></td>
                </tr>
                
            )
        })
        return jsx
    }

    render() {
        if(this.props.role === 'admin'){
        return (
            <div className="container-fluid">
            <div className="row justify-content-sm-center justify-content-m-center ml-auto mr-auto mt-3" style={{marginTop:"200px"}}>
                <table className="col-md-12 col-12 table text-left">
                    <tr style={{ fontWeight: "bolder" }}>
                        <td>ID</td>
                        <td>Product</td>
                        <td>Price</td>
                        <td>Discount</td>
                        <td>Description</td>
                        <td>Pict</td>
                        <td>Qty</td>
                        <td>Category</td>
                    </tr>
                    {this.printData()}
                </table></div>
                {/* <div className="row"><p>Add New Product</p>
                    <table className="table text-left ml-3">
                        <tr style={{ fontWeight: "bolder" }}>
                            {/* <td>ID</td> */}
                            {/* <td>Product</td>
                            <td>Price</td>
                            <td>Discount</td>
                            <td>Description</td>
                            <td>Pict</td>
                            <td>Qty</td>
                            <td>Category</td>
                        </tr>
                        <tr style={{ fontSize: "12px" }}>
                            <td><input ref='nama' type="text" placeholder="product name" /></td>
                            <td><input ref='harga' type="number" placeholder="price(idr)" /></td>
                            <td><input ref='disc' type="text" placeholder="discount(%)" /></td>
                            <td><input ref='desc' type="text" placeholder="description" /></td>
                            <td><input ref='img' type="text" placeholder="img url" /></td>
                            <td><input ref='qty' type="text" placeholder="qty" /></td>
                            <td><input ref='ctgry' type="text" placeholder="category" /></td>
                        </tr>
                    </table> */}
                    {/* <div className="row">
                        <input type="button" value="Save" className="btn btn-success" style={{ marginBottom: "80px" }} onClick={this.btnSave} />
                    </div>
                </div> */} 
            </div>
        )
        }
        else{
            return(
            <div className="text-center" style={{fontFamily:"Montserrat", fontWeight:"bolder", marginTop:"200px", color:"#5C5C5C"}}>
                <h1>404.<br/>
                    Page Not Found :(</h1>
                <Link to='/'><p style={{color:"#E16868"}}>Return to Home</p></Link>
            </div>
            )
        }
            
        
    }
};

const mapStateToProps = (state)=> {
    return{
        role: state.user.role
    }
}

export default connect(mapStateToProps)(MngProduct);