<template>
  <v-btn
    tile
    color="primary"
    class="white--text"
    @click="$emit('btn-click')"
    >{{ text }}</v-btn
  >
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>
