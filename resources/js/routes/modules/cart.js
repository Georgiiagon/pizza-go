export default [
    {
        path: '/cart',
        component: () => import('../../views/pages/cart.vue'),
        name: 'cart',
        meta: {
            title: 'Order a pizza',
        },
    },
]
