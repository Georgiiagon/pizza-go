<template>
    <b-container fluid="">
        <b-row cols="1" cols-sm="1" cols-md="3" cols-lg="4">
            <b-col class="pizza-item" v-for="(item, index) in products" :key="index">
                <b-card :title="item.Name" :img-src="item.Image" img-alt="Image" img-top>
                    <b-card-text>
                        {{ item.Description }}
                    </b-card-text>
                    <div class="clearfix">
                        <h5 class="price float-left">{{ getCurrencyValue[0] }}{{ parseFloat(item.Price * getCurrencyValue[1]).toFixed(2) }} </h5>
                        <span class="float-right" v-if="cart[item.Id.toString()] > 0">
                            <b-button variant="link" @click="changeCart(item.Id, -1)">
                                <b-icon-dash-circle></b-icon-dash-circle>
                            </b-button>
                            {{ cart[item.Id] }}
                            <b-button variant="link" @click="changeCart(item.Id, 1)">
                                <b-icon-plus-circle></b-icon-plus-circle>
                            </b-button>
                        </span>
                    </div>
                    <template v-slot:footer>
                        <b-button block icon="cart3" @click="changeCart(item.Id, 1)" variant="secondary">
                            <b-icon-cart3></b-icon-cart3>
                            <span v-if="cart[item.Id.toString()] == 0 || !cart[item.Id.toString()]">Want!</span>
                            <span v-if="cart[item.Id.toString()] > 0">One more!</span>
                        </b-button>
                    </template>
                </b-card>
            </b-col>

        </b-row>
    </b-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "products",
        computed: {
            ...mapGetters({
                products: 'data/products',
                cart: 'data/cart',
                getCurrencyValue: 'data/getCurrencyValue',
            }),
        },
        methods: {
            changeCart(product_id, count) {
                this.$store.dispatch('data/changeCart', {product_id: product_id, count: count});
            },
        }
    }
</script>

<style>
    .pizza-item {
        margin-bottom: 20px;
    }
    .btn:focus {
        outline: none;
        box-shadow: none;
    }
    .price {
        padding-top: 0.375rem;
    }
</style>
