<template>
  <v-card nuxt :to="'/homes/' + home.objectID">
    <v-img height="200" :src="home.images[0]" />
    <v-card-title>
      {{ home.title }}
    </v-card-title>
    <v-card-subtitle>
      {{ home.location.address }} • {{ home.location.city }} •
      {{ home.location.state }}
    </v-card-subtitle>
    <v-card-text>
      <v-chip-group color="primary" column>
        <v-chip>{{ home.guests }} guests</v-chip>
        <v-chip>{{ home.pricePerNight }} / night</v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'HomeCard',
  props: {
    home: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped></style>
