<template>
    <div>
        <slider></slider>
        <products></products>
    </div>
</template>

<script>
    import slider from './modules/slider';
    import products from './modules/products';

    export default {
        name: "home",
        components: {
            slider,
            products,
        },
    }
</script>

