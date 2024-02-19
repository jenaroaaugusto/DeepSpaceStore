<template>
    <v-list>
        <v-list-item-group>
            <v-list-item v-for="product in productList" :key="product.id">
            <v-list-item-content>
                <v-list-item-title>{{ product.name }}</v-list-item-title>
                <v-list-item-subtitle>R$ {{ product.price }}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    
    </v-list>
    <v-divider></v-divider>
    <v-card
    variant="flat"
    class="mx-auto"
    width="auto"
  >
    <v-card-text >
      <div>Valor Total</div>
      <p class="text-h4 text--primary">
        R$ {{sumMoney()}},00
      </p>

    </v-card-text>
  </v-card>

</template>

<script setup>  
import { useStore } from 'vuex';
defineProps({
  border: {
    type: Boolean
  }
})
const store = useStore();
const productList = store.getters.getOfferList

function sumMoney() {
    let total = 0
    for (let i = 0; i < productList.length; i++) {
        total += productList[i].price
    }
    return total
}



</script>