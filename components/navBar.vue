<template>
    <v-main>
        <v-toolbar dense color="gray" class="accent">
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
        <template v-slot:extension>
        <v-row>
            <v-col md='2'>
            <v-autocomplete
                append-icon=''
                placeholder="Имя"
                :items="names[0]"
            />
            </v-col>
            
            <v-col md='2'>
            <v-autocomplete
                append-icon=''
                placeholder="Фамилия"
                :items="names[1]"
            />
            </v-col>

            <v-col md='2'>
            <v-autocomplete
                append-icon=''
                placeholder="Под-ние"
                :items="names[2]"
            />
            </v-col>
            <v-col>
                <v-btn>
                    <v-icon>mdi-card-search</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        </template>


        </v-toolbar>
    </v-main>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    data() {
        return {
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
        ...mapActions(['updateNames']),
        tabCl(to){
            this.$router.push(to)
        }
    },
    computed: {
        ...mapGetters(['names'])
    },
    async mounted() {
        await this.updateNames()
    },
}
</script>
<style>

</style>