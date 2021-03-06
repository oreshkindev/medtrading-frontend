import storage from '../../common/storage'

import axios from '../../common/api'

import router from '../../router'

const state = {
    data: storage.get('session_data'),
    status: '',
}

const getters = {
    responseData: state => (state.data ? state.data : null),
    responseStatus: state => (state.status ? state.status : false),
}

const actions = {
    async signin({ commit }, data) {
        await axios
            .post('auth/login', data)
            .then(response => {
                commit('responseData', response.data)

                commit('responseStatus', response.data, { root: true })

                axios.init()
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    async signup({ commit }, data) {
        await axios
            .post('user/', data)
            .then(response => {
                commit('responseStatus', response.data, { root: true })
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
    },

    /**
     * Logout the current user by removing the token from storage.
     *
     * Will also remove `Authorization <token>` header from requests.
     **/
    async signout({ commit }) {
        axios.init()

        await axios
            .post('auth/logout')
            .then(response => {
                commit('responseStatus', response.data, { root: true })
            })
            .catch(error => {
                commit('responseStatus', error.response.data, { root: true })
            })
        // Remove the token and remove axios header from /common/api
        state.data = null

        axios.close()

        router.push('/')
    },
}

const mutations = {
    responseData(state, data) {
        storage.set('session_data', {
            user: {
                token: data.Authorization,
                name: data.data.name,
                email: data.data.email,
                verification_token: data.data.verification_token,
                registered_on: data.data.registered_on,
            },
        })

        state.data = storage.get('session_data')
    },

    responseStatus(state, status) {
        state.status = status
        setTimeout(() => {
            state.status = ''
        }, 3000)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
