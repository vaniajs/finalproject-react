import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class FormAdd extends React.Component {
    render() {
        var styling={ fontSize: '12px', width: '75%', height: '28px'}
        return (
            
            <div className='row container justify-content-center mb-4'>
            <div className='col-md-8 text-left' style={{ fontSize: '12px', width: '80%', height: '80%', marginBottom:'30px' }}>
                {/* <div className='popup_inner' style={{fontSize:'12px',width:'50%',height:'0px',backgroundColor:'white',position:'absolute'}}> */}
                <Form style={{ fontSize: '12px', width: '75%', height: '75%', backgroundColor: 'white',  }}>
                    <FormGroup>
                        <Label for="productName">Product Name</Label>
                        <Input ref='nama' style={styling} type="text" placeholder="Product Name" height='40px' />
                    </FormGroup>
                    <FormGroup>
                        <Label for="brand">Brand</Label>
                        <Input ref='nama' style={styling} type="text" placeholder="Brand Name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="harga">Price</Label>
                        <parseInt><Input style={styling} type="number" placeholder="Price" /></parseInt>
                    </FormGroup>
                    <FormGroup>
                        <Label for="diskon">Discount</Label>
                        <parseInt><Input style={styling} type="number" placeholder="Discount" /></parseInt>
                    </FormGroup>
                    <FormGroup>
                        <Label for="desc">Description</Label>
                        <Input style={styling} type="textarea" placeholder="Description about the product, how to use, etc" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleFile">Image</Label>
                        <Input style={styling} type="file" name="img" /> <Input style={styling} type="text" placeholder="Input img link here" />

                    </FormGroup>
                    <FormGroup>
                        <Label for="qty">Quantity</Label>
                        <parseInt><Input style={styling} type="number" placeholder="Stock in Warehouse" /></parseInt>
                        </FormGroup>
                    <FormGroup>
                        <Label for="ctgry">Category</Label>
                        <Input style={{fontSize: '12px', width: '75%', height: '50px'}} type="select" multiple>
                            <option>Face</option>
                            <option>Eye</option>
                            <option>Lip</option>
                            <option>Hair</option>
                            <option>Body</option>
                        </Input>
                    </FormGroup>
                </Form>
                {/* </div> */}
                </div>
            </div>
        )
    }
}

export default FormAdd;