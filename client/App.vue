<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import ThemeService from './services/theme-service/theme-service.ts';

onMounted(() => {
  ThemeService.set({ name: 'default', invert: true });
});
</script>

<style lang="scss"></style>
