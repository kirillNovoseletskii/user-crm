<template>
  <div>
  <h3 v-if="searchRes.length<1">Кол-во записей: {{data.length}}</h3>
  <h3 v-else>Кол-во записей: {{searchRes.length}}</h3>
    <v-data-table
      v-if="searchRes.length<1 || data"
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
      v-else-if="searchRes.length>=1"
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
    <v-row class="d-flex justify-center" v-else-if='!data'>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </v-row>
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