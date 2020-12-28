<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="white--text">
          Sort
        </v-list-item-title>
        <Btn :text="'title'" @btn-click="sortTitle" />
        <Btn :text="'days left'" @btn-click="sortDeadline" />
        <Btn :text="'status'" @btn-click="sortIsDone" />
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["sortTitle", "sortDeadline", "sortIsDone"])
  }
};
</script>
