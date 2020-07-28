<template>
  <div>
  <h3 v-if="searchRes.length<1">Кол-во записей: {{data.length}}</h3>
  <h3 v-else>Кол-во записей: {{searchRes.length}}</h3>
    <v-data-table
      v-if="searchRes.length<1"
      :items="data"
      :headers="headers"
      hide-default-footer
    >
      <template 
        v-slot:item="{item}" 
      >
        <tr @dblclick="editUserRoute(item.id)">
          <th>{{item.firstName}}</th>
          <th>{{item.lastName}}</th>
          <th>{{item.subdivision[0].name}}</th>
          <th>{{item.date.date}}/{{item.date.time}}</th>
          <th>{{item.id}}</th>
          <th>{{item.guid}}</th>
        </tr>
      </template>
    </v-data-table>

    <v-data-table 
      v-else
      :items="searchRes"
      :headers="headers"
      hide-default-footer
    >
    <template 
        v-slot:item="{item}" 
      >
        <tr @dblclick="editUserRoute(item.id)">
          <th>{{item.firstName}}</th>
          <th>{{item.lastName}}</th>
          <th>{{item.subdivision[0].name}}</th>
          <th>{{item.date.date}}/{{item.date.time}}</th>
          <th>{{item.id}}</th>
          <th>{{item.guid}}</th>
        </tr>
      </template>
    </v-data-table>
  </div>
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
  mounted() {
    this.SET_DATA()
  },
}
</script>