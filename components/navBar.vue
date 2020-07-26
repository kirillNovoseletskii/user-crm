<template>
    <v-main>
        <v-toolbar dense color="gray" class="accent">
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
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
        </v-toolbar>
    </v-main>
</template>

<script>
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
        tabCl(to){
            this.$router.push(to)
        }
    }
}
</script>
<style>

</style>