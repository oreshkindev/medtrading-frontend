<template>
    <section>
        <div class="articles">
            <!-- Articles -->
            <article v-for="item in category" :key="item.id">
                <header>
                    <img :src="getImgUrl(item.image)" alt="" />
                </header>
                <router-link
                    class="button button__filled"
                    :to="`/category/${item.public_name}`"
                    v-text="item.name"
                />
            </article>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            category: 'Category/responseData',
        }),
    },
    methods: {
        getImgUrl(pic) {
            return '/img/category/' + pic
            // return 'https://medtrading.org/img/category/' + pic
            // return require('@/assets/images/category/' + pic)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
