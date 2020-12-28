<template>
  <v-container>
    <v-row>
      <draggable
        class="d-flex flex-wrap justify-start"
        flat
        tile
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
import Vue2Filters from "vue2-filters"

export default {
  components: {
    draggable
  },
  computed: {
    ...mapState(["todos"])
  },
  methods: {
    ...mapActions(["updateTodos"])
  },
  mixins:[Vue2Filters.mixin]
};
</script>
