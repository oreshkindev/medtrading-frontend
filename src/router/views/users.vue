<template>
    <div>
        <h1>Список товаров</h1>
        <table>
            <thead>
                <tr>
                    <th>Имя пользователя</th>
                    <th>Адрес эл.почты</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in users" :key="item.id">
                    <td>
                        {{ item.name }}
                    </td>
                    <td>{{ item.email }}</td>
                    <td style="text-align: center;">
                        <svg
                            viewBox="0 0 24 24"
                            @click="remove(item.public_id)"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </td>
                </tr>
            </tbody>
        </table>

        <response-handler />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            users: 'User/responseData',
        }),
    },
    methods: {
        ...mapActions('User', ['get_all', 'remove_user']),

        remove(public_id) {
            this.remove_user({ public_id: public_id })
        },
    },
    mounted() {
        this.get_all()
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
