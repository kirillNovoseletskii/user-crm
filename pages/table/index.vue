<template>
  <div>
  <h3>Кол-во записей: {{data.length}}</h3>
    <v-data-table
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
          <th>{{item.subdivision}}</th>
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
    ...mapGetters(['data']),
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
    ...mapActions(['SET_DATA', 'REMOVE_RIELT']),
    delRielt(id, name, fam){
      const yes = confirm(`Удалить риелтора ${name} ${fam}?`)
      if(yes){
        this.REMOVE_RIELT(id)
      }
    },
    editUserRoute(id){
      this.$router.push(`table/${id}`)
    },
  },
  mounted() {
    this.SET_DATA()
  },
}
</script>