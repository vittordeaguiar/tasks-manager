<script setup lang="ts">
import {useRouter} from 'vue-router'
import {toast} from "vue3-toastify";

const router = useRouter()
const {$supabase} = useNuxtApp()

const logout = async () => {
  const {error} = await $supabase.auth.signOut()
  if (error) return toast.error('Error logging out:', error.message)
  await router.push('/login')
  toast.success('Logged out successfully')
}
</script>

<template>
  <nav class="flex items-center justify-between p-4 border-b border-zinc-400">
    <section class="flex items-end space-x-4">
      <h1 class="text-xl">Tasks Manager</h1>
      <span class="text-sm">
        by
        <a class="hover:text-blue-300 underline" href="https://github.com/vittordeaguiar/" target="_blank">@vittordeaguiar</a>
      </span>
    </section>
    <section class="flex items-center space-x-6">
      <nuxt-link to="/" class="hover:text-zinc-400">
        Home
      </nuxt-link>
      <nuxt-link to="/login" class="hover:text-zinc-400">
        Login
      </nuxt-link>
      <nuxt-link to="/signup" class="hover:text-zinc-400">
        Register
      </nuxt-link>
      <p @click="logout" class="cursor-pointer hover:text-zinc-400">Sign Out</p>
    </section>
  </nav>
</template>
