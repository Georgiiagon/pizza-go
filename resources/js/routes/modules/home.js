export default [
    {
        path: '/home',
        component: () => import('../../views/pages/home.vue'),
        name: 'home',
        meta: {
            title: 'Order a pizza',
        },
    },
]
