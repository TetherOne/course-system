import {
    createApp,
    App
} from 'vue';

import AppComponent from '#src/AppComponent';

import {
    createPinia,
    Pinia
} from 'pinia';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import 'primevue/resources/themes/aura-dark-indigo/theme.css';
import 'primeicons/primeicons.css';

import '#src/style';
import router from '#router';



const app: App<Element> = createApp(AppComponent);
const pinia: Pinia = createPinia();



app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.directive('tooltip', Tooltip);

app.mount('#app');