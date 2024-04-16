import { createApp } from 'vue';
import { createPinia } from 'pinia';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';

import App from '#app';
import './style.css';
import { router } from '#router';


const pinia = createPinia();
const app = createApp(App);


app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.use(pinia);

app.mount('#app');