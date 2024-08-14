<template>
  <div>About !!</div>
  <button @click="goToHome">Go to Home</button>
</template>

<script lang="ts">
export default {
  methods: {
    goToHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped></style>