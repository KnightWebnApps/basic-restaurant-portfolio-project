<template>
  <footer>
    <ul class="social">
      <li v-for="s in social" :key="s._key">
        <a v-if="s.link !== undefined" :href="s.link">
          <SanityImage
            v-if="s.logo !== undefined"
            class="logo"
            :width="32"
            :height="32"
            :image="s.logo.asset"
          />
          <span v-else>{{ s.name }}</span>
        </a>
      </li>
    </ul>
    <p>{{ name }} &copy; {{ year }}</p>
  </footer>
</template>

<script>
import SanityImage from '~/components/SanityImage'

export default {
  components: {
    SanityImage,
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    social: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>

<style scoped>
footer {
  text-align: center;
  padding: 0.5em 0;
  max-width: 600px;
  margin: 0 auto;
}

.logo {
  width: 42px;
  height: 42px;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  place-items: center;
}
</style>
