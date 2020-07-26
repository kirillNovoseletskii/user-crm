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
            <v-select
              v-model="form.subdivision"
              :items="subs"
              color="pink"
              label="Выбери подразделение"
              required
            ></v-select>
            <v-row justify="center" class="d-inline-flex">
                <h3 style="margin-bottom: 10px">Выбери дату регистрации</h3>
                <v-date-picker v-model="form.date.date"></v-date-picker>
                <v-time-picker
                v-model="form.date.time"
                class="mt-4"
                format="24hr"
                ></v-time-picker>
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
            form: {
                date: {
                    date: '',
                    time: '0:0'
                }
            },
            timeStep: '',
            nameRules: [
                v => !!v || 'обязательное поле'
            ]
        }
    },
    methods: {
        createRieltor(){
            this.$store.dispatch('createRielt', this.form),
            this.$router.push('/table')
        }
    },
    computed: {
        ...mapGetters(['subs']),
        enable(){
            if(this.form.firstName && this.form.lastName && this.form.subdivision && this.form.date.date && this.form.date.time){
                return false
            } else {
                return true
            }
        }
    },
}
</script>