<template>
  <v-card
    dark
    tile
    outlined
    width="200"
    class="ma-2 mt-4"
    v-if="isActive"
    color="primary"
  >
    <!-- タイトル -->
    <v-app-bar
      dense
      color="primary"
      @click="isInputOf.title = !isInputOf.title"
    >
      <v-toolbar-title class="text-subtitle-1 ml-3" v-show="!isInputOf.title">
        {{ innerTodo.title }}
      </v-toolbar-title>
      <v-form @submit.prevent="submit('title')" v-show="isInputOf.title">
        <v-text-field
          dense
          hide-details
          solo
          class="text-subtitle-1"
          label="title"
          v-model="innerTodo.title"
        />
      </v-form>
      <v-spacer></v-spacer>
      <v-icon @click="deleteTodo(id)" color="white">mdi-close</v-icon>
    </v-app-bar>
    <!-- 余日 -->
    <v-card-title
      @click="isInputOf.deadline = !isInputOf.deadline"
      v-show="!isInputOf.deadline"
      class="text-subtitle-1"
    >
      <span class="mx-2"> {{ innerTodo.deadline }} </span>days left
    </v-card-title>
    <v-form @submit.prevent="submit('deadline')" v-show="isInputOf.deadline">
      <v-text-field
        dense
        hide-details
        solo
        class="text-subtitle-1 ma-3"
        label="left days"
        type="number"
        v-model.number="innerTodo.deadline"
      />
    </v-form>
    <v-divider></v-divider>
    <!-- IS DONE -->
    <v-checkbox
      class="ma-0 pa-3"
      hide-details
      dense
      v-model="innerTodo.isDone"
      label="done"
      @change="submit('isDone')"
    ></v-checkbox>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["isActive", "title", "deadline", "isDone", "id"],
  //data: () => ({}) （return省略形）
  //↑だとthis.が多分使えない
  data: function() {
    return {
      //入力モード
      isInputOf: {
        title: false,
        deadline: false,
        isDone: false
      },
      //コンポーネント内でいじる用
      innerTodo: {
        title: this.title,
        deadline: this.deadline,
        isDone: this.isDone
      }
    };
  },
  methods: {
    ...mapActions(["deleteTodo", "updateTodo"]),
    submit(element) {
      this.updateTodo({ id: this.id, innerTodo: this.innerTodo });
      switch (element) {
        case "title":
          this.isInputOf.title = !this.isInputOf.title;
          break;
        case "deadline":
          this.isInputOf.deadline = !this.isInputOf.deadline;
          break;
        case "isDone":
          this.isInputOf.isDone = !this.isInputOf.isDone;
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.v-card__title,
.v-input {
  background: #0f0e17;
}
</style>
