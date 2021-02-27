<template>
    <b-container>
        <b-row class="justify-content-md-center">
            <b-col class="mt-5" cols="12" md="auto">
                <b-card
                    class="text-center"
                    style="max-width: 25rem;"
                >
                    <template v-slot:header>
                        <h3 v-if="!showRegister">Sign in</h3>
                        <h3 v-if="showRegister">Registration</h3>
                    </template>
                    <b-card-body>
                        <b-form @submit.prevent="submit" v-if="!showRegister">
                            <b-form-group
                                id="input-group-1"
                                label="Email"
                                label-for="input-1"
                                class="text-left"
                            >
                                <b-form-input
                                    id="input-1"
                                    v-model="form.email"
                                    type="email"
                                    required
                                    placeholder="Enter email"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group
                                id="input-group-2"
                                label="Password"
                                class="text-left"
                                label-for="input-2"
                            >
                                <b-form-input
                                    id="input-2"
                                    v-model="form.password"
                                    required
                                    type="password"
                                    placeholder="Enter password"
                                ></b-form-input>
                            </b-form-group>

                            <b-button type="submit" class="btn-auth" variant="primary" :disabled="loading">
                                <b-spinner v-if="loading" small></b-spinner>
                                Sign in
                            </b-button>
                        </b-form>

                        <b-form @submit.prevent="registration" v-if="showRegister">
                            <b-form-group
                                id="input-group-3"
                                label="Email*"
                                class="text-left"
                                label-for="input-3"
                            >
                                <b-form-input
                                    id="input-3"
                                    v-model="form.email"
                                    type="email"
                                    required
                                    placeholder="Enter email"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-5" label="Name*" class="text-left" label-for="input-5">
                                <b-form-input
                                    id="input-5"
                                    v-model="form.name"
                                    required
                                    placeholder="Enter name"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-6" label="Surname*" class="text-left" label-for="input-6">
                                <b-form-input
                                    id="input-6"
                                    v-model="form.surname"
                                    required
                                    placeholder="Enter surname"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-7" label="Address*" class="text-left" label-for="input-7">
                                <b-form-input
                                    id="input-7"
                                    v-model="form.address"
                                    placeholder="Enter address"
                                ></b-form-input>
                            </b-form-group>

                            <b-form-group id="input-group-4" label="Password*" class="text-left" label-for="input-4">
                                <b-form-input
                                    id="input-4"
                                    v-model="form.password"
                                    required
                                    minlength="6"
                                    type="password"
                                    placeholder="Enter password"
                                ></b-form-input>
                            </b-form-group>

                            <b-button type="submit" class="btn-auth" variant="primary" :disabled="loading">
                                <b-spinner v-if="loading" small></b-spinner>
                                Register
                            </b-button>
                        </b-form>
                    </b-card-body>
                    <template v-slot:footer>
                        <small class="text-muted" v-if="!showRegister">
                            Not a member?
                            <b-link @click="showRegister = !showRegister">Join now</b-link>
                        </small>
                        <small class="text-muted" v-if="showRegister">
                            Already registered?
                            <b-link @click="showRegister = !showRegister">Sign in</b-link>
                        </small>
                    </template>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                form: {
                    name: '',
                    surname: '',
                    address: '',
                    email: '',
                    password: '',
                },
                showRegister: false,
                loading: false,
            }
        },
        computed: {
            ...mapState({
                user: state => state.user,
            }),
        },
        mounted() {
            if (this.$store.getters.isAuth) {
                this.$router.replace({ name: 'home' })
            }
        },
        methods: {
            ...mapActions({
                login: 'login',
            }),
            async submit () {
                let that = this;
                this.loading = true

                await this.login({email: this.form.email, password: this.form.password})
                    .then(response => {
                        that.loading = false;
                        that.$router.replace({ name: 'home' });
                    })
                    .catch((error) => {
                        that.loading = false;
                        that.$appNotify.error(error.response.data);
                    });;
            },
            async registration () {
                let that = this;
                this.loading = true

                await this.$store.dispatch('register', this.form)
                    .then(response => {})
                    .catch((error) => {
                        that.loading = false;
                        that.$appNotify.error(error.response.data);
                    });
                await that.submit();
            },
            async reset() {
                this.form = {
                    name: '',
                    surname: '',
                    address: '',
                    email: '',
                    password: '',
                };
            }
        }
    }
</script>

<style>
    .btn-auth {
        width: 100%;
    }
</style>
