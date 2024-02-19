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
    
    static makeOffer() {
        return new Promise((resolve, reject) => {
            axios.get('/resource')
                .then((response) => {
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
        console.log('Service.createOrder');
        console.log(payload);
        const OFFER_CODE = payload.offerCode;
        console.log(OFFER_CODE);
        return new Promise((resolve, reject) => {
            axios.post(`/offers/${OFFER_CODE}/create_order`, payload)
                .then((response) => {
                    store.commit('setOrderSuccess', response.data);
                    resolve(response);
                })
                .catch((error) => {
                    console.log('Service.createOrder error');
                    console.log(error);
                    store.commit('setOperationStatus', 'error');
                    reject(error);
                });
        });
    }
}

export default Service;