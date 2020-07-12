import React, { Component } from 'react'
import ProductDataService from '../service/ProductDataService';
import ReactFileReader from "react-file-reader"

 class ListCoursesComponent extends Component{
    constructor(props) {
        super(props)
        this.refreshProdcuts = this.refreshProdcuts.bind(this)
    
        this.state = { 
            products:[],
            message:null
        }
    }

    componentDidMount(){
        this.refreshProdcuts();
    }

    refreshProdcuts = () =>{
        ProductDataService.refreshProdcuts().then(
            response => {console.log(response);
                this.setState({products:response.data})
            }
        )
    }


    handleFiles = files => {
        var reader = new FileReader();
        reader.onload = function(e) {
        // Use reader.result
        var csv = reader.result;
        var lines = csv.split("\n");
        var result = [];
        var headers=lines[0].split(",");
        for(var i=1;i<lines.length;i++){
          var obj = {};
          var currentline=lines[i].split(",");
          for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
          }
          result.push(obj);
          }  
          //return result; //JavaScript object
          result= JSON.stringify(result); //JSON
          console.log(result);
          
      }
      reader.readAsText(files[0]);
    }

    render() {
        return ( <div className="container">
                <h3>All Products</h3>
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <button className='btn'>Add new product by csv file</button>
                </ReactFileReader>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Product Name</th>
                                <th>Weight</th>
                                <th>Location</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.products.map((product,i) => (
                                    product.warehouses.map((warehouse,j) =>(
                                        <tr key={i+"."+j}>
                                            <td>{product.code}</td>
                                            <td>{product.name}</td>
                                            <td>{product.weight}</td>
                                            <td>{warehouse.location}</td>
                                            <td>{warehouse.quantity}</td>
                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default ListCoursesComponent;