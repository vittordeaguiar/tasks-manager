<script setup lang="ts">
import {useRouter} from 'vue-router'

const email = ref<string>('')
const password = ref<string>('')
const router = useRouter()
const {$supabase} = useNuxtApp()

const login = async () => {
  const {user, error} = await $supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })

  if (error) return alert('Login failed: ' + error.message)
  await router.push('/')
}
</script>

<template>
  <main class="px-16">
    <form @submit.prevent="login" class="flex flex-col mx-auto max-w-md space-y-4">
      <h1 class="text-center">Login</h1>
      <label>
        E-mail
        <input v-model="email" type="email" placeholder="E-mail" class="block w-full"/>
      </label>
      <label>
        Senha
        <input v-model="password" type="password" placeholder="Password" class="block w-full"/>
      </label>
      <button type="submit">Login</button>
    </form>
  </main>
</template>
