<template>
  <div class="home">
    <h1>Todo Team Work!</h1> 
    <div class="create-post">
      <label for="create-post">New Todo</label>
      <input
        type="text"
        id="create-post"
        v-model="text"
        placeholder="Enter new todo"
      />
      <button v-on:click="createPost">Add Todo</button>
      <div class="container">
        <div class="posts-container" v-if="!rangeTime">
          <div
            class="post pending"
            v-for="todo in todos"
            :item="todo"
            :key="todo._id"
            :class="{ done: todo.isDone }"
          >
            <img
              id="delete-btn"
              @click="deleteTodo(todo._id)"
              src="../assets/del.png"
              alt=""
            />
            <p class="text">{{ todo.body }}</p>
            <p>Время создания: {{ todo.creation_date }}</p>

            <button class="done-btn" @click="done(todo._id)" v-if="todo.isDone">
              Не сделано
            </button>
            <button
              class="undone-btn"
              @click="done(todo._id)"
              v-if="!todo.isDone"
            >
              Сделано
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";
export default {
  name: "Home",
  components: {
    
  },
  data() {
    return {
      rangeTime: false,
      text: "",
      todos: [],
      range: null,
    };
  },
  watch: {
    // posts(newPost, oldPost) {
    //   console.log("Watch")
    // }
  },
  methods: {
    createPost() {
      let date = new Date();
      let newPost = {
        body: this.text,
        id: Date.now(),
        isDone: false,
        date:
          (date.getUTCHours() + 3 < 10
            ? "0" + (date.getUTCHours() + 3)
            : date.getUTCHours() + 3) +
          ":" +
          (date.getUTCMinutes() < 10
            ? "0" + date.getUTCMinutes()
            : date.getUTCMinutes()) +
          "\n" +
          date.getUTCDate() +
          "." +
          (date.getUTCMonth() + 1) +
          "." +
          date.getUTCFullYear(),
      };
      axios.post("http://localhost:4000/api/todos/add", newPost);
      this.todos.push(newPost);
      this.text = "";
      this.getData();
    },
    deleteTodo(id) {
      console.log(id);
      axios.delete("http://localhost:4000/api/todos/delete/" + id);
      this.todos = this.todos.filter((a) => a._id !== id);
    },
    done(id) {
      let updTodo = this.todos.find((a) => a._id === id);
      if (updTodo.isDone) {
        updTodo.isDone = false;
      } else {
        updTodo.isDone = true;
      }
      axios.put("http://localhost:4000/api/todos/update", updTodo);
    },
    getData() {
      axios.get("http://localhost:4000/api/todos/").then((todos) => {
        this.todos = todos.data;
      });
    },
    // saveLocal() {
    //   localStorage.setItem('toods', JSON.stringify(this.todos))
    // },
  },
  // mounted() {
  //   this.posts = JSON.parse(localStorage.getItem('toods')) || []
  // }
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

div.post {
  position: relative;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
#delete-btn {
  font-weight: bold;
  border: none;
  width: 30px;
  position: absolute;
  left: 95%;
}
.done {
  border: 1px solid #5bd658 !important;
  background-color: #bcffb8 !important;
}
.pending {
  border: 1px solid #3f3f3f;
  background-color: #e4e4e4;
}
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>