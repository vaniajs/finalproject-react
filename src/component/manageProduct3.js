import React from 'react';
import axios from 'axios';
// import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import Modal from 'react-awesome-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import swal from 'sweetalert';




class ManagePrd extends React.Component{
    state = { rows: [], edit: false, dataEdit:{}, visible:false, visibleEdit: false, selectedFile: null,
            ctgry:[]}
    
    openModal() {
        this.setState({
            visible : true
        });
    }

    componentDidMount() {
        this.getData()
        this.getCategory()
    }

    onChangeHandler = (event) => {
        this.setState({selectedFile:event.target.files[0]})
    }

    btnCancel = () => {
        this.setState({selectEdit: 0})
    }

    btnDelete = (id) => {
        var yes = window.confirm('Are you sure you want to delete?')
    if (yes) {
      axios.delete('http://localhost:2000/products/deleteProduct/' + id)
        .then((res) => {
            this.getData()
        alert('Berhasil')
    })
        .catch((err) => console.log(err))
    }
    else {
      this.setState({ selectEDit: 0 })
    }
    }

    addProduct = () => {
        var newData = {
            product : this.refs.product.value,
            price : parseInt(this.refs.price.value),
            discount : parseInt(this.refs.discount.value),
            qty : parseInt(this.refs.qty.value),
            id_category : this.refs.category.value,
            description : this.refs.description.value
        } 
        // var product = this.refs.product.value
        // var price = parseInt(this.refs.price.value)
        // var discount = parseInt(this.refs.discount.value)
        // var qty = parseInt(this.refs.qty.value)
        // var category = this.refs.category.value
        // var description = this.refs.description.value
       // alert(newData.product+newData.price+newData.discount+newData.qty+newData.category+newData.description)
       // alert(this.refs.description.value)
       
       var formData = new FormData()
        formData.append('image',this.state.selectedFile,this.state.selectedFile.name)
        formData.append('data',JSON.stringify(newData))
        axios.post('http://localhost:2000/products/addProduct',formData)
        .then((res)=>{
            console.log(res.data)
            this.setState({visible:false})
            this.getData()
            alert('New Product Added')
        })
        .catch((err)=>console.log(err))
    }

    saveProduct = () => {
        var newData = {
            product : this.refs.productEdit.value,
            price : parseInt(this.refs.priceEdit.value),
            discount : parseInt(this.refs.discountEdit.value),
            qty : parseInt(this.refs.qtyEdit.value),
            id_category : this.refs.categoryEdit.value,
            description : this.refs.descriptionEdit.value
          }
        //   if(this.state.selectedFileEdit){
        //     var fd = new FormData()
        //     fd.append('edit',this.state.selectedFileEdit)
        //     fd.append('dataBaru', JSON.stringify(newData))
        //     //UNTUK DAPETIN PATH YG MAU DIHAPUS
        //     fd.append('imageBefore', this.state.dataEdit.product_image)
        //     axios.put('http://localhost:4000/edit/'+this.state.dataEdit.id, fd)
        //     .then((res)=>{
        //       console.log(res)
        //       this.setState({modal:false})
        //       this.getProduct()
        //       alert(res.data)
        //     })
        //     .catch((err)=>console.log(err))
        //   }else{
        //     axios.put('http://localhost:4000/edit/'+this.state.dataEdit.id,newData)
        //     .then((res)=>{
        //       console.log(res)
        //       this.setState({modal:false})
        //       this.getProduct()
        //       alert(res.data)
        //     })
        //     .catch((err)=>console.log(err))
        //   }
    }
    getCategory = () => {
        axios.get('http://localhost:2000/products/getCategory')
        .then((res)=>this.setState({ctgry:res.data}))
        .catch((err)=>console.log(err))
    }

    printCategory = () => {
        var jsx = this.state.ctgry.map((val,idx)=>{
            return(
            <option value={val.id}>{val.category}</option>
            )
        })
        return jsx
    }

    getData = () => {
        axios.get('http://localhost:2000/products/getProducts')
            .then((res) => this.setState({ rows: res.data }))
            .catch((err) => console.log(err))
    }

    printData = () => {
        var jsx = this.state.rows.map((val) => {
            return (
                <tr style={{ fontSize: "12px" }}>
                    <td>{val.id}</td>
                    <td>{val.product}</td>
                    <td>{val.price}</td>
                    <td>{val.discount}</td>
                    <td><div className="text-area" style={{ overflowY: "scroll", height: "80px", width:"400px" }}>{val.description}</div></td>
                    <td><img src={`http://localhost:2000/${val.image}`} width="80px" /></td>
                    <td>{val.qty}</td>
                    <td>{val.category}</td>
                    <td><button style={{backgroundColor:"transparent",border:"none"}}><img src="https://images.vexels.com/media/users/3/135542/isolated/preview/c3f24adfeddaed266cc1824b7f44dd9b-button-minus-icon-by-vexels.png" width="25px" onClick={() => this.setState({dataEdit:val, visibleEdit:true})}/></button>
                    <button style={{backgroundColor:"transparent",border:"none"}}><img src="https://images.vexels.com/media/users/3/135550/isolated/preview/f70c8b85f02b4b2fe33f64aa2b4cd75d-button-stop-close-icon-by-vexels.png" width="25px" onClick={() => this.btnDelete(val.id)}/></button></td>
                </tr>
                
            )
        })
        return jsx
    }

