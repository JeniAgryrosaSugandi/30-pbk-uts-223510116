<template>
  <div class="todos">
    <h1 class="todo-app">Masukkan todo list</h1>
    <form class="todo-app" @submit.prevent="handleSubmit">
      <input
        class="todo-app"
        v-model="newTodo"
        required
        placeholder="new todo"
      />
      <button class="todo-app" type="submit">Add Todo</button>
      <button class="todo-app" type="button" @click="toggleHideCompleted">
        {{ hideCompleted ? "Show all" : "Hide completed" }}
      </button>
      <ul>
        <li v-for="todo in filteredTodos" :key="todo.id">
          <input type="checkbox" v-model="todo.done" @change="updateTodos" />
          <span :class="{ done: todo.done }">{{ todo.text }}</span>
          <button class="filter-btn remove" @click="removeTodo(todo)">X</button>
        </li>
      </ul>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useTodoStore } from "../stores/todos";
import { storeToRefs } from "pinia";

const todoStore = useTodoStore();
const { todos, hideCompleted, filteredTodos } = storeToRefs(todoStore);
const { addTodo, removeTodo, toggleHideCompleted } = todoStore;

const newTodo = ref("");

const handleSubmit = () => {
  if (newTodo.value.trim()) {
    addTodo(newTodo.value);
    newTodo.value = "";
  }
};

const updateTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos.value));
};

// Watch for changes in todos and update local storage
watch(
  todos,
  (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  },
  { deep: true }
);
</script>

<style scoped>
/* General Styles */
body {
  color: #333;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  background-color: #f3e5f5;
  background-image: url("/src/assets/pink.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
}

/* Todo List Container */
.todo-app {
  color: #9c27b0;
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

/* Heading */
.todo-app h1 {
  text-align: center;
  color: #ff4081;
  font-size: 1.5em;
  margin-bottom: 20px;
}

/* Input Form */
.todo-app form {
  display: flex;
  margin-bottom: 20px;
}

.todo-app input[type="text"] {
  flex: 1;
  padding: 15px 20px;
  font-size: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

.todo-app button[type="submit"] {
  margin-left: 10px;
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #ff4081;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.todo-app button[type="button"] {
  margin-left: 10px;
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: #9c27b0;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Filter Buttons */
.filter-btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  color: #f08c8c;
}

.filter-btn.all {
  background-color: #ff4081;
}

.filter-btn.completed {
  background-color: #9c27b0;
}

.filter-btn.not-completed {
  background-color: #7b1fa2;
}

.filter-btn.remove {
  background-color: #d50000;
}

.done {
  text-decoration: line-through;
  color: #aaa;
}
</style>
