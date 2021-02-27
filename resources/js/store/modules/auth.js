import Cookie from 'js-cookie';
import api from '../../api/api';

export default {
    state: {
        user: {},
        token: Cookie.get('token') || '',
        isAuth: false
    },
    getters: {
        isAuth: state => state.isAuth,
        user: state => state.user,
        token: state => state.token,
    },
    mutations: {
        setUser: (state, user) => {
            state.user = user;
        },
        setAuth (state, value) {
            state.isAuth = value
        },
        setToken (state, value) {
            state.token = value
        },
    },
    actions: {
        async login ({ dispatch, commit }, credentials) {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post('api/login', credentials).then(response => {
                let authToken = 'Bearer ' + response.data;
                Cookie.set('token', authToken, { expires: 1 });
                window.axios.defaults.headers.common['Authorization'] = authToken;
                commit('setToken', authToken);
            });

            return dispatch('profile')
        },
        profile ({ commit }) {
            return axios.get('/api/profile').then((response) => {
                commit('setAuth', true);
                commit('setUser', response.data);
            }).catch(() => {
                commit('setAuth', false);
                commit('setUser', null);
            })
        },
        async register ({ dispatch }, credentials) {
            return await axios.post('api/register', credentials);
        },
        exit({commit}) {
            return new Promise((resolve, reject) => {
                api.get('/api/logout')
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    })
                    .finally(function () {
                        Cookie.remove('token');
                        commit('setAuth', false);
                        commit('setUser', null);
                        commit('setToken', '');
                        window.axios.defaults.headers.common['Authorization'] = '';
                    });
            });
        },
    },
};
