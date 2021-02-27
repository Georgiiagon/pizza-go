require('./bootstrap');

import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';

import {router} from './routes/index';
import {store} from './store/index.js';
import {AppNotify} from './utils/app-notify';
import App from './components/App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(AppNotify);

window.axios.defaults.headers.common['Authorization'] = store.getters.token;

store.dispatch('profile').then(() => {
    new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
    });
});
