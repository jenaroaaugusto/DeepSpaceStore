import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { makeServer } from "./server"

import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// The mock service worker for the browser.
// import { worker } from './mocks/browser.js';
// worker.start();

// The MirageJS  information for the server in scr/serve.js.
makeServer()

import store from './store/index.js'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    }
})


const app = createApp(App)


app.use(router)

app.use(vuetify)

app.use(store)

app.mount('#app')