    renderModalEdit = () => {
    
    }
    
    render(){
        if(this.props.role==="admin"){

        
        return(
            <div className="container" style={{marginTop:"100px"}}>

            <div className="row justify-content-end mb-2">
            <button style={{border:"none",backgroundColor:"transparent"}} onClick={()=>this.setState({visible:true})}><span className="mr-1" style={{fontFamily:"Source Sans Pro",color:"#5C5C5C", fontSize:"13px",fontWeight:"bold"}}>Add New Product</span><img src="https://images.vexels.com/media/users/3/135544/isolated/preview/23724deafa9e7ec5830d49438d3e3f9f-colorful-button-more-add-icon-by-vexels.png" width="25px"/></button>
            </div>

            {/* MODAL EDIT PRODUCT */}
            <section>
            <Modal style={{fontFamily:"Source Sans Pro", overflowY:"auto", maxHeight:"100vh"}}
                visible={this.state.visibleEdit}
                width="800"
                height="800"
                effect="fadeInUp"
                onClickAway={() => this.setState({visibleEdit:false})}
            >
            <p className="text-left" style={{margin:"20px",fontWeight:"bold"}}>Edit Product</p>
                    <hr/>
                    <form>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Product Name</label>
          <input ref="productEdit" type="text" className="form-control" id="exampleFormControlInput1" defaultValue={this.state.dataEdit.product} />
        </div>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Price</label>
          <input ref="priceEdit" type="number" className="form-control" defaultValue={this.state.dataEdit.price} />
        </div>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Discount</label>
          <input ref="discountEdit" type="number" className="form-control" defaultValue={this.state.dataEdit.discount} />
        </div>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Quantity</label>
          <input ref="qtyEdit" type="number" className="form-control" defaultValue={this.state.dataEdit.qty} />
        </div>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Category</label>
          <select ref="categoryEdit" className="form-control text-left" id="exampleFormControlSelect1">
            {/* <option value={this.state.dataEdit.category}>{this.state.dataEdit.category}</option> */}
            {this.printCategory()}
            {/* <option value={this.state.dataEdit.category}>{this.state.dataEdit.category}</option>
            <option value='Eye'>Eye</option>
            <option value='Lip'>Lip</option>
            <option value='Skincare'>Skincare</option> */}
          </select>
        </div>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Description</label>
          <textarea ref="descriptionEdit" className="form-control" rows={3} defaultValue={this.state.dataEdit.description} />
        </div>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Image</label><br/>
          <img src={`http://localhost:2000/${this.state.dataEdit.image}`} width='100px'/>
          <input type="file" onChange={this.onChangeHandler}/>
        </div>
      </form>
      <button onClick={this.saveProduct}>SAVE</button>
            </Modal>
            </section>


            {/* MODAL ADD NEW PRODUCT  */}
            <section>
            <Modal style={{fontFamily:"Source Sans Pro", overflowY:"auto", maxHeight:"100vh"}}
                visible={this.state.visible}
                width="800"
                height="800"
                effect="fadeInUp"
                onClickAway={() => this.setState({visible:false})}
            >
            <p className="text-left" style={{margin:"20px",fontWeight:"bold"}}>New Product</p>
                    <hr/>
                    <form>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Product Name</label>
          <input ref="product" type="text" className="form-control" id="exampleFormControlInput1" placeholder="Input Product Name" />
        </div>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Price</label>
          <input ref="price" type="number" className="form-control" placeholder="Price in rupiah" />
        </div>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Discount</label>
          <input ref="discount" type="number" className="form-control" placeholder="Price in rupiah" />
        </div>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Quantity</label>
          <input ref="qty" type="number" className="form-control" placeholder="Price in rupiah" />
        </div>

        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Category</label>
          <select ref="category" className="form-control text-left" id="exampleFormControlSelect1">
          {this.printCategory()}
          </select>
          {/* <select ref="category" className="form-control text-left" id="exampleFormControlSelect1">
            <option value='Face'>Face</option>
            <option value='Eye'>Eye</option>
            <option value='Lip'>Lip</option>
            <option value='Skincare'>Skincare</option>
          </select> */}
        </div>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Description</label>
          <textarea ref="description" className="form-control" rows={3} defaultValue={""} />
        </div>
        <div className="form-group text-left" style={{margin:"20px"}}>
          <label>Image</label><br/>
          <input type="file" onChange={this.onChangeHandler}/>
        </div>
      </form>
      <button onClick={this.addProduct}>SAVE</button>
            </Modal>
            </section>


            <div className="row">
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
            </table>

            
            </div>
            </div>
        )
        }else{
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

const mapStateToProps = (state) => {
    return{
        role: state.user.role
    }
}

export default connect(mapStateToProps)(ManagePrd);