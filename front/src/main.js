import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '#app';
import './style.css';
import { router } from '#router';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';


const pinia = createPinia();
const app = createApp(App);



app.use(ToastService);
app.use(PrimeVue)
app.use(router);
app.use(pinia);

app.mount('#app');