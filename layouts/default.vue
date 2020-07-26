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
