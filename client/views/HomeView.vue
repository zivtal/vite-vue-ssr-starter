<template>
  <div>Home</div>
  <button @click="goToAbout">Go to About</button>
</template>

<script lang="ts">
export default {
  methods: {
    goToAbout() {
      this.$router.push('/about')
    },
  },
}
</script>

<style lang="scss" scoped></style>