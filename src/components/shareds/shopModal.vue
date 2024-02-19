<template>
    <div class="text-center">
      <v-dialog
        v-model="dialog"
        width="50%"
      >
        <v-container>
          <v-row no-gutters>
            <v-col>
                <v-card elevation="16" prepend-icon="mdi-shopping" width="100%">
                    <template v-slot:title>
                        Produtos no carrinho
                    </template>
                    <v-divider></v-divider>
                    <v-card-text>
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
                    </v-card-text>

            </v-card>
        </v-col>

            <v-card
              class="mx-auto ml-2"
              max-width="344"
              elevation="16"
            >
              <template v-slot:title>
                  Resumo da compra
              </template>
              <v-divider></v-divider>
              <v-card-text class="pr-0">
                <v-list lines="one">
                    <v-list-item>

                      <v-list-item-title>
                        <v-icon v-icon icon="mdi-cart" color="primary"></v-icon>
                      </v-list-item-title>

                      <template v-slot:append>
                        <span class="green--text">R$ {{ price }}</span>
                      </template>
                    </v-list-item>
                    <v-list-item>
                      
                      <v-list-item-title>
                        <v-icon color="primary">mdi-truck-delivery</v-icon>
                      </v-list-item-title>

                      <template v-slot:append>
                        <span class="green--text">R$ 0,00</span>
                      </template>
                    </v-list-item>
                  </v-list>
              </v-card-text>
              <v-card-subtitle> Metodos de Pagamento </v-card-subtitle>
              <v-card-text>
                <v-chip rounded="0" :ripple="false" size="small" variant="outlined" color="primary" class="ma-2" >Cartão de Crédito</v-chip>
                <v-chip rounded="0" :ripple="false" size="small" variant="outlined" color="primary" class="ma-2" >Boleto</v-chip>
                <v-chip rounded="0" :ripple="false" size="small" variant="outlined" color="primary" class="ma-2" >Pix</v-chip>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn disabled color="primary" block @click="completePurchase()">Finalizar Compra</v-btn>
              </v-card-actions>

            </v-card>
          </v-row>
        </v-container>
      </v-dialog>
    </div>
  </template>

<script setup>
    import { computed } from "vue";
    import { useStore } from "vuex";
    import { useRouter, useRoute} from 'vue-router';


    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const productList = computed(() => store.getters.returnShopList);

    const price = computed(() => store.getters.getFullPrice);

    const dialog = defineModel('dialog')
    function completePurchase(query){
        router.push({
            name: 'payment',
            query: {
                price: price.value,
                ...route.query,
                ...query
            }

        })
        
        dialog.value= false;
    }

</script>

<style scoped>
</style>