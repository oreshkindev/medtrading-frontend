import Vue from 'vue'
import VueRouter from 'vue-router'

import home from './views/home.vue'
import o_kompanii from './views/o-kompanii.vue'
import kak_kupit from './views/kak-kupit.vue'
import oplata from './views/oplata.vue'
import dostavka from './views/dostavka.vue'
import kontakty from './views/kontakty.vue'
import vozvrat from './views/vozvrat-i-obmen.vue'
import obyazatelstva from './views/garantijnye-obyazatelstva.vue'

import category from './views/category.vue'
import item from './views/item.vue'

import cabinet from './views/cabinet.vue'
import cpanel from './views/cpanel.vue'

import products from './views/products.vue'
import products_create from './views/products-create.vue'

import categories from './views/categories.vue'
import categories_create from './views/categories-create.vue'

import users from './views/users.vue'
import callme from './views/callme.vue'
import checkout from './views/checkout.vue'
import checkoutUser from './views/checkout-user.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
        },
        {
            path: '/o-kompanii',
            name: 'o_kompanii',
            component: o_kompanii,
        },
        {
            path: '/kak-kupit',
            name: 'kak_kupit',
            component: kak_kupit,
        },
        {
            path: '/oplata',
            name: 'oplata',
            component: oplata,
        },
        {
            path: '/dostavka',
            name: 'dostavka',
            component: dostavka,
        },
        {
            path: '/kontakty',
            name: 'kontakty',
            component: kontakty,
        },
        {
            path: '/vozvrat-i-obmen',
            name: 'vozvrat',
            component: vozvrat,
        },
        {
            path: '/garantijnye-obyazatelstva',
            name: 'obyazatelstva',
            component: obyazatelstva,
        },
        {
            path: '/category/:slug',
            name: 'category',
            component: category,
        },
        {
            path: '/category/:slug/:item',
            name: 'item',
            component: item,
        },
        {
            path: '/cabinet',
            name: 'cabinet',
            component: cabinet,
            meta: { requiresAuth: true, residentAuth: true, adminAuth: false },
            children: [
                {
                    path: '/cabinet/checkout',
                    component: checkoutUser,
                    meta: {
                        requiresAuth: true,
                        residentAuth: true,
                        adminAuth: false,
                    },
                },
            ],
        },
        {
            path: '/cpanel',
            name: 'cpanel',
            component: cpanel,
            meta: { requiresAuth: true, adminAuth: true, residentAuth: false },
            children: [
                {
                    path: '/cpanel/products',
                    component: products,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/products/create',
                    component: products_create,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/categories',
                    component: categories,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/categories/create',
                    component: categories_create,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/users',
                    component: users,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/checkout',
                    component: checkout,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
                {
                    path: '/cpanel/callme',
                    component: callme,
                    meta: {
                        requiresAuth: true,
                        adminAuth: true,
                        residentAuth: false,
                    },
                },
            ],
        },
    ],
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const authUser = JSON.parse(window.localStorage.getItem('session_data'))

        if (!authUser || !authUser.user.token) {
            next({ name: 'home' })
        } else if (to.meta.adminAuth) {
            const authUser = JSON.parse(
                window.localStorage.getItem('session_data')
            )

            if (
                authUser.user.verification_token ===
                '069b93a5-8b0b-4331-be44-32e07dfb2324'
            ) {
                next()
            } else {
                console.log('Connected as user')
                next('/cabinet')
            }
        } else if (to.meta.residentAuth) {
            const authUser = JSON.parse(
                window.localStorage.getItem('session_data')
            )

            if (
                authUser.user.verification_token !==
                '069b93a5-8b0b-4331-be44-32e07dfb2324'
            ) {
                next()
            } else {
                console.log('Connected as administrator')
                next('/cpanel')
            }
        }
    } else {
        next()
    }
})

export default router
