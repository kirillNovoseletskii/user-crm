<template>
    <v-main>
    <h2>Редактирование риелтора</h2>        
        <v-form @submit.prevent="editRieltor">
            <v-row class="d-flex justify-center mb-6">
            <v-col cols="12" sm="6" md="4">
            <v-btn class="mb-5 ml-10" color="error" @click="rmRielt(rieltor.id)">Удалить риелтора</v-btn>
            <v-text-field
                label="Имя"
                outlined
                dense
                :rules="nameRules"
                required
                v-model="rieltor.firstName"
            />
            <v-text-field
                label="Фамилия"
                outlined
                dense
                :rules="nameRules"
                required
                v-model="rieltor.lastName"
            />
            <v-select
              v-model="rieltor.subdivision"
              :items="subs"
              color="pink"
              label="Выбери подразделение"
              required
            ></v-select>
            <v-row justify="center" class="d-inline-flex">
                <h3 class="mb-10">Выбери дату регистрации</h3>
                <v-date-picker v-model="rieltor.date.date"></v-date-picker>
                <v-time-picker
                v-model="rieltor.date.time"
                class="mt-4"
                format="24hr"
                />
                <v-btn class="mt-10" color="info" @click="editRieltor(rieltor)">Редактировать риелтора</v-btn>
            </v-row>
            </v-col>
            </v-row>
        </v-form>

    </v-main>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return {
            nameRules: [
                v => !!v || 'поле не можеть быть пустым'
            ]
        }
    },
    computed: {
        ...mapGetters(['data', 'subs']),
        rieltor(){
            return this.data.filter(i => i.id == this.$route.params.id)[0]
        }
    },
    async mounted() {
        await this.SET_DATA(),
        console.log(this.rieltorMain, this.rieltor)
    },
    methods: {
        ...mapActions(['SET_DATA']),
        async rmRielt(id){
            const yes = confirm('Вы уверены что хотиту удалить риелтора?')
            if(yes){
                await this.$store.dispatch('REMOVE_RIELT', id)
                this.$router.push('/table')
            }
        },
        editRieltor(){
            this.$store.dispatch('editRieltor', this.rieltor)
        }
    },
}
</script>