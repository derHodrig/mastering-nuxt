<template>
  <v-app dark>
    <v-container>
      <v-row>
        <v-col
          v-if="error.statusCode === 404"
          class="d-flex flex-column align-center"
        >
          <v-img
            :src="require('@/assets/images/error-404.svg')"
            :max-height="800"
            contain
          ></v-img>
          <h1 class="mt-6">
            {{ pageNotFound }}
          </h1>

          <v-btn outlined nuxt to="/" color="primary" class="mt-4">
            Zur Startseite
          </v-btn>
        </v-col>
        <v-col v-else>
          <v-img
            :src="require('@/assets/images/error-other.svg')"
            :max-height="800"
            contain
          ></v-img>
          <h1 class="mt-6">
            {{ otherError }}
          </h1>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Uups, die aufgerufene Seite konnte nicht gefunden werden.',
      otherError:
        'Das sieht nicht gut aus. Sollte dieses Problem weiterhin bestehen, wenden Sie sich an unseren Support.',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
