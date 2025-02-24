<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Welcome to Vue Template')
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>{{ message }}</h1>
      <p>
        Edit <code>src/App.vue</code> and save to reload.
      </p>
    </header>
  </div>
</template>

<style scoped>
.app {
  text-align: center;
  padding: 2rem;
}

.app-header {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>