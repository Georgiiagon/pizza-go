export default [
    {
        path: '/orders',
        component: () => import('../../views/pages/orders.vue'),
        name: 'orders',
        meta: {
            title: 'Orders',
        },
    },
]
