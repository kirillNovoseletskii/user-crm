<template>
    <v-main>
        <v-form @submit="edit" v-if="rieltor">
            <v-row class="d-flex justify-center">
                <v-col sm="6" md="4">
                    <v-text-field 
                    label="Имя"
                    outlined
                    dense
                    v-model="rieltor.firstName"
                    />
                </v-col>

                <v-col sm="6" md="4">
                    <v-text-field 
                    label="Фамилия"
                    outlined
                    dense
                    v-model="rieltor.lastName"
                    />
                </v-col>

            </v-row>
            <v-row class="d-flex justify-center">
                <v-col sm="6" md="4">      
                    <v-date-picker 
                        v-model="rieltor.date.date"
                        full-width
                    />
                </v-col>

                <v-col sm="6" md="4">
                    <v-time-picker
                        v-model="rieltor.date.time"
                        format="24hr"
                        full-width
                    />
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
                <v-col sm="6" md="4">
                    <v-autocomplete
                    v-model="rieltor.subdivision[0].name"
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
                />
                </v-col>
            </v-row>

            <v-row class="d-flex justify-center align-center">
                <v-col sm="6" md="4" class="d-flex justify-center align-center ml-10">
                    <v-btn type='submit' color="info">Редактировать</v-btn> 
                </v-col>
                или
                <v-col sm="6" md="4" class="d-flex justify-center align-center mr-10">
                    <v-btn color="error" @click="rmRieltor">Удалить</v-btn>
                </v-col>
            </v-row>
        </v-form>

        <v-row class="d-flex justify-center" v-else>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </v-row>
        

    </v-main>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data() {
        return {
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
        }
    },
    methods: {
        ...mapActions(['SET_DATA', 'editRieltor', 'REMOVE_RIELT']),
        edit(){
            this.editRieltor(this.rieltor)
            this.$router.push('/table')
        },
        rmRieltor(){
            const yes = confirm('Вы точно хотите удалить этого риелтора?')
            if (yes){
                this.$router.push('/table')
                this.REMOVE_RIELT(this.$route.params.id)
            }
        }
    },
    computed: {
        ...mapGetters(['data']),
        rieltor(){
            return this.data.filter(i => i.id === this.$route.params.id)[0]
        }
    },
    async mounted() {
        await this.SET_DATA()
    },
}
</script>
<style >
    .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    margin-top: 80px;
    }
    .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
    }
    @keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
</style>