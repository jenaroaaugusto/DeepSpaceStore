<template>
  <div id= "app" class="success-page" >
    <v-container>
      <v-row>
        <v-col >
          <v-card
            class="mx-auto"
            width="400"
            prepend-icon="mdi-party-popper"
            append-icon="mdi-party-popper"
          >
          <template v-slot:title>
            Pedido realizado <br>com sucesso!
          </template>
          <v-card-subtitle>Numero do pedido #{{OFFER_CODE}}</v-card-subtitle>

          <v-card-text>
            <productlist />
          </v-card-text>
        
          <v-card-subtitle> Comprador</v-card-subtitle>

          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{ order.order.name }}</v-list-item-title>

                  <v-list-item-subtitle>{{ order.order.email }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ order.order.phone }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

            </v-list>
          </v-card-text>
 
          </v-card>

        </v-col>
        <v-col> 
          <v-card
            class="mx-auto"
            width="400"
            prepend-icon="mdi-truck-delivery"
            append-icon="mdi-truck-delivery"
          >
          <template v-slot:title>
            Entrega
          </template>
          <v-card-subtitle>Endereço de entrega</v-card-subtitle>
          <v-card-text>
            {{ order.order.address }}
          </v-card-text>
          </v-card>
        </v-col>
        <v-col v-if="paymentCols()" class="mr-1">
          <v-card
            class="mx-auto"
            width="400"
            prepend-icon="mdi-credit-card"
            append-icon="mdi-credit-card"
          >
          <template v-slot:title>
            Pagamento
          </template>

          <v-card-subtitle> Faça leitura para pagamento por {{order.order.payMethod }}</v-card-subtitle>
          <v-card-text v-if = "order.order.payMethod === 'boleto'">
            <v-img
              width="100%"
              cover
              :src="billstopay"
            ></v-img>
          </v-card-text>
          <v-card-text v-else-if = "order.order.payMethod === 'pix'">
            <v-img
              width="100%"
              cover
              :src="qrcode"
            ></v-img>
          </v-card-text>
          <v-card-text> A sua compra vai ser confirmada após o pagamento, <br> boletos tem prazo de 3 dias</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>


  </div>
</template>

<script setup>
import billstopay from '@/assets/bills.svg';
import qrcode from '@/assets/qr.svg';
import productlist from '../shareds/productList.vue'
import { useStore } from 'vuex';

const store = useStore();

const OFFER_CODE = store.getters.getOfferCode

const order = store.getters.getOrderSuccess

function paymentCols() {
  if (order.order.payMethod === 'boleto' || order.order.payMethod === 'pix') {
    return true
  } else {
    return false
  }
}
</script>

<style scoped>
.success-page {
  text-align: center;
  margin-top: 50px;
}

#app{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
