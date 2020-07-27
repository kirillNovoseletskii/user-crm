<template>
    <v-container>
        <v-form @submit.prevent="createRieltor">
            <v-row class="d-flex justify-center mb-6">
            <v-col cols="12" sm="6" md="4">
            <v-text-field
                label="Имя"
                outlined
                dense
                :rules="nameRules"
                required
                v-model="form.firstName"
            />
            <v-text-field
                label="Фамилия"
                outlined
                dense
                :rules="nameRules"
                required
                v-model="form.lastName"
            />

            <v-row justify="center" class="d-inline-flex">
                <h3 style="margin-bottom: 10px">Выбери дату регистрации</h3>
                <v-date-picker v-model="form.date.date"></v-date-picker>
                <v-time-picker
                v-model="form.date.time"
                class="mt-4"
                format="24hr"
                ></v-time-picker>

                <v-autocomplete
                v-model="subdivision"
                :loading="loading"
                :items="subNames"
                :search-input.sync="search"
                cache-items
                class="mx-4"
                flat
                hide-no-data
                hide-details
                label="Выбери подразделение"
                required
                >
                </v-autocomplete>

                <v-btn :disabled='enable' style="margin-top: 10px" type="submit" color="success">Создать</v-btn>
            </v-row>
            </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {
            form: {date: {date: '',time: '0:0'}},
            timeStep: '',
            nameRules: [v => !!v || 'обязательное поле'],
            search: '',
            loading: false,
            subs: [
                {name: 'Sub1', id: Math.floor(Math.random()*10000), date:'2020-07-01/01:15'},
                {name: 'Sub2', id: Math.floor(Math.random()*10000), date:'2020-01-15/02:36'},
                {name: 'Sub3', id: Math.floor(Math.random()*10000), date:'2020-01-15/02:36'},
                {name: 'Sub4', id: Math.floor(Math.random()*10000), date:'2018-01-23/02:36'},
                {name: 'Sub5', id: Math.floor(Math.random()*10000), date:'2019-06-17/15:48'}
            ],
            subNames: ['Sub1', 'Sub2', 'Sub3', 'Sub4', 'Sub5'],
            subdivision: ''
        }
    },
    methods: {
        ...mapActions(['SET_DATA']),
        createRieltor(){
            this.form.subdivision = this.subs.filter(i => i.name === this.subdivision)
            console.log(this.form)
            this.$store.dispatch('createRielt', this.form),
            this.$router.push('/table')
        }
    },
    computed: {
        enable(){
            if(this.form.firstName && this.form.lastName && this.subdivision && this.form.date.date && this.form.date.time){
                return false
            } else {
                return true
            }
        }
    }
}
</script>