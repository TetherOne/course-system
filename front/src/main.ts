import {
    App,
    createApp
} from 'vue';

import {
    Pinia,
    createPinia
} from 'pinia';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-dark-indigo/theme.css';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import 'primeicons/primeicons.css';

import AppComponent from '#src/App';
import '#src/style';
import router from '#router';



const pinia: Pinia = createPinia();
const app: App<Element> = createApp(AppComponent);



app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.mount('#app');