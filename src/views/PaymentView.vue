<template>
    <v-container style="top:15%; position: relative;">
        <v-row  no-gutters>
            <v-col cols="12" class="text-center mb-5">
                <h1>Finalizar compra # {{ offId  }}</h1>
            </v-col>
            <v-col align-self="center">
                <Payment />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import Payment from '../components/payment/Payment.vue'
    import {useStore} from 'vuex'

    const store = useStore()

    const offId = store.getters.getOfferCode
</script>


<style scoped>
.payment {
    min-height: 20vh;
}
</style>
```

