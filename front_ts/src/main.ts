import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {router} from '#src/router';
import App from '#src/App';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primeicons/primeicons.css';


const pinia = createPinia();
const app = createApp(App);


app.use(router);
app.use(pinia);
app.use(PrimeVue);
app.use(ToastService);

app.mount('#app');