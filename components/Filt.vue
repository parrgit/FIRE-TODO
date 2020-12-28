<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="white--text">
          Reject
        </v-list-item-title>
        <Btn :text="'done'" @btn-click="filtIsDone" />
        <Btn :text="'none'" @btn-click="resetIsDone" />
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["filtIsDone", "resetIsDone"])
  }
};
</script>
