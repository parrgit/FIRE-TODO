<template>
  <v-container>
    <v-row class="justify-start">
      <draggable
        class="d-flex flex-wrap"
        :list="todos"
        @end="updateTodos(todos)"
      >
        <Todo
          v-for="todo in todos"
          :key="todo.id"
          :isActive="todo.isActive"
          :title="todo.title"
          :deadline="todo.deadline"
          :isDone="todo.isDone"
          :id="todo.id"
        />
      </draggable>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  computed: {
    ...mapState(["todos"])
  },
  methods: {
    ...mapActions(["updateTodos"])
  }
};
</script>
