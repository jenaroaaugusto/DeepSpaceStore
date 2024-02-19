<template>
    <v-card
        class="mx-auto my-8"
        max-width="344"
        elevation="16">
        <v-card-title>Produtos para você</v-card-title>
        <v-card-text>
            <img :src="product.image" :alt="product.name" />
            <h2>{{ product.name }}</h2>
            <p> R$ {{ product.price }}</p>
            <button @click="addToCart(product)">Add to Cart</button>
        </v-card-text>

    </v-card>
</template>

<script setup>
import { useStore } from 'vuex';
import { reactive } from 'vue';

const store = useStore();

const props = defineProps({
    product:{
    name: String,
    price: Number,
    image: String
}})

const product = reactive(props.product);


function addToCart(product) {
    store.commit('incrementShopNumber')
    store.commit('addProductToShop', product)
}






</script>

<style scoped>
</style>