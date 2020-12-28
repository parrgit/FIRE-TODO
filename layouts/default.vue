<template>
  <v-app>
    <v-navigation-drawer
      color="background"
      clipped
      app
      stateless
      v-model="drawer"
    >
      <Sort />
      <Filt />
      <AddTodo />
    </v-navigation-drawer>

    <v-app-bar color="background" dark app clipped-left outlined>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My-todo-list</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-subtitle-1 mr-5">{{
        uname
      }}</v-toolbar-title>
      <v-toolbar-items v-if="!login_user">
        <v-btn text @click="login">
          Login
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if="login_user">
        <v-btn text @click="logout">
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>

    <v-footer color="background" class="caption text-center" dark app padless>
      <v-col> 2020 ― parrgit </v-col>
    </v-footer>
  </v-app>
</template>

<script>
// import draggable from "vuedraggable";
import { mapActions } from "vuex";
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import firebase from "~/plugins/firebase";

export default {
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.deleteLoginUser();
      } else {
        //分割代入して精選する！さもなくばエラー↓
        //vuex関連の無限コールバック
        //下記storeのsetLoginUserは呼び出されるものの、stateに即座に反映されない
        const { uid, displayName } = user;
        this.setLoginUser({ uid, displayName });
        this.fetchTodos();
      }
    });
  },
  data: function() {
    return {
      drawer: null
    };
  },
  computed: {
    ...mapState(["login_user"]),
    ...mapGetters(["uname"])
  },
  methods: {
    // movingTodo: function() {
    //   this.$store.dispatch("updateTodos", { todos: this.todos });
    // }
    ...mapActions([
      "login",
      "logout",
      "setLoginUser",
      "deleteLoginUser",
      "fetchTodos"
    ])
  }
};
</script>

<style lang="scss">
.v-sheet.v-sheet--outlined.theme--dark.v-toolbar.v-app-bar.v-app-bar--clipped.v-app-bar--fixed.background {
  border:none;
  border-bottom: 5px solid #880E4F !important;
}
// nav.v-navigation-drawer.v-navigation-drawer--clipped.v-navigation-drawer--fixed.v-navigation-drawer--open.theme--light.background{
//   border-right: 1px solid #cc7eb1 !important
// }
</style>
