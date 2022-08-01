<template>
  <v-container>
    <v-row>
      <v-col v-for="home in homes" :key="home.objectID" cols="12" md="6" xl="4">
        <home-card :home="home" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import homes from '@/data/homes'

export default {
  name: 'IndexPage',
  data() {
    return {
      homes: homes.slice(0, 3),
    }
  },
}
</script>

<style scoped></style>
