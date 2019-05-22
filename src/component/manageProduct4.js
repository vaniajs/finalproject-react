import React from 'react';
import axios from 'axios';
// import { Button, Header, Icon, Image, Modal } from 'semantic-ui-react';
import Modal from 'react-awesome-modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import AddBtn from './../support/icon/add.png';
import EditBtn from './../support/icon/edit.png';
import DelBtn from './../support/icon/delete.png';
import prev from './../support/icon/prev.png';
import next from './../support/icon/next.png';




class ManagePrd extends React.Component {
  state = {
    rows: [],
    edit: false,
    dataEdit: {},
    visible: false,
    visibleEdit: false,
    selectedFile: null,
    ctgry: [],
    selectedFileEdit: null,
    descValueEdit: '',
    currentIndex: null,
    visibleCat: false,
    dltBtn: false,
    page: 1
  }

  openModal() {
    this.setState({ visible: true });
  }

  componentWillReceiveProps() {
    this.getData()
  }

  componentDidMount() {
    this.getData()
    this.getCategory()
  }

  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  onChangeHandlerEdit = (event) => {
    this.setState({ selectedFileEdit: event.target.files[0] })
  }

  btnCancel = () => {
    this.setState({ selectEdit: 0 })
  }

  btnDelete = (id) => {
    var yes = window.confirm('Are you sure you want to delete?')
    if (yes) {
      axios
        .delete('http://localhost:2000/products/deleteProduct/' + id)
        .then((res) => {
          this.getData()
          alert('Berhasil')
        })
        .catch((err) => console.log(err))
    } else {
      this.setState({ selectEDit: 0 })
    }
  }

  getCategory = () => {
    axios
      .get('http://localhost:2000/products/getCategory')
      .then((res) => this.setState({ ctgry: res.data }))
      .catch((err) => console.log(err))
  }

  printCategory = () => {
    var jsx = this
      .state
      .ctgry
      .map((val, idx) => {
        return (
          <option value={val.id}>{val.category}</option>
        )
      })
    return jsx
  }

  addCategory = () => {
    axios.post('http://localhost:2000/products/addCategory', {
      category: this.refs.newcategory.value
    })
      .then((res) => {
        this.getCategory()
        swal("NEW CATEGORY", "has been added", "success")
        this.refs.newcategory.value = ''
      })
      .catch((err) => console.log(err))
  }

  deleteCategory = () => {
    var category = this.refs.categorylist.value
    var yes = window.confirm(`Are you sure you want to delete this from category list?`)
    if (yes) {
      axios.delete('http://localhost:2000/products/deleteCategory/' + category)
        .then((res) => {
          this.getCategory()
          swal("CATEGORY", "has been deleted", "success")
        })
        .catch((err) => console.log(err))
    }
  }


  onChangeDescValEdit = (event) => {
    this.setState({ descValueEdit: event.target.value })
  }

  addProduct = () => {
    var newData = {
      product: this.refs.product.value,
      price: parseInt(this.refs.price.value),
      discount: parseInt(this.refs.discount.value),
      qty: parseInt(this.refs.qty.value),
      id_category: this.refs.category.value,
      description: this.refs.description.value
    }
    var formData = new FormData()
    formData.append('image', this.state.selectedFile, this.state.selectedFile.name)
    formData.append('data', JSON.stringify(newData))
    axios
      .post('http://localhost:2000/products/addProduct', formData)
      .then((res) => {
        console.log(res.data)
        this.setState({ visible: false })
        this.getData()
        alert('New Product Added')
      })
      .catch((err) => console.log(err))
  }

