
<template>
  <div id="app">
    <v-dialog v-if ="!shoppingCart" v-model="dialog" persistent width="1024">
      <template v-slot:activator="{ props }">
        <v-btn color="#173359" v-bind="props">
          Criar ou buscar oferta
        </v-btn>
      </template>
      <v-card class="mx-auto" elevation="1" max-width="500">
        <v-card-title class="py-5 font-weight-black"> Criar ou buscar oferta </v-card-title>

        <v-card-text>
          Voce pode criar uma nova oferta a partir de uma lista de produtos ou buscar uma oferta já existente.
        </v-card-text>

        <v-card-text>
          <div class="text-subtitle-2 font-weight-black mb-1">Buscar</div>

          <v-text-field label="Entre com o código da oferta" single-line v-model="OFFER_CODE"
            variant="outlined"></v-text-field>

          <v-btn block :disabled="OFFER_CODE === ''" class="text-none mb-4" color="indigo-darken-3" size="x-large"
            variant="flat" @click="getOffert(OFFER_CODE)">
            Buscar
          </v-btn>

          <v-btn block disabled  class="text-none" color="grey-lighten-3" size="x-large" variant="flat" @click="createOffert()">
            Criar
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-container min-height="400px" v-if="shoppingCart" fluid>
      <v-skeleton-loader
          v-if="loading"
          max-height="200px"
          elevation="12"
          max-width="200px"
          type="table-heading, list-item-two-line, image, table-tfoot"
          >
      <v-row v-if="!loading" dense>
        <ProductCard  cols="3" v-for="product in products" :key="product.id" :product="product" />
      </v-row>
    </v-skeleton-loader>
    </v-container>
  </div>
</template>


<script setup>



import ProductCard from './shareds/ProductCard.vue'
import tvImage from '@/assets/tv.jpg';
import smartphoneImage from '@/assets/samsungA32.jpeg';
import notebookImage from '@/assets/acerAs3.jpeg';

import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted} from 'vue';

const store = useStore();

const OFFER_CODE = ref('')
const router = useRouter()
const route = useRoute()
const loading = ref(false)

const shoppingCart = ref(false)


const dialog = ref(false)


onMounted(() => {
  store.commit('resetStates')
})


function getOffert(params) {
  store.dispatch('fetchOffert', params).then((result) => {
    router.push({
      name: 'payment',
      OFFER_CODE: result.data.OFFER_CODE,
      query: {
        OFFER_CODE: result.data.OFFER_CODE,
        ...route.query
      }

    })

  });

}


function createOffert() {
  loading.value = true
  shoppingCart.value = true
  store.dispatch('fetchShopList').then((result) => {
    // const products = store.getters.getOffersAvailable
    const products = result.data.list

    console.log(products)

  });

}


</script>

<style scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
```