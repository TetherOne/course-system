import {
    createApp
} from 'vue';

import {
    createPinia
} from 'pinia';
import PrimeVue from 'primevue/config';

import './style.css';
import App from './App.vue';

import {
    router
} from './router.js';


const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue)
app.use(router);
app.use(pinia);
app.mount('#app');