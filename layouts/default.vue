<template>
  <v-app dark>
    <v-app-bar app>
      <v-toolbar-title>
        <v-btn text plain nuxt to="/" class="title">{{ title }}</v-btn>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      title: 'Mastering Nuxt',
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
  },
}
</script>
