<template>
    <div class="slider">
        <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            background="#ababab"
            img-width="1024"
            style="text-shadow: 1px 1px 2px #333"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
        >
            <!-- Text slides with image -->
            <b-carousel-slide
                caption="Pizza by georgiiagon"
                text="Pizza for every taste"
                img-src="public/images/slides/slider-1.jpg"
            ></b-carousel-slide>
            <b-carousel-slide img-src="public/images/slides/slider-7.jpg">
                <h1>Delicious</h1>
            </b-carousel-slide>

            <b-carousel-slide img-src="public/images/slides/slider-8.jpg">
                <h1>Quality</h1>
            </b-carousel-slide>

            <b-carousel-slide img-src="public/images/slides/slider-9.jpeg">
                <h1>Fast</h1>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
    export default {
        name: "slider",
        data() {
            return {
                slide: 0,
                sliding: null
            }
        },
        methods: {
            onSlideStart(slide) {
                this.sliding = true
            },
            onSlideEnd(slide) {
                this.sliding = false
            }
        }
    }
</script>

<style>
    .slider {
        margin-bottom: 20px;
    }
</style>
