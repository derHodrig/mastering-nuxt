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
    <v-row dense class="d-flex justify-center mt-3">
      <v-col v-for="review in reviews" :key="review.objectID" cols="6" md="4">
        <v-card height="100%">
          <v-row class="d-flex justify-center mt-2">
            <v-avatar size="120">
              <v-img :src="review.reviewer.image"></v-img>
            </v-avatar>
          </v-row>
          <v-card-title>{{ review.reviewer.name }}</v-card-title>
          <v-card-subtitle>
            {{ formatDate(review.date) }}
          </v-card-subtitle>
          <v-card-text>
            <short-text :text="review.comment" :target="160"></short-text>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense class="d-flex justify-center mt-3">
      <v-col cols="6" md="4">
        <v-card height="100%">
          <v-row class="d-flex justify-center mt-2">
            <v-avatar size="120">
              <v-img :src="user.image"></v-img>
            </v-avatar>
          </v-row>
          <v-card-title>
            {{ user.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ formatDate(user.joined) }} | Reviews:
            {{ user.reviewCount }}
          </v-card-subtitle>
          <v-card-text>
            <short-text :text="user.description" :target="160"></short-text>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ShortText from '~/components/ShortText'
export default {
  name: 'SingleHomePage',
  components: { ShortText },
  async asyncData({ params, $dataApi, error }) {
    const homeResponse = await $dataApi.getHome(params.id)
    const reviewResponse = await $dataApi.getReviewsByHomeId(params.id)
    const userResponse = await $dataApi.getUserByHomeId(params.id)

    if (!homeResponse.ok) {
      return error({
        statusCode: homeResponse.status,
        message: homeResponse.statusText,
      })
    }
    if (!reviewResponse.ok) {
      return error({
        statusCode: reviewResponse.status,
        message: reviewResponse.statusText,
      })
    }

    if (!userResponse.ok) {
      return error({
        statusCode: userResponse.status,
        message: userResponse.statusText,
      })
    }

    return {
      home: homeResponse.json,
      reviews: reviewResponse.json.hits,
      user: userResponse.json.hits[0],
    }
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
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString('de-DE', {
        month: 'long',
        year: 'numeric',
      })
    },
  },
}
</script>

<style scoped></style>
