export default [
    {
        path: '/',
        redirect: '/home',
        alias: 'home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: 'home' */'../views/home/home.vue')
    }
]
