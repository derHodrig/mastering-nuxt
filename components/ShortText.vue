<template>
  <span>
    {{ displayText }}
    <v-btn v-if="tooLong && !isExpanded" small text @click="isExpanded = true">
      weiterlesen
    </v-btn>
    <v-btn v-if="tooLong && isExpanded" small text @click="isExpanded = false">
      weniger anzeigen
    </v-btn>
  </span>
</template>

<script>
export default {
  name: 'ShortText',
  props: {
    text: {
      type: String,
      required: true,
    },
    target: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: false,
      chunks: [],
    }
  },
  computed: {
    tooLong() {
      return this.chunks.length === 2
    },
    displayText() {
      if (!this.tooLong || this.isExpanded) return this.chunks.join(' ')
      return this.chunks[0] + '...'
    },
  },
  created() {
    this.chunks = this.getChunks()
  },
  methods: {
    getChunks() {
      const position = this.text.indexOf(' ', this.target)
      if (this.text.length <= this.target || this.position === -1) {
        return [this.text]
      }
      return [this.text.substring(0, position), this.text.substring(position)]
    },
  },
}
</script>
