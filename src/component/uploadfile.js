import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './App.css';

class App extends Component {

  state = { erro:'', selectedFile: '', product: [], selectEDit: 0, modal: false, dataEdit: {}, selectedFileEdit: null }

  componentDidMount() {
    this.getProduct()
  }

  onCHangeHandler = (event) => {
    //UNTUK MENDAPATKAN FILE IMG
    this.setState({ selectedFile: event.target.files[0] })
  }

  onCHangeHandlerEdit = (event) => {
    this.setState({ selectedFileEdit: event.target.files[0] })
  }

  valueHandlerEdit = () => {
    var value = this.state.selectedFileEdit ? this.state.selectedFileEdit.name : 'Upload an Image'
    return value
  }

  valueHandler = () => {
    var value = this.state.selectedFile ? this.state.selectedFile.name : 'Upload an Image'
    return value
  }

  addData = () => {
    var data = {
      product_name: this.refs.nama.value,
      product_price: parseInt(this.refs.harga.value)
    }
    var fd = new FormData()
    fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
    fd.append('product', JSON.stringify(data))
    axios.post('http://localhost:4000/image', fd)
      .then((res) => {
        if(res.data.error){
          this.setState({error:res.data.msg})
        }else{
          alert(res.data)
          this.getProduct()
          this.refs.nama.value = ''
          this.refs.harga.value = ''
          this.setState({ selectedFile: 'Upload an Image' })
        }
      })
      .catch((err) => console.log(err))
  }

  getProduct = () => {
    axios.get('http://localhost:4000/show')
      .then((res) => this.setState({ product: res.data }))
      .catch((err) => console.log(err))
  }

  // btnEdit = (id) => {
  //   this.setState({selectEDit:id})
  //   alert(this.state.selectEDit)
  // }

  btnCancel = () => {
    this.setState({ selectEDit: 0 })
  }

  // btnSave = (id) => {
  //   alert(this.state.selectEDit)
  //   var nama = this.refs.namaEdit.value
  //   var harga = this.refs.hargaEdit.value
  //   axios.put('http://localhost:4000/edit/' + id, {
  //     nama,
  //     harga
  //   })
  //     .then((res) => {
  //       this.setState({ selectEDit: 0, product: res.data })
  //     })
  //     .catch((err) => console.log(err))
  // }

  btnSave = () => {
    var newData = {
      product_name: this.refs.namaEdit.value?this.refs.namaEdit.value:this.state.dataEdit.product_name,
      harga : this.refs.hargaEdit.value?parseInt(this.refs.hargaEdit.value):this.state.dataEdit.product_price
    }
    if(this.state.selectedFileEdit){
      var fd = new FormData()
      fd.append('edit',this.state.selectedFileEdit)
      fd.append('dataBaru', JSON.stringify(newData))
      //UNTUK DAPETIN PATH YG MAU DIHAPUS
      fd.append('imageBefore', this.state.dataEdit.product_image)
      axios.put('http://localhost:4000/edit/'+this.state.dataEdit.id, fd)
      .then((res)=>{
        console.log(res)
        this.setState({modal:false})
        this.getProduct()
        alert(res.data)
      })
      .catch((err)=>console.log(err))
    }else{
      axios.put('http://localhost:4000/edit/'+this.state.dataEdit.id,newData)
      .then((res)=>{
        console.log(res)
        this.setState({modal:false})
        this.getProduct()
        alert(res.data)
      })
      .catch((err)=>console.log(err))
    }
  }

  btnDelete = (id) => {
    var yes = window.confirm('Are you sure you want to delete?')
    if (yes) {
      
      axios.delete('http://localhost:4000/delete/' + id)
        .then((res) => this.getProduct())
        .catch((err) => console.log(err))
    }
    else {
      this.setState({ selectEDit: 0 })
    }

  }

