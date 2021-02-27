<template>
    <footer class="store-footer">
        <p>Online store built for a test assignment<br> by <b-link href="https://career.habr.com/georgiiagon">georgiiagon</b-link></p>
        <p>
            <b-button @click="scrollToTop" variant="link">Back to top</b-button>
        </p>
    </footer>
</template>

<script>
    export default {
        name: "AppFooter",
        methods: {
            scrollToTop() {
                document.querySelector('#header')
                    .scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
</script>

<style scoped>
    .store-footer {
        margin-top: 2.5rem;
        padding-bottom: 2.5rem;
        padding-top: 2.5rem;
        color: #999;
        text-align: center;
        background-color: #f9f9f9;
        border-top: .05rem solid #e5e5e5;
    }
</style>
