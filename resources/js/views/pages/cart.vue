<template>
    <b-container v-if="products.length !== 0">
        <b-table :items="getCartArray" :fields="fields" striped show-empty empty-text="Cart is empty!">

            <template v-slot:cell(image)="row" >
                <img width="200" :alt="getProductById(parseInt(row.item[0])).name" :src="getProductById(parseInt(row.item[0])).image">
            </template>
            <template v-slot:cell(name)="row">
                {{ getProductById(parseInt(row.item[0])).name }}
            </template>
            <template v-slot:cell(count)="row">
                <b-button variant="link" @click="changeCart(row.item[0], -1)">
                    <b-icon-dash-circle></b-icon-dash-circle>
                </b-button>
                {{ row.item[1] }}
                <b-button variant="link" @click="changeCart(row.item[0], 1)">
                    <b-icon-plus-circle></b-icon-plus-circle>
                </b-button>

            </template>
            <template v-slot:cell(price)="row">
                {{ getCurrencyValue[0] }}{{ parseFloat(getProductById(parseInt(row.item[0])).price * getCurrencyValue[1]).toFixed(2) }}
            </template>

            <template v-slot:cell(sum_price)="row">
                {{ getCurrencyValue[0] }}{{ parseFloat(getProductById(parseInt(row.item[0])).price * row.item[1] * getCurrencyValue[1]).toFixed(2) }}
            </template>

            <template v-slot:empty="scope">
                <h4 class="text-center">Cart is empty</h4>
            </template>
        </b-table>


        <b-row cols="1" cols-sm="3" cols-md="3" cols-lg="3" v-if="getCartArray.length > 0">
            <b-col></b-col>
            <b-col></b-col>
            <b-col class="mt-2">
                <b-form-select @input="updateDelivery" :value="delivery" :options="deliveries"></b-form-select>
            </b-col>
            <b-col></b-col>
            <b-col></b-col>
            <b-col class="mt-2">
                <p>Delivery price: {{ getCurrencyValue[0] }}{{ getDeliveryPrice }} </p>
                <p>Total price: {{ getCurrencyValue[0] }}{{ getTotalPrice }} </p>
                <b-button v-b-modal.order-modal block variant="success">Order</b-button>
            </b-col>
        </b-row>
        <b-modal id="order-modal" title="Order" hide-footer>
                <div role="group">
                    <label for="input-name">Name*</label>
                    <b-form-input
                        id="input-name"
                        :readonly="isAuth"
                        v-model="user.name"
                        aria-describedby="input-live-help input-live-feedback"
                        placeholder="Enter your name"
                        trim
                    ></b-form-input>
                    <label for="input-surname">Surname*</label>
                    <b-form-input
                        id="input-surname"
                        :readonly="isAuth"
                        v-model="user.surname"
                        aria-describedby="input-live-help input-live-feedback"
                        placeholder="Enter your surname"
                        trim
                    ></b-form-input>
                    <label for="input-address">Address*</label>
                    <b-form-input
                        id="input-address"
                        :readonly="isAuth"
                        v-model="user.address"
                        aria-describedby="input-live-help input-live-feedback"
                        placeholder="Enter your address"
                        trim
                    ></b-form-input>
                    <b-button class="mt-3" variant="success" block @click="sendOrder" :disabled="loading">
                        <b-spinner v-if="loading" small></b-spinner>
                        Deliver!
                    </b-button>
                </div>
        </b-modal>
    </b-container>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: 'cart',
        data() {
            return {
                fields: [
                    { key: "image", label: "Image"},
                    { key: "name", label: "Name"},
                    { key: "count", label: "Count"},
                    { key: "price", label: "Price"},
                    { key: "sum_price", label: "Sum price"},
                ],
                user: {
                    name: '',
                    address: '',
                    surname: '',
                },
                loading: false,
            }
        },
        mounted() {
            if (this.$store.getters.isAuth) {
                this.user = this.$store.getters.user;
            }
        },
        computed: {
            ...mapGetters({
                getProductById: 'data/getProductById',
                getCartArray: 'data/getCartArray',
                getTotalPrice: 'data/getTotalPrice',
                getDeliveryPrice: 'data/getDeliveryPrice',
                getCurrencyValue: 'data/getCurrencyValue',
                isAuth: 'isAuth',
            }),
            ...mapState({
                products: state => state.data.products,
                deliveries: state => state.data.deliveries,
                delivery: state => state.data.delivery,
            }),
        },

        methods: {
            sendOrder() {
                let that = this;
                this.loading = true;
                this.$store.dispatch('data/sendOrder', {
                    user_name: this.user.name,
                    user_surname: this.user.surname,
                    user_address: this.user.address
                }).then(function () {
                    that.$appNotify.success('You have successfully ordered your pizza!');
                    that.loading = false;
                    that.$bvModal.hide('order-modal')
                }).catch((error) => {
                    that.loading = false;
                    that.$appNotify.error(error.response.data);
                });
            },
            changeCart(product_id, count) {
                this.$store.dispatch('data/changeCart', {product_id: product_id, count: count});
            },
            updateDelivery (value) {
                this.$store.commit('data/editDelivery', value)
            },
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

    label {
        margin-top: 5px;
    }
</style>
