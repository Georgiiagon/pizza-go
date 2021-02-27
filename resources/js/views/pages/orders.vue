<template>
    <b-container>
        <b-table :items="orders" :fields="fields" striped responsive="sm" show-empty>

            <template v-slot:cell(created_at)="row" >
                {{ (new Date(row.item.created_at)).toLocaleString() }}
            </template>

            <template v-slot:cell(items)="row">
                <p v-for="product in getProductNames(row.item)">
                    {{ product }}
                </p>
            </template>

            <template v-slot:cell(delivery)="row">
                {{ getDeliveryByValue(row.item.delivery).text }}
            </template>

            <template v-slot:cell(sum_price)="row">
                {{ getCurrencyValue[0] }}{{ getOrderTotalPrice(row.item) }}
            </template>

            <template v-slot:empty="scope">
                <h4 class="text-center">No orders!</h4>
            </template>
        </b-table>
    </b-container>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: 'cart',
        data() {
            return {
                fields: [
                    { key: "created_at", label: "Date"},
                    { key: "items", label: "Products"},
                    { key: "delivery", label: "Delivery"},
                    { key: "sum_price", label: "Sum price"},
                ],
            }
        },
        computed: {
            ...mapGetters({
                orders: 'data/orders',
                getOrderTotalPrice: 'data/getOrderTotalPrice',
                getProductNames: 'data/getProductNames',
                getCurrencyValue: 'data/getCurrencyValue',
                getDeliveryByValue: 'data/getDeliveryByValue',
            }),
        },
        mounted() {
            this.$store.dispatch('data/get', {path: '/api/order', type: 'orders'})

            if (!this.$store.getters.isAuth) {
                this.$router.replace({ name: 'home' })
            }
        }
    }
</script>

<style>
    .btn:focus {
        outline: none;
        box-shadow: none;
    }
    .btn {
        padding-left: 1px;
        padding-right: 1px;
    }
</style>
