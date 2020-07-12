import React, {Component} from "react";
import ListProduct from "./ListProducts.jsx"

class ProductApp extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return (  <div>
            <h1>WareHouse Management</h1>
            <ListProduct></ListProduct>
        </div>)
    }
}

export default ProductApp;