<script setup lang="ts">
import {useRouter} from 'vue-router'

const name = ref<string>('')
const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()
const {$supabase} = useNuxtApp()

const signup = async () => {
  const {user, error} = await $supabase.auth.signUp({
    name: name.value,
    email: email.value,
    password: password.value,
  })

  if (error) return alert('Sign Up failed: ' + error.message)

  await router.push('/')
}
</script>

<template>
  <form @submit.prevent="signup" class="flex flex-col mx-auto max-w-md space-y-4 pt-10">
    <h1 class="text-center">Sign Up</h1>
    <label>
      Name
      <input v-model="name" type="text" placeholder="Name" class="block"/>
    </label>
    <label>
      E-mail
      <input v-model="email" type="email" placeholder="E-mail" class="block"/>
    </label>
    <label>
      Password
      <input v-model="password" type="password" placeholder="Password" class="block"/>
    </label>
    <button type="submit">Sign Up</button>
  </form>
</template>
