<template>
    <v-app-bar 
        color="#173359"
        class="mb-10"
        :elevation="10"
    >
        <template v-slot:prepend>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title @click="goToHome">Deep Space Store</v-app-bar-title>

        <v-spacer></v-spacer>
        <v-btn class = "text-none" stacked>
          <v-badge :content="productsNumber" class=" pr-10" @click="openModel()">
              <v-icon color="success" icon="mdi-cart-outline" size="x-large"></v-icon>
          </v-badge>
        </v-btn>
    </v-app-bar>

    <ShopModal v-model:dialog="open" />
</template>

<script setup>
import { computed,  ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import ShopModal from './shopModal.vue';

const store = useStore();
const router = useRouter()


const open = ref(false);


function openModel(){

  open.value = !open.value;    
}

function goToHome() {
  store.commit('resetStates')
  router.push({ name: 'home'})
}

const productsNumber = computed(() => store.getters.returnShopNumber);

</script>

<style scoped>
.footer-config {
  position: relative;
  top:100%;
  background-color: #173359;
  color: white;
}
</style>