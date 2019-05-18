import React from 'react';
import {connect} from 'react-redux';
import {SearchFilter} from './../1.actions/productActions';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Axios from 'axios'

class Search extends React.Component{

    // componentDidMount(){

    // }

    state = {dataFilter:[]}

    // searchFn = () => {
    //     this.props.SearchFilter(this.refs.search.value)
    //     this.setState({dataFilter:this.props.dataFilter})
        
    // }

    searchFn = () => {
        alert(this.refs.search.value)
        var search = this.refs.search.value
        Axios.get('http://localhost:2000/products/filter?keyword='+search)
        .then((res)=>{
            console.log(res)
            this.setState({dataFilter:res.data})
        })
        .catch((err)=>console.log(err))
    }

    renderJsx = () => {
        const jsx = this.state.dataFilter.map((val) => {
            return (
                <Card.Group className="justify-content-center" itemsPerRow={4} style={{ margin: "40px" }}>
                    <Link to ={'/product-detail/'+val.id}><Image src={`http://localhost:2000/${val.image}`} width="150px"/></Link>
                    <Card.Content className="text-left mt-1" style={{ fontFamily: "Montserrat", fontSize: "12px" }}>
                        <Card.Header>{val.id}</Card.Header>
                        <Card.Header>{val.product}</Card.Header>
                        <Card.Meta>Rp {val.price}</Card.Meta>
                        {
                            this.props.id !== 0 ?
                                <Card.Meta onClick={() => this.addToCart(val.id, this.props.id)} style={{ cursor: "pointer" }}>Add to Cart</Card.Meta>
                                : null
                        }
                    </Card.Content>
                </Card.Group>
            )
        })
        return jsx
    }

    render(){
        return(
            // <div className="row">
            <div className="container-fluid col-md-4" style={{position:"fixed", right:0}}>
                    <div className="float-lg-right" style={{ marginTop: "100px", marginRight: '40px', fontFamily: 'Montserrat', color: "#5C5C5C", fontSize: '14px' }}>
                        <div className="p-2">Search</div>
                        <input type="text" ref='search' className="text-center" style={{ border: "none", backgroundColor: "#E16868", borderRadius: "50px", color: "white", height: "40px" }} placeholder="type your search" onChange={this.searchFn} />
                    </div>
                    {this.renderJsx()}

            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return{
        dataFilter : state.product.dataFilter
    }
}

export default connect(mapStateToProps,{SearchFilter})(Search);