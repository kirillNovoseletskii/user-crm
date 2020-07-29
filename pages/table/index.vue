<template>
  <v-main class="main_table">
  <h2 v-if="searchRes.length<1">Кол-во записей: {{data.length}}</h2>
  <h2 v-else>Кол-во записей: {{searchRes.length}}</h2>

  <v-simple-table v-if="searchRes.length<1" height="400px">
    <template v-slot:default>
      <thead>
        <tr>
          <th v-for="i in headers" :key="i.text">{{i.text}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id"
         @dblclick="editUserRoute(item.id)">
          <th>{{item.firstName}}</th>
          <th>{{item.lastName}}</th>
          <th>{{item.subdivision[0].name}}</th>
          <th>{{item.date.date}}/{{item.date.time}}</th>
          <th>{{item.id}}</th>
          <th>{{item.guid}}</th>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

     <v-simple-table v-else>
    <template v-slot:default>
      <thead>
        <tr>
          <th v-for="i in headers" :key="i.text">{{i.text}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in searchRes" :key="item.id"
         @dblclick="editUserRoute(item.id)">
          <th>{{item.firstName}}</th>
          <th>{{item.lastName}}</th>
          <th>{{item.subdivision[0].name}}</th>
          <th>{{item.date.date}}/{{item.date.time}}</th>
          <th>{{item.id}}</th>
          <th>{{item.guid}}</th>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-main>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters(['data', 'searchRes']),
    headers(){
      return [
        {text: 'Имя', value: 'firstName'},
        {text: 'Фамилия', value: 'lastName'},
        {text: 'Подразделение', value: 'subdivision'},
        {text: 'Дата регистрации', value: 'date'},
        {text: 'ID', value: 'id'},
        {text: 'GUID', value: 'guid'},
      ]
    },
  },
  methods: {
    ...mapActions(['SET_DATA']),
    editUserRoute(id){
      this.$router.push(`table/${id}`)
    },
  },
  async mounted() {
    await this.SET_DATA()
  },
}
</script>