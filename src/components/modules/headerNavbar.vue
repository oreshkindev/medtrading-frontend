<template>
    <nav>
        <ul>
            <li v-if="!routeName('home')">
                <router-link to="/" v-text="`Главная`" />
            </li>
            <li>
                <router-link
                    to="/kak-kupit"
                    v-text="$t('header.nav.kak-kupit.title')"
                />
            </li>
            <li>
                <router-link
                    to="/oplata"
                    v-text="$t('header.nav.oplata.title')"
                />
            </li>
            <li>
                <router-link
                    to="/dostavka"
                    v-text="$t('header.nav.dostavka.title')"
                />
            </li>
            <li>
                <router-link
                    to="/kontakty"
                    v-text="$t('header.nav.kontakty.title')"
                />
            </li>
            <li>
                <router-link
                    to="/o-kompanii"
                    v-text="$t('header.nav.o-nas.title')"
                />
            </li>
            <li>
                <span
                    v-if="session"
                    v-text="$t('header.nav.signout.title')"
                    v-on:click="signout"
                />
                <span
                    v-else
                    v-text="$t('header.nav.signin.title')"
                    v-on:click="$emit('signin_modal')"
                />
            </li>
            <li v-if="!session">
                <span
                    v-text="$t('header.nav.signup.title')"
                    v-on:click="$emit('signup_modal')"
                />
            </li>
            <li v-if="session && !routeName('cpanel', 'cabinet')">
                <router-link
                    to="/cabinet"
                    v-text="$t('header.nav.cabinet.title')"
                />
            </li>
            <li v-if="cart != false" v-on:click="$emit('cart_modal')">
                <figure class="icon">
                    <svg width="22" viewBox="0 0 494.67 494.67">
                        <path
                            d="M421.621 116.048h-56.939v-3.735C364.682 50.383 314.299 0 252.369 0h-9.45c-61.93 0-112.313 50.384-112.313 112.313v3.735H73.049c-8.297 0-15.026 6.727-15.026 15.025v348.572c0 8.299 6.729 15.025 15.026 15.025h348.572c8.299 0 15.025-6.728 15.025-15.025V131.073c.002-8.299-6.726-15.025-15.025-15.025zm-255.548-3.735c0-42.372 34.473-76.846 76.846-76.846h9.45c42.373 0 76.695 34.474 76.695 76.846l-.021 36.722c0 9.792-7.838 17.729-17.629 17.729-9.793 0-17.729-7.938-17.729-17.729 0-.041.008-.082.008-.123l-.019-32.863h-92.147v32.863h-.006c0 .041.006.082.006.123 0 9.792-7.938 17.729-17.729 17.729-9.792 0-17.729-7.938-17.729-17.729l.004-36.722z"
                        />
                    </svg>
                </figure>
            </li>
        </ul>

        <ul>
            <li class="phone">
                <a href="tel:+79258603573">+7 (925) 860-35-73</a>
            </li>
            <searchbar v-model="search" />
            <li>
                <button
                    class="button button__base"
                    v-on:click="$emit('modal')"
                    v-text="`Обратный звонок`"
                />
            </li>
        </ul>

        <ul class="search-filter" v-if="search.length > 2">
            <li v-for="p in filteredList" :key="p.name" @click="search = ''">
                <router-link
                    :to="
                        '/category/' +
                            get_category(p.category_id).public_name +
                            '/' +
                            p.public_name
                    "
                    v-text="p.name"
                />
            </li>
        </ul>

        <ul>
            <li v-for="item in category" :key="item.id">
                <router-link
                    :to="`/category/${item.public_name}`"
                    v-text="item.name"
                />
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            search: '',
        }
    },
    computed: {
        ...mapGetters({
            data: 'Session/responseData',
            category: 'Category/responseData',
            productData: 'Product/responseData',
            cart: 'Product/stock',
        }),
        session: self => (self.data ? self.data.user : false),
        numInCart() {
            return this.cart.length
        },
        filteredList() {
            return this.productData.filter(p => {
                return p.name.toLowerCase().includes(this.search.toLowerCase())
            })
        },
    },
    methods: {
        ...mapActions('Session', ['signout']),
        routeName(...name) {
            return [...name].indexOf(this.$route.name) > -1
        },
        get_category(id) {
            return this.category.filter(c => c.public_id == id).first()
        },
    },
    async mounted() {
        await this.$store.dispatch('Category/get_all')
        await this.$store.dispatch('Product/get_all')
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
