<template>
  <div>Home</div>
  <button @click="goToAbout">Go to About</button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToAbout = () => {
  router.push("/about");
};
</script>

<style lang="scss" scoped></style>
