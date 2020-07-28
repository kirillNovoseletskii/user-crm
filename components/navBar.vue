<template>
    <v-main>
        <v-toolbar extended dense color="gray" class="accent">
        <v-toolbar-title>Ayax Test Task</v-toolbar-title>
        <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          centered
          color='white'
        >
          <v-tab
                v-for="l in links" :key="l.to"
                @click="tabCl(l.to)"
            >
            {{ l.text }}
          </v-tab>
        </v-tabs>
        </template>
        <v-spacer></v-spacer>
        <v-row class='mt-5'>
            <v-col md='2'>
            <v-autocomplete
                append-icon=''
                placeholder="Имя"
                :items="names[0]"
                v-model="rieltor.firstName"
                clearable
            />
            </v-col>
            
            <v-col md='2'>
            <v-autocomplete
                append-icon=''
                placeholder="Фамилия"
                :items="names[1]"
                v-model="rieltor.lastName"
                clearable
            />
            </v-col>

            <v-col md='2'>
            <v-autocomplete
                append-icon=''
                placeholder="Под-ние"
                :items="names[2]"
                v-model="rieltor.sub"
                clearable
            />
            </v-col>
            <v-col>
                <v-btn @click="search">
                    <v-icon>mdi-card-search</v-icon>
                </v-btn>
            </v-col>
        </v-row>


        </v-toolbar>
    </v-main>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data() {
        return {
            rieltor: {},
            tabs: null,
            width: 0,
            links: [
                {
                    text: 'Rieltors List',
                    to: '/table'
                },
                {
                    text: 'New rieltor',
                    to: '/new'
                },
            ]
        }
    },
    methods: {
        ...mapActions(['updateNames', 'writeSearch']),
        tabCl(to){
            this.$router.push(to)
        },
        search(){
            const serchedRielt = this.data.filter(i => i.firstName==this.rieltor.firstName && i.lastName==this.rieltor.lastName && i.subdivision[0].name==this.rieltor.sub)
            this.writeSearch(serchedRielt)
            this.rieltor={}
        }
    },
    computed: {
        ...mapGetters(['names', 'data'])
    },
    async mounted() {
        await this.updateNames()
    },
}
</script>
<style>

</style>