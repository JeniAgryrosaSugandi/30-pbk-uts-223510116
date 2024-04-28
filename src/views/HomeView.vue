<template>
  <div class="todo-app">
    <h1>ToDolist</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Item..." />
      <button type="submit" class="primary">Tambahkan</button>
    </form>
    <h2>List</h2>
    <div class="filter-section">
      <button @click="filterTodos('all')" class="filter-btn">Semua</button>
      <button @click="filterTodos('active')" class="filter-btn">Belum</button>
      <button @click="filterTodos('completed')" class="filter-btn">Selesai</button>
    </div>
    <ul class="todo-list">
      <li v-for="(todo, index) in filteredTodos" :key="index">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ 'done': todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(index)" class="danger">Hapus</button>
      </li>
    </ul>
    <footer>
      <p></p>
    </footer>
  </div>
</template>



<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all',
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length === 0) {
        return;
      }
      this.todos.push({
        text: this.newTodo,
        done: false,
      });
      this.newTodo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    filterTodos(filterType) {
      this.filter = filterType;
    },
  },
  computed: {
    filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter(todo => !todo.done);
        case 'completed':
          return this.todos.filter(todo => todo.done);
        default:
          return this.todos;
      }
    },
  },
};


</script>

<style>
/* General Styles */
body {
  color: #333; /* Dark text color for better readability */
  font-family: "Montserrat", sans-serif; /* Elegant sans-serif font */
  margin: 0;
  background-color: #f3e5f5; /* Pink Coquette background color */
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  background-color: #fff; /* White background for clear text */
}

/* Heading */
.todo-app h1 {
  text-align: center;
  color: #ff4081; /* Pink Coquette heading color */
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Input Form */
.todo-app form {
  display: flex;
  margin-bottom: 20px;
}

.todo-app input[type=text] {
  flex: 1;
  padding: 15px 20px; /* Increase padding for a more spacious feel */
  font-size: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle inset shadow for a touch of depth */
}

.todo-app button[type=submit] {
  margin-left: 10px;
  padding: 15px 30px; /* Increase padding for larger buttons */
  font-size: 1.2rem;
  background-color: #ff4081; /* Pink Coquette button color */
  color: #321b1b; /* White button text */
  border: none; /* Remove border for better strikethrough visibility */
}

/* Filter Buttons */
.filter-btn {
  padding: 10px 20px; /* Increase padding for larger buttons */
  margin-right: 10px; /* Add margin between buttons */
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  color: #f08c8c; /* White text for filter buttons */
}

.filter-btn.all {
  background-color: #ff4081; /* Pink Coquette background for "All" filter */
}

.filter-btn.completed {
  background-color: #9c27b0; /* Purple background for "Completed" filter */
}

.filter-btn.not-completed {
  background-color: #7b1fa2; /* Dark purple background for "Not Completed" filter */
}

.filter-btn.remove {
  background-color: #d50000; /* Red background for "Remove" filter */
}


.done {
  text-decoration: line-through;
  color: #aaa;
}

</style>