  saveProduct = () => {
    var newData = {
      product: this.refs.productEdit.value
        ? this.refs.productEdit.value
        : this.state.dataEdit.product,
      price: parseInt(this.refs.priceEdit.value)
        ? parseInt(this.refs.priceEdit.value)
        : this.state.dataEdit.price,
      discount: parseInt(this.refs.discountEdit.value)
        ? parseInt(this.refs.discountEdit.value)
        : this.state.dataEdit.discount,
      qty: parseInt(this.refs.qtyEdit.value)
        ? parseInt(this.refs.qtyEdit.value)
        : this.state.dataEdit.qty,
      id_category: this.refs.categoryEdit.value
        ? this.refs.categoryEdit.value
        : this.state.dataEdit.id_category,
      description: this.refs.descriptionEdit.value
        ? this.refs.descriptionEdit.value
        : this.state.dataEdit.description
    }
    if (this.state.selectedFileEdit) {
      var fd = new FormData()
      fd.append('edit', this.state.selectedFileEdit)
      fd.append('dataBaru', JSON.stringify(newData))
      //UNTUK DAPETIN PATH YG MAU DIHAPUS
      fd.append('imageBefore', this.state.dataEdit.image)
      axios
        .put('http://localhost:2000/products/edit/' + this.state.dataEdit.id, fd)
        .then((res) => {
          console.log(res)
          this.setState({ visibleEdit: false, descValueEdit: '', dataEdit: {}, currentIndex: 0 })
          this.getData()
        })
        .catch((err) => console.log(err))
    } else {
      axios
        .put('http://localhost:2000/products/edit/' + this.state.dataEdit.id, newData)
        .then((res) => {
          console.log(res)
          this.setState({ visibleEdit: false, descValueEdit: '' })
          this.getData()
        })
        .catch((err) => console.log(err))
    }
  }



  getData = () => {
    axios
      .get('http://localhost:2000/products/getProducts/' + this.state.page)
      .then((res) => this.setState({ rows: res.data }))
      .catch((err) => console.log(err))
  }

  // handleEditClick = (val, index) => {
  //   const valueEdit = index === this.state.currentIndex ? this.state.dataEdit.description : val.description
  //   this.setState({ currentIndex: index })
  //   if (index === this.state.currentIndex) {
  //     this.setState({ dataEdit: val, visibleEdit: true, descValueEdit:valueEdit })
  //   }
  // }

  handleEditClick = (val, descValue, index) => {
    alert(val.product)
    // const valueEdit = index === this.state.currentIndex ? this.state.dataEdit.description : descValue
    this.setState({ dataEdit: val, visibleEdit: true, currentIndex: index, descValueEdit: descValue })
  }

