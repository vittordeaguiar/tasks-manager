<script setup>
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {toast} from "vue3-toastify";

const newTaskTitle = ref('')
const tasks = ref([])
const user = ref(null)
const router = useRouter()
const {$supabase} = useNuxtApp()

const fetchTasks = async () => {
  if (!user.value) return;
  const {data, error} = await $supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.value.id)

  if (error) return console.error('Error fetching tasks:', error)

  tasks.value = data
}

const addTask = async () => {
  if (!user.value) return;

  const {data, error} = await $supabase
      .from('tasks')
      .insert({title: newTaskTitle.value, is_complete: false, user_id: user.value.id})

  if (error) return alert('Error adding task: ' + error.message)

  tasks.value.push(data[0])
  newTaskTitle.value = ''
}

const toggleComplete = async (task) => {
  const {error} = await $supabase
      .from('tasks')
      .update({is_complete: task.is_complete})
      .eq('id', task.id)

  if (error) toast.error('Error updating task: ' + error.message)
}

const deleteTask = async (id) => {
  const {error} = await $supabase
      .from('tasks')
      .delete()
      .eq('id', id)

  if (error) return toast.error('Error deleting task: ' + error.message)

  tasks.value = tasks.value.filter(task => task.id !== id)
}

onMounted(async () => {
  const {data: {session}} = await $supabase.auth.getSession()

  if (!session) {
    await router.push('/login');
  } else {
    user.value = session.user
    await fetchTasks()
  }

  $supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      user.value = session.user
    } else {
      user.value = null
      router.push('/login')
    }
  })
})
</script>

<template>
  <div>
    <h1>Task List</h1>
    <div v-if="user">
      <form @submit.prevent="addTask">
        <input v-model="newTaskTitle" placeholder="New Task"/>
        <button type="submit">Add Task</button>
      </form>

      <ul>
        <li v-for="task in tasks" :key="task.id">
          <input type="checkbox" v-model="task.is_complete" @change="toggleComplete(task)"/>
          <span>{{ task.title }}</span>
          <button @click="deleteTask(task.id)">Delete</button>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Please log in to manage your tasks.</p>
      <nuxt-link to="/login">Login</nuxt-link>
    </div>
  </div>
</template>
