import axios from 'axios'


const API_URL = 'http://localhost:8080/api'

class ProductDataService {

    refreshProdcuts() {
        //console.log('executed service')
        return axios.get(`${API_URL}/products`);
    }

    addProduct(data) {
        //console.log('executed service')
        return axios.post(`${API_URL}/products`,data);
    }

}

export default new ProductDataService()