import firebase from "~/plugins/firebase.js";

export const state = () => ({
  login_user: null,
  todos: []
});

export const mutations = {
  //ユーザー情報 追加・削除
  setLoginUser(state, user) {
    state.login_user = user;
  },
  deleteLoginUser(state) {
    state.login_user = null;
  },
  //ソート
  sortTitle(state) {
    state.todos.sort(function(a, b) {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
  },
  sortDeadline(state) {
    state.todos.sort(function(a, b) {
      if (a.deadline < b.deadline) return -1;
      if (a.deadline > b.deadline) return 1;
      return 0;
    });
  },
  sortIsDone(state) {
    state.todos.sort(function(a, b) {
      if (a.isDone < b.isDone) return -1;
      if (a.isDone > b.isDone) return 1;
      return 0;
    });
  },
  //フィルター
  filtIsDone(state) {
    state.todos.forEach(todo => {
      if (todo.isDone === false) return;
      todo.isActive = false;
    });
  },
  resetIsDone(state) {
    state.todos.forEach(todo => {
      todo.isActive = true;
    });
  },
  // 追加、削除、アップデード
  addTodo(state, { id, todo }) {
    todo.id = id;
    state.todos.push(todo);
  },
  deleteTodo(state, { id }) {
    const index = state.todos.findIndex(todo => todo.id === id);
    state.todos.splice(index, 1);
  },
  //to-doコンポーネントからのアプデ用
  updateTodo(state, { id, innerTodo }) {
    const index = state.todos.findIndex(todo => todo.id === id);
    state.todos[index].title = innerTodo.title;
    state.todos[index].deadline = innerTodo.deadline;
    state.todos[index].isDone = innerTodo.isDone;
  },
  //draggable@index.vue用
  updateTodos(state, todos) {
    state.todos = todos;
  }
};

export const actions = {
  //common functions
  //ユーザー情報取得、削除
  setLoginUser({ commit }, user) {
    commit("setLoginUser", user);
  },
  deleteLoginUser({ commit }) {
    commit("deleteLoginUser");
  },
  //ソート
  sortTitle({ commit }) {
    commit("sortTitle");
  },
  sortDeadline({ commit }) {
    commit("sortDeadline");
  },
  sortIsDone({ commit }) {
    commit("sortIsDone");
  },
  //フィルター
  filtIsDone({ commit }) {
    commit("filtIsDone");
  },
  resetIsDone({ commit }) {
    commit("resetIsDone");
  },
  //Authentication
  //ログイン
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        alert("Hello, " + result.user.displayName + "!");
      });
  },
  //ログアウト
  logout() {
    firebase.auth().signOut();
  },
  //Cloud Firestore
  //フェッチ @default.vue
  fetchTodos({ getters, commit }) {
    firebase
      .firestore()
      .collection(`users/${getters.uid}/todos`)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc =>
          commit("addTodo", { id: doc.id, todo: doc.data() })
        );
      });
  },
  //todo追加 @addTodo.vue
  addTodo({ getters, commit }, todo) {
    firebase
      .firestore()
      .collection(`users/${getters.uid}/todos`)
      .add(todo)
      .then(doc => {
        commit("addTodo", { id: doc.id, todo });
      });
  },
  deleteTodo({ getters, commit }, id) {
    firebase
      .firestore()
      .collection(`users/${getters.uid}/todos`)
      .doc(id)
      .delete()
      .then(() => {
        commit("deleteTodo", { id });
      });
  },
  updateTodo({ getters, commit }, { id, innerTodo }) {
    if (getters.uid) {
      firebase
        .firestore()
        .collection(`users/${getters.uid}/todos`)
        .doc(id)
        .update(innerTodo)
        .then(() => {
          commit("updateTodo", { id, innerTodo });
        });
    }
  },
  // draggable @index.vue、ソート、フィルター後に並び順をアプデ
  updateTodos({ getters, commit }, todos) {
    commit("updateTodos", todos);
  }
};

export const getters = {
  total: state => state.todos.length,
  uid: state => (state.login_user ? state.login_user.uid : null),
  uname: state => (state.login_user ? state.login_user.displayName : null)
};

// ~/plugin/localStorage.jsにて購読
// store.subscribe((mutation, state) => {
//   localStorage.setItem("todo-lists", JSON.stringify(state.todos));
// });
