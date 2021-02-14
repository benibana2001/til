<template>
  <li v-if="test" @click="test = !test">{{ text }}</li>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  components: {},
  props: {
    text: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      test: true,
    }
  },
})
</script>
