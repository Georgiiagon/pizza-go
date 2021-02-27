<template>
    <div>
        <app-header></app-header>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import AppHeader from './components/AppHeader';
    import AppFooter from './components/AppFooter';

    export default {
        name: "Layout",
        components: {
            AppHeader,
            AppFooter,
        },
        mounted() {
            this.$store.dispatch('data/get', {path: '/api/get-products', type: 'products'});
        }
    }
</script>

<style>
    .el-header {
        margin-bottom: 10px;
    }
</style>
