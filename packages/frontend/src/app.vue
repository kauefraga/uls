<script setup lang="ts">
import AppHeader from './components/header.vue'
import LoginForm from './components/login-form.vue'
</script>

<template>
  <div class="flex flex-col items-center grow font-mono">
    <div class="flex flex-col w-full max-w-2xl grow border-x border-parchment-300">
      <AppHeader />

      <LoginForm />
    </div>
  </div>
</template>
