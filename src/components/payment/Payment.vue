<template>
    <v-container>
        <v-row>
            <v-col cols="3">
                <productlist />
            </v-col>
            <v-col>
                <v-alert v-if="operationStatus === 'error'"
                class="mb-3"
                color="error"
                closable 
                icon="$error"
                title="CPF inválido"
                type="error"
                text="Digite um CPF válido para continuar."
            ></v-alert>
                <v-stepper
                    v-model="step"
                    prev-text="Voltar"
                    next-text="Avançar"
                    mandatory
            
                    :items="['Dados Pessoais', 'Endereço de Entrega', 'Pagamento']">
                    <template v-slot:next>
                        
                        <v-btn v-on:click="step++" :disabled="!phoneDisabled || step == 3  || disabledNotCEP && step == 2" prepend-icon="mdi-cart" variant="text">
                            Avançar
                        </v-btn>
                        <!-- || step == 2 && cepRequired -->
                    </template>
        
                    <template v-slot:item.1>
                        <v-card>
                        <v-card-title>Dados do Comprado</v-card-title>
                        <v-card-text>
                            <v-text-field v-model="paymentInformation.name" type="text" name="Name" label="Nome"></v-text-field>
                            <v-text-field v-model="paymentInformation.email" type="email" label="Email"></v-text-field>
                            <v-text-field v-model="phoneValue" type="phoneNumber" :rules="[requiredOne]" label="Numero de Telefone"></v-text-field>
                        </v-card-text>
                        </v-card>
                    </template>

                    <template v-slot:item.2>
                        <v-card>
                        <v-card-title>Endereço</v-card-title>
                        <v-card-text>
                            <v-text-field 
                                @click:append-inner="getZipCode(cep)" 
                                append-inner-icon="mdi-magnify" 
                                v-model="cep" 
                                @keydown.enter.prevent="getZipCode(cep)" 
                                :rules="cepRequired"
                                label="CEP">
                            </v-text-field>
                            <v-text-field variant="plain" readonly v-model="address" name="address" label="Rua"></v-text-field>
                            <v-text-field variant="plain" readonly label="Bairro" v-model="Neighborhoods"></v-text-field>
                            <v-text-field label="Numero" name ="houseNumber" v-model="houseNumber"></v-text-field>
                            <v-text-field label="Complemento" name="complement" v-model="complement"></v-text-field>
                            <v-text-field variant="plain" readonly label="Cidade e UF" name="city" v-model="City"></v-text-field>
                        </v-card-text>
                        </v-card>
                    </template>

                    <template v-slot:item.3>
                        <v-card>
                            <v-card-title>Pagamento</v-card-title>
                            <v-card-subtitle>Escolha a forma de pagamento</v-card-subtitle>
                            <v-divider class="mb-4"></v-divider>
                            
                            <v-sheet width="300" class="mx-auto mb-2">
                                <v-form @submit.prevent>
                                <v-text-field
                                    v-model="cpf"
                                    :rules="cpfRequired"
                                    placeholder="Digite o numero de seu CPF para continuar"
                                    label="Digite seu CPF"
                                ></v-text-field>
                                </v-form>
                            </v-sheet>

                            <v-expansion-panels v-model="panel" >
                                <v-expansion-panel value="creditCard">
                                    <v-expansion-panel-title>
                                        <img alt="Boleto" class="logo" src="@/assets/creditCard.svg" width="120" height="60" />
                                        <span class="pl-5"> Cartão de Crédito </span>
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        <v-text-field v-model="paymentInformation.extra['cardName']" type="text" label="Nome no Cartão"></v-text-field>
                                        <v-text-field v-model= "paymentInformation.extra['cardNumber']"  type="text" label="Numero do Cartão"></v-text-field>
                                        <v-text-field v-model= "paymentInformation.extra['cardData']"  type="text" label="Data de Validade"></v-text-field>
                                        <v-text-field v-model= "paymentInformation.extra['CVV']"  type="text" label="CVV"></v-text-field>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                                <v-expansion-panel value="boleto">
                                    <v-expansion-panel-title>
                                        <img alt="Boleto" class="logo" src="@/assets/boleto-logo.svg" width="60" height="60" />
                                        <span class="pl-5"> Boleto </span>
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                        O boleto será gerado após a finalização de sua compra. Imprima e pague no banco ou pague pela internet utilizando o código de barras do boleto. O pagamento via boleto leva em média 3 dias úteis para ser confirmado, e o prazo de entrega começa a conta a partir dessa confirmação, por isso, a previsão de entrega pode ser alterada.
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                                <v-expansion-panel value="pix">
                                    <v-expansion-panel-title>
                                        <img alt="Pix Logo" class="logo" src="@/assets/pix-106.svg" width="60" height="60" />
                                        <span class="pl-5"> Pix</span>
                                    </v-expansion-panel-title>
                                    <v-expansion-panel-text>
                                    </v-expansion-panel-text>
                                </v-expansion-panel>
                            </v-expansion-panels>

                        </v-card>
                    </template>
                </v-stepper>
                <v-btn v-if="step === 3" :disabled="cpf.length ===0 || panel === ''" @click="finishPayment()" class="mt-2 mb-2" color="#173359" block> Finalizar pagamento</v-btn>
         
            </v-col>
        </v-row>

    </v-container>


