import { createApp } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';

import './style.css';
import App from './App.vue';
import router from './router.js';


const pinia = createPinia();
const app = createApp(App);


app.use(router);
app.use(pinia);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app');