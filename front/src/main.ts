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
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
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

app.directive('tooltip', Tooltip);

app.mount('#app');