<template>
  <footer>&copy; Knight Digital Development {{ year }}</footer>
</template>

<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>

<style>
footer {
  text-align: center;
  padding: 0.5em 0;
}
</style>
