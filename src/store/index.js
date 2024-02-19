
import {createStore} from 'vuex';
import Service from '../services/service.js';


export default createStore({
  state: {
    // Define your state properties here
    shopNumber: 0,
    productList: [],
    shopList: [],
    offerCode: '',
    modelOpen: false,
    operationStatus: '',
    order : {}

  },
  mutations: {
    incrementShopNumber(state) {
      state.shopNumber++;
    },

    addProductToShop(state, payload) {
      state.productList.push(payload);
    },
    openModal(state) {

      state.modelOpen = true;
    },
    setShopList(state, payload) {
      state.shopList = payload.list;
      state.offerCode = payload.OFFER_CODE;
    },

    resetStates(state) {
      state.shopNumber = 0;
      state.productList = [];
      state.shopList = [];
      state.offerCode = '';
      state.modelOpen = false;
      state.operationStatus = '';
    },
    setOperationStatus(state, payload) {
      state.operationStatus = payload;
    },
    setOrderSuccess(state, payload) {
      state.order = payload;
    }


    // Define your mutations here
  },
  actions: {
    getZipCode (context, payload) {
      return new Promise((resolve, reject) => {
        Service.getZipCode(payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchShopList() {
      return new Promise((resolve, reject) => {
        Service.makeOffer()
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchOffert(context, payload) {
      return new Promise((resolve, reject) => {
        Service.getOfferForID(payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    createOrder(context, payload) {
      console.log('createOrder');
      console.log(payload);
      return new Promise((resolve, reject) => {
        Service.createOrder(payload)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  },
  getters: {

    returnShopNumber(state) {
      return state.shopNumber;
    },
    returnShopList(state) {
      return state.productList;
    },
    
    getOpenModal(state) {
      return state.modelOpen;
    }, 
    
    getOfferCode(state) {
      return state.offerCode;
    },

    getOfferList(state) {
      return state.shopList
    },

    getOperationStatus(state) {
      return state.operationStatus;
    },
    
    getFullPrice(state) {
      let fullPrice = 0;
      state.productList.forEach((product) => {
        fullPrice += product.price;
      });
      return fullPrice;
    },

    getOrderSuccess(state) {
      return state.order;
    }

  },
});