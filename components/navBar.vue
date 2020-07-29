<template>
    <v-main>
    <v-navigation-drawer
            v-model="showMobileNavigation"
            absolute
            :permanent="false"
            style="height: 1000%"
        >
            <v-row justify="center">
                <v-list shaped>
                <v-subheader>Навигация</v-subheader>
                <v-list-item-group v-model="tabs">
                    <v-list-item
                    v-for="link in links"
                    :key="link.to"
                    @click="tabCl(link.to)"
                    >
                    <v-list-item-content>
                        <v-list-item-title v-text="link.text"></v-list-item-title>
                    </v-list-item-content>
                    </v-list-item> 
                </v-list-item-group>
                <v-subheader>Поиск</v-subheader>
                <v-list-item>
                    <v-form >
                    <v-autocomplete
                        append-icon=''
                        placeholder="Имя"
                        :items="names[0]"
                        v-model="rieltor.firstName"
                        clearable
                    />
                    <v-autocomplete
                        append-icon=''
                        placeholder="Фамилия"
                        :items="names[1]"
                        v-model="rieltor.lastName"
                        clearable
                    />
                    <v-autocomplete
                        append-icon=''
                        placeholder="Подразделение"
                        :items="names[2]"
                        v-model="rieltor.sub"
                        clearable
                    />
                     <v-btn @click="search">
                        <v-icon>mdi-card-search</v-icon>
                    </v-btn>
                    <v-btn @click="back">
                        <v-icon>mdi-chevron-left-box</v-icon>
                    </v-btn>
                    </v-form>
                </v-list-item>
                </v-list>
            </v-row>
        
        </v-navigation-drawer>
        <v-app-bar 
            extended 
            scroll
            dense color="gray" 
            class="accent"
        >
        <v-app-bar-nav-icon @click="vOn" class="d-flex d-md-none"></v-app-bar-nav-icon>
        
        <v-toolbar-title>Ayax Test Task</v-toolbar-title>
        <template v-slot:extension>
        <v-row class="d-none d-md-flex">

            <v-col>
                <v-tabs 
                v-model="tabs"
                color='white'
                >
                <v-tab
                        v-for="l in links" :key="l.to"
                        @click="tabCl(l.to)"
                    >
                    {{ l.text }}
                </v-tab>
                </v-tabs>
            </v-col>
        </v-row>
        </template>
        <v-spacer></v-spacer>
        <v-form class="d-none d-md-flex">
            
            <v-row class='mt-5'>
            <v-col md='2' sm='2' xs='2'>
            <v-autocomplete
                append-icon=''
                placeholder="Имя"
                :items="names[0]"
                v-model="rieltor.firstName"
                clearable
            />
            </v-col>
            
            <v-col md='2' sm='2' xs='2'>
            <v-autocomplete
                append-icon=''
                placeholder="Фамилия"
                :items="names[1]"
                v-model="rieltor.lastName"
                clearable
            />
            </v-col>

            <v-col md='2' sm='2' xs='2'>
            <v-autocomplete
                append-icon=''
                placeholder="Под-ние"
                :items="names[2]"
                v-model="rieltor.sub"
                clearable
            />
            </v-col>
            <v-col xs='2'>
                <v-btn @click="search">
                    <v-icon>mdi-card-search</v-icon>
                </v-btn>
                <v-btn @click="back">
                    <v-icon>mdi-chevron-left-box</v-icon>
                </v-btn>
            </v-col>
        </v-row>

        </v-form>


        </v-app-bar>
    </v-main>
</template>

<script>
import {mapActions, mapGetters} from 'vuex' // import for work with vuex    
export default {
    data() {
        return {
            rieltor: {}, // template for rieltor    
            showMobileNavigation: false,
            tabs: null,
            width: 0,
            links: [
                {
                    text: 'Список риелторов',
                    to: '/table'
                },
                {
                    text: 'Новый риелтор',
                    to: '/new'
                },
            ]
        }
    },
    methods: {
        ...mapActions(['SET_DATA', 'writeSearch']),
        tabCl(toRoute){
            this.$router.push(toRoute) // function for navigation
        },
        search(){ // search rieltor function 
            const serchedRielt = this.data.filter(i => i.firstName==this.rieltor.firstName 
                                                        && i.lastName==this.rieltor.lastName 
                                                        && i.subdivision[0].name==this.rieltor.sub) // find rieltor
            this.writeSearch(serchedRielt) // go to store and call function writeSearch
            this.rieltor={} // clear text fields
            this.$router.push('/table') // route to table page
        },
        back(){ // function for back from search table to all rieltors
            const serchedRielt = [] // create no data 
            this.writeSearch(serchedRielt) // go to store and call function writeSearch with []
            this.rieltor={} // clear text fields
            this.$router.push('/table') // route to table page
        },
        vOn(){
            this.showMobileNavigation = !this.showMobileNavigation // change state when click on button
        }
    },
    computed: {
        ...mapGetters(['names', 'data']) // take data from store
    },
    async mounted() {
        await this.SET_DATA() // load data
    },
}
</script>
<style>

</style>