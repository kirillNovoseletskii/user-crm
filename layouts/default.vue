<template>
  <v-app>
    <v-main>
      <navBar/>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import navBar from '../components/navBar'
export default {
  components: {
    navBar
  }
}
</script>
<style>
  html, body {
  margin: 0;
  padding:0;
  position:absolute;/* this is very important*/
  left:0;
  top:0;
  width:100%;
  max-height:50%;
}
</style>