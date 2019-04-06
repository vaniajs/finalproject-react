import React from 'react';
import axios from 'axios';

class MngProduct extends React.Component {

    state = { rows: [], edit: false, selectEdit: 0 }
    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get('http://localhost:2000/products')
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

    btnCancel = () => {
        this.setState({selectEdit: 0})
    }

    btnSave = () => {
        var nama = this.refs.nama.value
        var brand = this.refs.brand.value
        var harga = this.refs.harga.value
        var diskon = this.refs.disc.value
        var desc = this.refs.desc.value
        var img = this.refs.img.value
        var qty = this.refs.qty.value
        var category = this.refs.ctgry.value
        var newProduct = { nama, brand, harga, diskon, desc, img, qty, category }
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
                    <td><input ref="namaEdit" type="text" defaultValue={val.nama}/></td>
                    <td><input ref="brandEdit" type="text" defaultValue={val.brand}/></td>
                    <td><input ref="hargaEdit" type="text" defaultValue={val.harga}/></td>
                    <td><input ref="diskonEdit" type="text" defaultValue={val.diskon}/></td>
                    <td><input className="text-area" style={{ overflowY: "scroll", height: "80px" }} defaultValue={val.desc}/></td>
                    <td><input ref="imgEdit" type="text" defaultValue={val.img}/></td>
                    <td><input ref="namaEdit" type="text" defaultValue={val.qty}/></td>
                    <td><input ref="namaEdit" type="text" defaultValue={val.category}/></td>
                    <td><input type="button" value="Save" className="btn btn-success" onClick={() => this.btnSaveEdit(val.id)} /></td>
                    <td><input type="button" value="Cancel" className="btn btn-danger" onClick={this.btnCancel} /></td>
                </tr>
                :
                <tr style={{ fontSize: "12px" }}>
                    <td>{val.id}</td>
                    <td>{val.nama}</td>
                    <td>{val.brand}</td>
                    <td>{val.harga}</td>
                    <td>{val.diskon}</td>
                    <td><div className="text-area" style={{ overflowY: "scroll", height: "80px" }}>{val.desc}</div></td>
                    <td><img src={val.img} width="80px" /></td>
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
        return (
            <div className="container">
                <div className="table text-left">
                    <tr style={{ fontWeight: "bolder" }}>
                        <td>ID</td>
                        <td>Product</td>
                        <td>Brand</td>
                        <td>Price</td>
                        <td>Discount</td>
                        <td>Description</td>
                        <td>Pict</td>
                        <td>Qty</td>
                        <td>Category</td>
                    </tr>
                    {this.printData()}
                </div>
                <div className="row"><p>Add New Product</p>
                    <div className="table text-left">
                        <tr style={{ fontWeight: "bolder" }}>
                            {/* <td>ID</td> */}
                            <td>Product</td>
                            <td>Brand</td>
                            <td>Price</td>
                            <td>Discount</td>
                            <td>Description</td>
                            <td>Pict</td>
                            <td>Qty</td>
                            <td>Category</td>
                        </tr>
                        <tr style={{ fontSize: "12px" }}>
                            <td><input ref='nama' type="text" placeholder="product name" /></td>
                            <td><input ref='brand' type="text" placeholder="brand" /></td>
                            <td><input ref='harga' type="number" placeholder="price(idr)" /></td>
                            <td><input ref='disc' type="text" placeholder="discount(%)" /></td>
                            <td><input ref='desc' type="text" placeholder="description" /></td>
                            <td><input ref='img' type="text" placeholder="img url" /></td>
                            <td><input ref='qty' type="text" placeholder="qty" /></td>
                            <td><input ref='ctgry' type="text" placeholder="category" /></td>
                        </tr>
                    </div>
                    <div className="row container">
                        <input type="button" value="Save" className="btn btn-success" style={{ marginBottom: "80px" }} onClick={this.btnSave} />
                    </div>
                </div>
            </div>
        )
    }
};

export default MngProduct;