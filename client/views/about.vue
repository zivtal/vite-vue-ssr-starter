<template>
  <div>About</div>
  <button @click="goToHome">Go to Home</button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const goToHome = () => {
  router.push("/");
};
</script>

<style lang="scss" scoped></style>
