<template>
  <section>
    <h1 id="heading">
      <NuxtLink to="/melissas-smoothies">&leftarrow;</NuxtLink>
      Menu
    </h1>
    <ul>
      <li v-for="product in products" :key="product._id">
        <SmoothieCard :product="product" />
      </li>
    </ul>
  </section>
</template>

<script>
import groq from 'groq'
import sanityClient from '~/sanityClient'
// import SanityImage from '~/components/SanityImage'
import SmoothieCard from '~/components/SmoothieCard'

const query = groq`
{
 "products" : *[_type == "smoothie"]
}`

export default {
  components: {
    // SanityImage,
    SmoothieCard,
  },
  async asyncData() {
    try {
      return await sanityClient.fetch(query)
    } catch (error) {
      return { error }
    }
  },
  data() {
    return {
      isVisible: false,
    }
  },
  methods: {
    toggleDialog() {
      this.isVisible ? (this.isVisible = false) : (this.isVisible = true)
    },
  },
}
</script>

<style scoped>
section {
  padding: 1em;
}

#heading {
  font-size: 42px;
}

article {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  box-shadow: 3px 3px 8px #33333380;
}

ul {
  padding: 0;
  margin: 2em 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* margin-bottom: 2em; */
  gap: 1em;
}
</style>
