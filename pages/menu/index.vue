<template>
  <section class="container">
    <h1>Menu</h1>
    <ul class="product-list">
      <li v-for="product in products" :key="product._id">
        <NuxtLink :to="'/menu/' + product.slug.current">
          <ProductCard :product="product" />
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script>
import groq from 'groq'
import ProductCard from '~/components/ProductCard'
import sanityClient from '~/sanityClient'

const query = groq`
{
  "products" : *[_type == "product"]
}
`

export default {
  components: {
    ProductCard,
  },
  transition: 'bounce',
  async asyncData() {
    return await sanityClient.fetch(query)
  },
  head() {
    return {
      title: 'Menu',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
      ],
    }
  },
}
</script>

<style scoped>
.container {
  padding: 1em 15px;
  overflow-x: hidden;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  gap: 15px;
}

li {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  transition: margin 100ms ease-in-out, background-color 200ms ease-in-out;
}

a {
  text-decoration: none;
  color: #333;
}

a:visited {
  color: #333;
}

@media (max-width: 400px) {
  li {
    align-items: center;
  }
}

li:hover {
  margin-left: 5px;
  background-color: #eeeeee;
}
</style>
