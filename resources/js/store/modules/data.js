import Cookie from 'js-cookie';
import api from '../../api/api';

export default {
    namespaced: true,
    state: {
        products: [],
        orders: [],
        cart: JSON.parse((Cookie.get('cart') !== undefined ? Cookie.get('cart'): null) ) || {},
        currency: 0,
        currencies: [['$', 1], ['€', 0.9]], // [sign ,coefficient]
        deliveries: [
            {
                'value': 1,
                'text': 'Courier delivery',
                'Price': 5,
            },
            {
                'value': 2,
                'text': 'Express delivery',
                'Price': 8,
            },
            {
                'value': 3,
                'text': 'Pickup',
                'Price':  0,
            },
        ],
        delivery: 1,
    },
    getters: {
        currency: state => state.currency,
        currencies: state => state.currencies,
        getCurrencyValue: (state) => {
            return state.currencies[state.currency];
        },
        products: state => state.products,
        orders: state => state.orders,
        cart: state => state.cart,
        deliveries: state => state.deliveries,
        delivery: state => state.delivery,
        getProductById: state => id => {
            return state.products.find(product => product.id == id) || {Price: 0, Name: ''}
        },
        getCartArray: state => {
            return Object.entries(state.cart).filter(item => item[1] !== 0);
        },
        getCartLength: (state, getters) => {
            return getters.getCartArray.length;
        },
        getDeliveryByValue: state => value => {
            return state.deliveries.find(delivery => delivery.value == value)
        },
        getDeliveryPrice: (state, getters) => {
            return state.deliveries.find(delivery => delivery.value == state.delivery).Price
                * getters.getCurrencyValue[1]
        },
        getTotalPrice: (state, getters) => {
            let sum = 0;
            getters.getCartArray.forEach(item => {
                sum += getters.getProductById(item[0]).Price * item[1];
            });
            sum = sum * getters.getCurrencyValue[1];
            sum += getters.getDeliveryPrice;

            return parseFloat(sum).toFixed(2)
        },
        getProductNames: () => order => {
            let products = [];

            order.items.forEach(item => {
                products.push(' name: ' + item.Name + ', count: ' + item.pivot.count);
            });

            return products
        },
        getOrderTotalPrice: (state, getters) => order => {
            let sum = 0;
            order.items.forEach(item => {
                sum += item.Price * item.pivot.count;
            });
            sum += getters.getDeliveryByValue(order.delivery).Price;
            sum = sum * getters.getCurrencyValue[1];

            return parseFloat(sum).toFixed(2)
        },
    },
    mutations: {
        set (state, {type, data}) {
            state[type] = data;
        },
        editDelivery(state, value) {
            state.delivery = value;
        },
    },
    actions: {
        changeCart({state}, payload = {}) {
            if ((state.cart[payload.product_id] + payload.count >= 0) || state.cart[payload.product_id] === undefined) {
                state.cart[payload.product_id] = (state.cart[payload.product_id] || 0) + payload.count;
                state.cart = JSON.parse(JSON.stringify(state.cart));
                Cookie.set('cart', state.cart);
            }
        },
        sendOrder({state, getters}, payload = {}) {
            return api.post('api/order', {user_info: payload, items: state.cart, delivery: state.delivery})
                .then(function (response) {
                    Cookie.remove('cart');
                    state.cart = {};
                });
        },
        get ({commit}, payload = {}) {
            return new Promise((resolve, reject) => {
                api.get(payload.path)
                    .then(function (response) {
                        commit('set', {type: payload.type, data: response.data});
                        resolve(response);
                    })
                    .catch(function (error) {
                        reject(error);
                    });
            });
        },
    },
}