</template>

<script setup>
    import { ref, watch, computed} from 'vue'
    import productlist from '../shareds/productList.vue'
    import { useStore } from 'vuex'
    import { useRouter, useRoute } from 'vue-router'
    import { reactive } from 'vue';

    const router = useRouter()
    const route = useRoute()
    const disabledNotCEP = ref(true)

    const cep = ref('')
    const address = ref('')
    const Neighborhoods = ref('')
    const cpf = ref('')
    const City = ref('')
    const step = ref(1)
    const houseNumber = ref('')
    const complement = ref('')
    const panel = ref('');
    const store = useStore();
    const phoneValue = ref('')
    const phoneDisabled = ref(false)
    const offId = ref('')
    offId.value = store.getters.getOfferCode
    const operationStatus =  computed(() => store.getters.getOperationStatus)

    const paymentInformation = reactive({
        offerCode: offId.value,
        name: '',
        email: '',
        phone: '',
        cep: '',
        address: '',
        houseNumber: '',
        complement: '',
        payMethod: {},
        cpf: '',
        extra: {
            'cardName': '',
            'cardNumber':'' ,
            'cardDate': '',
            'cardCVV': ''
        },
        productlist:{}

    })

    const productList = store.getters.getOfferList

    function getZipCode(cep) {
        
        return new Promise((resolve, reject) => {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                disabledNotCEP.value = false
                address.value = data.logradouro
                Neighborhoods.value = data.bairro
                City.value =data.localidade +' - '+ data.uf
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
    
    function sumTeste(a,b){
        return a+b
    }

    watch(phoneValue, (newValue, oldValue) => {
        if (newValue.length > 10) {
            phoneDisabled.value = true
        } else {
            phoneDisabled.value = false
        }
    })

    
    function finishPayment() {        
        paymentInformation.phone = phoneValue.value
        paymentInformation.cep = cep.value
        paymentInformation.address = ""+address.value + " - "+houseNumber.value +" "+ complement.value + " -" + Neighborhoods.value + " - " + City.value
        paymentInformation.houseNumber = houseNumber.value
        paymentInformation.complement = complement.value
        paymentInformation.cpf = cpf.value
        paymentInformation.payMethod = panel.value
        paymentInformation.productlist = productList


        store.dispatch('createOrder', paymentInformation).then((result) => {
            
            router.push({
                name: 'success',
                OFFER_CODE: result.data.OFFER_CODE,
                query: {
                    OFFER_CODE: result.data.OFFER_CODE,
                    ...route.query
                }

            })
        })
    }
    

    const cpfRequired = reactive([
        (v) => !!v || 'CPF é obrigatório',
        (v) => v.length === 11 || 'CPF deve ter 11 digitos'
    ])
    const cepRequired = reactive([
        (v) => !!v || 'CEP é obrigatório',
        (v) => v.length === 8 || 'CEP deve ter 8 digitos'
    ])
   function requiredOne (v) {
        return !!v || 'Campo Obrigatório'
    }
</script>