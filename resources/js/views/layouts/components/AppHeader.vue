<template>
    <b-navbar type="dark" toggleable="sm" id="header" variant="dark" :router="true">
            <b-navbar-brand to="/">Pizza</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item :active="1 === activeLink" to="/home">Home</b-nav-item>
                    <b-nav-item :active="2 === activeLink" to="/cart">
                        Cart
                        <span v-if="getCartLength > 0">({{ getCartLength }})</span>
                    </b-nav-item>
                    <b-nav-item :active="4 === activeLink" v-if="isAuth" to="/orders">Orders</b-nav-item>

                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown :text="getCurrencyValue[0]" right>
                        <b-dropdown-item v-for="(cur, index) in currencies" :key="index" @click="set({type: 'currency', data: index})">{{ cur[0] }} currency</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown :text="user == null ? 'User': user.name" right>
                        <b-dropdown-item toggle-class="text-dark" v-if="!isAuth" to="/login">Login</b-dropdown-item>
                        <b-dropdown-item v-if="isAuth" @click="logout">Logout</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
    </b-navbar>
</template>

<script>
    import {mapActions, mapGetters, mapMutations } from "vuex";

    export default {
        name: "AppHeader",
        computed: {
            ...mapGetters({
                isAuth: 'isAuth',
                user: 'user',
                getCurrencyValue: 'data/getCurrencyValue',
                currencies: 'data/currencies',
                getCartLength: 'data/getCartLength',
            }),
            routes() {
                return this.$router.options.routes[0].children;
            },
            activeLink() {
                return _.findIndex(this.routes, ['path', this.$route.path]);
            }
        },
        methods: {
            logout() {
                let that = this;
                this.exit().then(function () {
                    if (that.$router.currentRoute.name !== 'home') {
                        that.$router.replace({ name: 'home' })
                    }
                });
            },
            ...mapActions({
                exit: 'exit',
            }),
            ...mapMutations({
                set: 'data/set' // map `this.add()` to `this.$store.commit('increment')`
            })
        }
    }
</script>
