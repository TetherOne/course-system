import {
    App,
    createApp
} from 'vue';

import {
    Pinia,
    createPinia
} from 'pinia';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';

import { router } from '#src/router';
import AppComponent from '#src/App';



const pinia: Pinia = createPinia();
const app: App<Element> = createApp(AppComponent);



app.use(PrimeVue);
app.use(ToastService);
app.use(pinia);
app.use(router);

app.directive('tooltip', Tooltip);

app.mount('#app');