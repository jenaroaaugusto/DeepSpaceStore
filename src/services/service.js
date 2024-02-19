import axios from "axios";
import store from '../store'

class Service {
    static getZipCode(cep) {
        return new Promise((resolve, reject) => {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    
    static fetchShopList() {
        return new Promise((resolve, reject) => {
            axios.get('/all-offerts')
                .then((response) => {
                    console.log(response.data);
                    store.commit('setOffersAvailable', response.data.list);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static getOfferForID(id) {
        return new Promise((resolve, reject) => {
            axios.get('/offerts/', {params: {id}})
                .then((response) => {
                    store.commit('setShopList', response.data);
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    static createOrder(payload) {
        const OFFER_CODE = payload.offerCode;
        return new Promise((resolve, reject) => {
            axios.post(`/offers/${OFFER_CODE}/create_order`, payload)
                .then((response) => {
                    store.commit('setOrderSuccess', response.data);
                    resolve(response);
                })
                .catch((error) => {
                    store.commit('setOperationStatus', 'error');
                    reject(error);
                });
        });
    }
}

export default Service;