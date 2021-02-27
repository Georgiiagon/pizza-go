export default [
    {
        path: '/login',
        component: () => import('../../views/pages/login.vue'),
        name: 'login',
        meta: {
            title: 'Auth',
        },
    },
]
