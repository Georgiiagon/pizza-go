import Vuex from 'vuex';
import Vue from 'vue';
import auth from "./modules/auth";
import data from "./modules/data";

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        data,
        auth,
    }
});
