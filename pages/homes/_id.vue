<template>
  <div>
    <v-carousel
      cycle
      height="350"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item v-for="img in home.images" :key="img">
        <v-img
          :max-height="350"
          :src="img"
          :alt="home.title"
          position="center center"
        ></v-img>
      </v-carousel-item>
    </v-carousel>
    <div>{{ home.title }}</div>
    <div>${{ home.pricePerNight }}/night</div>
    <div>
      <v-icon>mdi-map-marker</v-icon> {{ home.location.address }} •
      {{ home.location.city }} • {{ home.location.state }}
    </div>
    <div><v-icon>mdi-star</v-icon> {{ home.reviewValue }}</div>
    <div>
      {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds,
      {{ home.bathrooms }} bath
    </div>
    <v-sheet height="800" width="800">
      <div ref="map" style="height: 800px; width: 800px"></div>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: 'SingleHomePage',
  async asyncData({ params, $dataApi, error }) {
    const { json, ok, status, statusText } = await $dataApi.getHome(params.id)

    if (!ok) {
      return error({ statusCode: status, message: statusText })
    }

    return { home: json }
  },
  data() {
    return {
      home: {},
    }
  },
  head() {
    return {
      title: this.home.title,
    }
  },
  mounted() {
    this.$maps.showMap(
      this.$refs.map,
      this.home._geoloc.lat,
      this.home._geoloc.lng
    )
  },
}
</script>

<style scoped></style>