  renderJsx = () => {
    var jsx = this.state.product.map((val, index) => {
      return (


        this.state.selectEDit === val.id ?
          <tr>
            <td>{index + 1}</td>
            <td><input type="text" defaultValue={val.product_name} ref="namaEdit" /></td>
            <td><input type="text" defaultValue={val.product_price} ref="hargaEdit" /></td>
            <td><img src={'http://localhost:4000/' + val.product_image} width="50px" /></td>
            <td><input className="btn btn-success mr-3" type="button" value="Save" onClick={() => this.btnSave(val.id)} />
              <input className="btn btn-danger" type="button" value="Cancel" onClick={this.btnCancel} /></td>
          </tr>
          :
          <tr>
            <td>{index + 1}</td>
            <td>{val.product_name}</td>
            <td>Rp {val.product_price}</td>
            <td><img src={'http://localhost:4000/' + val.product_image} width="50px" /></td>
            <td><input className="btn btn-warning mr-3" type="button" value="Edit" onClick={() => this.setState({ modal: true, dataEdit: val })} />
              <input className="btn btn-danger" type="button" value="Delete" onClick={() => this.btnDelete(val.id)} /></td>
          </tr>


      )
    })
    return jsx
  }

  // renderJsx = () => {
  //   var jsx = this.state.product.map((val,index)=>{
  //     return(


  //           this.state.selectEDit===val.id?
  //           <tr>
  //             <td>{index+1}</td>
  //            <td><input type="text" defaultValue={val.product_name} ref="namaEdit"/></td> 
  //            <td><input type="text" defaultValue={val.product_price} ref="hargaEdit"/></td> 
  //            <td><img src={'http://localhost:4000/'+val.product_image} width="50px"/></td>
  //            <td><input className="btn btn-success mr-3" type="button" value="Save" onClick={()=>this.btnSave(val.id)}/>
  //         <input className="btn btn-danger" type="button" value="Cancel" onClick={this.btnCancel}/></td>
  //            </tr>
  //            :
  //            <tr>
  //              <td>{index+1}</td>
  //            <td>{val.product_name}</td>
  //            <td>Rp {val.product_price}</td>
  //            <td><img src={'http://localhost:4000/'+val.product_image} width="50px"/></td>
  //            <td><input className="btn btn-warning mr-3" type="button" value="Edit" onClick={()=>this.setState({selectEDit:val.id})}/>
  //         <input className="btn btn-danger" type="button" value="Delete" onClick={()=>this.btnDelete(val.id)}/></td>
  //       </tr>


  //     )
  //   })
  //   return jsx
  // }

  render() {
    return (
      <div className="container form">
        <div className="row mt-4">
          <div className="col md-3">
            <input className="form-control" ref="nama" type='text' placeholder='Masukkan Nama Barang' />
          </div>
          <div className="col md-3">
            <input className="form-control" ref="harga" type='number' placeholder='Masukkan Harga Barang' />
          </div>
          <div className="col md-3">
            <input style={{ display: "none" }} ref='input' type='file' onChange={this.onCHangeHandler} />
            <input className="form-control btn-success" onClick={() => this.refs.input.click()} type='button' value={this.valueHandler()} />
          </div>
          <div className="col md-3">
            <input className="form-control btn-warning" type='button' value="Add Product" onClick={this.addData} />
            {
              this.state.error ? <p className="text-center" style={{color:'red'}}>{this.state.error}</p> : null
            }
          </div>
        </div>
        <div className="row mt-4 container form">
          <table className="table">
            <tr>
              <td>No</td>
              <td>Product Name</td>
              <td>Product Price</td>
              <td>Image</td>
            </tr>
            {this.renderJsx()}
          </table>
        </div>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={() => { this.setState({ modal: false }) }}><b>Edit Product ~ </b> {this.state.dataEdit.product_name}</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-md-4 justify-content-center">
                  <img src={'http://localhost:4000/' + this.state.dataEdit.product_image} width="100%" alt="broken" />
                  <input type="file" onChange={this.onCHangeHandlerEdit} style={{ display: "none" }} ref="inputEdit" />
                  <input type="button" value={this.valueHandlerEdit()} className="form-control btn-success mt-2" onClick={() => this.refs.inputEdit.click()} style={{ fontSize: "12px" }} />

                </div>
                <div className="col-md-8">
                  <input type="text" ref="namaEdit" className="form-control" placeholder={this.state.dataEdit.product_name} />
                  <input type="number" ref="hargaEdit" className="form-control mt-3" placeholder={this.state.dataEdit.product_price} />


                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.btnSave}>Save</Button>{' '}
              <Button color="secondary" onClick={() => { this.setState({ modal: false }) }}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;
