/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import mixins from "./mixins";
import router from './router';
import store from './store';

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

registerPlugins(app)
app.mixin(mixins);
app.use(router);
app.use(store);
app.use(VueSweetalert2);
app.mount('#app')

