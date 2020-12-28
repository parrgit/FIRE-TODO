<template>
  <v-container>
    <v-list-item>
      <form @submit.prevent="submit">
        <input
          type="text"
          v-model="title"
          placeholder="add new todo"
          class="text-input white--text pa-1"
          style="border:1px solid white"
        />
        <button class="btn" type="submit"></button>
      </form>
    </v-list-item>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    title: ""
  }),
  methods: {
    ...mapActions(["addTodo"]),
    submit() {
      this.addTodo({
        title: this.title,
        deadline: 10,
        isDone: false,
        isActive: true
      });
      this.title = "";
    },
  }
};
</script>