  printData = () => {
    var jsx = this
      .state
      .rows
      .map((val, index) => {
        return (
          <tr style={{
            fontSize: "12px"
          }}>
            <td>{val.id}</td>
            <td>{val.product}</td>
            <td>{val.price}</td>
            <td>{val.discount}</td>
            <td>
              <div
                className="text-area"
                style={{
                  overflowY: "scroll",
                  height: "80px",
                  width: "400px"
                }}>{val.description}</div>
            </td>
            <td><img src={`http://localhost:2000/${val.image}`} width="75px" alt='img-prd' /></td>
            <td>{val.qty}</td>
            <td>{val.category}</td>
            <td>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none"
                }}><img
                  src={EditBtn}
                  width="20px"
                  onClick={() => this.handleEditClick(val, val.description, index)} alt='btn' /></button>
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none"
                }}><img
                  src={DelBtn}
                  width="20px"
                  onClick={() => this.btnDelete(val.id)} alt='btn' /></button>
            </td>
          </tr>

        )
      })
    return jsx
  }

  btnPageNext = () => {
    this.setState({ page: this.state.page + 1 })
    this.getData()
  }

  btnPagePrev = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
      this.getData()
    }

  }
  render() {
    if (this.props.role === "admin") {

      return (
        <div className="container" style={{
          marginTop: "20px", marginBottom: "0px"
        }}>

          <div className="row justify-content-end mb-2">

            <span
              className="mr-1"
              style={{
                fontFamily: "Source Sans Pro",
                color: "#5C5C5C",
                fontSize: "13px",
                fontWeight: "bold"
              }}>Add New Product</span><img
              src={AddBtn}
              width="20px" height='20px' onClick={() => this.setState({ visible: true })} style={{ cursor: 'pointer' }} className='mr-2' alt='btn' />
            <span
              className="mr-1"
              style={{
                fontFamily: "Source Sans Pro",
                color: "#5C5C5C",
                fontSize: "13px",
                fontWeight: "bold"
              }}>Add Category</span><img
              src={AddBtn}
              width="20px" height='20px' onClick={() => this.setState({ visibleCat: true })} style={{ cursor: 'pointer' }} className='mr-2' alt='btn' />
          </div>

          {/* MODAL EDIT PRODUCT */}
          <section>
            <Modal
              style={{
                fontFamily: "Source Sans Pro",
                position: "absolute"
              }}
              visible={this.state.visibleEdit}
              width="800"
              height="800"
              effect="fadeInUp"
              onClickAway={() => this.setState({ visibleEdit: false, dataEdit: {} })}>
              <div style={{ overflow: 'scroll', height: '800px', marginBottom: '20px' }}>
                <p
                  className="text-left"
                  style={{
                    margin: "20px",
                    fontWeight: "bold"
                  }}>Edit Product</p>
                <hr />
                <form>
                  <div
                    className="form-group text-left"
                    style={{
                      margin: "20px"
                    }}>
                    <label>Product Name</label>
                    <input
                      ref="productEdit"
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1"
                      defaultValue={this.state.dataEdit.product} />
                  </div>
                  <div
                    className="form-group text-left"
                    style={{
                      margin: "20px"
                    }}>
                    <label>Price</label>
                    <input
                      ref="priceEdit"
                      type="number"
                      className="form-control"
                      defaultValue={this.state.dataEdit.price} />
                  </div>
                  <div
                    className="form-group text-left"
                    style={{
                      margin: "20px"
                    }}>
                    <label>Discount</label>
                    <input
                      ref="discountEdit"
                      type="number"
                      className="form-control"
                      defaultValue={this.state.dataEdit.discount} />
                  </div>
                  <div
                    className="form-group text-left"
                    style={{
                      margin: "20px"
                    }}>
                    <label>Quantity</label>
                    <input
                      ref="qtyEdit"
                      type="number"
                      className="form-control"
                      defaultValue={this.state.dataEdit.qty} />
                  </div>
                  <div
                    className="form-group text-left"
                    style={{
                      margin: "20px"
                    }}>
                    <label>Category</label>
                    <select
                      ref="categoryEdit"
                      className="form-control text-left"
                      id="exampleFormControlSelect1">
                      {this.printCategory()}
                    </select>
                  </div>
                  <div
                    className="form-group text-left"
                    style={{
                      margin: "20px"
                    }}>
                    <label>Description</label>
                    <textarea
                      ref="descriptionEdit"
                      className="form-control"
                      rows="2"
                      value={this.state.descValueEdit}
                      onChange={(event) => this.onChangeDescValEdit(event)} />
                  </div>
                  <div
                    className="form-group text-left"
                    style={{
                      margin: "20px"
                    }}>
                    <label>Image</label><br />
                    <img src={`http://localhost:2000/${this.state.dataEdit.image}`} width='100px' alt='btn' />
                    <input type="file" onChange={this.onChangeHandlerEdit} />
                  </div>
                </form>
                <input type='button' value='Save' className='mt-2' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px', marginLeft: '10px' }} onClick={this.saveProduct} />
              </div>
            </Modal>
          </section>

          {/* MODAL ADD NEW PRODUCT  */}
          <section>
            <Modal
              style={{
                fontFamily: "Source Sans Pro",
                overflow: 'auto',
                maxHeight: '1200px'
              }}
              visible={this.state.visible}
              width="800"
              height="800"
              effect="fadeInUp"
              onClickAway={() => this.setState({ visible: false })}>
              <p
                className="text-left"
                style={{
                  margin: "20px",
                  fontWeight: "bold"
                }}>New Product</p>
              <hr />
              <form>
                <div
                  className="form-group text-left"
                  style={{
                    margin: "20px"
                  }}>
                  <label>Product Name</label>
                  <input
                    ref="product"
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Input Product Name" />
                </div>
                <div
                  className="form-group text-left"
                  style={{
                    margin: "20px"
                  }}>
                  <label>Price</label>
                  <input
                    ref="price"
                    type="number"
                    className="form-control"
                    placeholder="Price in rupiah" />
                </div>
                <div
                  className="form-group text-left"
                  style={{
                    margin: "20px"
                  }}>
                  <label>Discount</label>
                  <input
                    ref="discount"
                    type="number"
                    className="form-control"
                    placeholder="Input Discount (%)" />
                </div>
                <div
                  className="form-group text-left"
                  style={{
                    margin: "20px"
                  }}>
                  <label>Quantity</label>
                  <input
                    ref="qty"
                    type="number"
                    className="form-control"
                    placeholder="Input quantity" />
                </div>

                <div
                  className="form-group text-left"
                  style={{
                    margin: "20px"
                  }}>
                  <label>Category</label>
                  <select
                    ref="category"
                    className="form-control text-left"
                    id="exampleFormControlSelect1">
                    {this.printCategory()}
                  </select>
                </div>
                <div
                  className="form-group text-left"
                  style={{
                    margin: "20px"
                  }}>
                  <label>Description</label>
                  <textarea
                    ref="description"
                    className="form-control"
                    rows={2}
                    style={{
                      overflowY: "scroll"
                    }}
                    defaultValue={""} />
                </div>
                <div
                  className="form-group text-left"
                  style={{
                    margin: "20px"
                  }}>
                  <label>Image</label><br />
                  <input type="file" onChange={this.onChangeHandler} />
                </div>
              </form>
              <input type='button' value='Add' className='mt-2' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px', marginLeft: '10px' }} onClick={this.addProduct} />            </Modal>
          </section>

          {/* MODAL ADD CATEGORY  */}
          <section>
            <Modal
              style={{
                fontFamily: "Source Sans Pro",
                overflowY: "auto",
                maxHeight: "100vh"
              }}
              visible={this.state.visibleCat}
              width="800"
              height="500"
              effect="fadeInUp"
              onClickAway={() => this.setState({ visibleCat: false })}>
              <p
                className="text-left"
                style={{
                  margin: "20px",
                  fontWeight: "bold"
                }}>Add Category</p>
              <hr />
              <form>
                <div
                  className="form-group text-left"
                  style={{
                    margin: "20px"
                  }}>
                  <label>New Category</label>
                  <input
                    ref="newcategory"
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Input New Category" />
                </div>

                <div class="form-group text-left" style={{
                  margin: "20px"
                }}>
                  <label>Category List</label>
                  <select ref='categorylist' multiple class="form-control" onChange={() => this.setState({ dltBtn: true })}>
                    {this.printCategory()}
                  </select>
                </div>
              </form>
              <input type='button' value='Add' className='mr-3' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px', marginLeft: '10px' }} onClick={this.addCategory} />
              {
                this.state.dltBtn ? <input type='button' value='Delete' className='mt-2' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px', marginLeft: '10px' }} onClick={this.deleteCategory} /> : <input type='button' value='Delete' className='mt-2' style={{ padding: '8px', border: 'none', borderRadius: '10px', backgroundColor: '#E16868', color: '#FFF9F9', marginBottom: '60px', marginLeft: '10px', opacity: '0.5' }} onClick={this.deleteCategory} disabled />
              }

            </Modal>
          </section>

          <div className="row">
            <table className="col-md-12 col-12 table text-left">
              <tr style={{
                fontWeight: "bolder"
              }}>
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
          <div className='d-flex justify-content-center' style={{ marginTop: '-10px' }}>
            <img width='30px' height='30px' src={prev} className='mr-4' style={{ cursor: 'pointer' }} onClick={this.btnPagePrev} alt='btn' />
            <img width='30px' height='30px' src={next} className='ml-4' style={{ cursor: 'pointer' }} onClick={this.btnPageNext} alt='btn' />
          </div>
        </div>
      )
    } else {
      return (
        <div
          className="text-center"
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bolder",
            marginTop: "200px",
            color: "#5C5C5C"
          }}>
          <h1>404.<br />
            Page Not Found :(</h1>
          <Link to='/'>
            <p style={{
              color: "#E16868"
            }}>Return to Home</p>
          </Link>
        </div>
      )
    }

  }
};

const mapStateToProps = (state) => {
  return { role: state.user.role }
}

export default connect(mapStateToProps)(ManagePrd);