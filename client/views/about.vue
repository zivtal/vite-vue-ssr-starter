<template>
  <div>About</div>
  <img :src="vueLogoTest" alt="Vue Logo" />
  <button @click="goToHome">Go to Home</button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import vueLogoTest from '@assets/vue.svg';

const router = useRouter();

const goToHome = () => {
  router.push('/');
};
</script>

<style lang="scss" scoped></style>
