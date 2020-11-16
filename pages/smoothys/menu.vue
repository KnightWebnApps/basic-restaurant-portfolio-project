<template>
  <section>
    <h1 id="heading">
      <NuxtLink to="/smoothys">&leftarrow;</NuxtLink>
      Menu
    </h1>
    <ul>
      <li v-for="product in products" :key="product._id">
        <SmoothieCard :product="product" />
      </li>
    </ul>
    <CallButton
      v-if="vendor.phoneNumber !== undefined"
      :phone="vendor.phoneNumber"
    />
    <Footer :social="vendor.socialMedia || []" :name="vendor.name" />
  </section>
</template>

<script>
import groq from 'groq'
import sanityClient from '~/sanityClient'
import SmoothieCard from '~/components/SmoothieCard'
import Footer from '~/components/Footer'
import CallButton from '~/components/CallButton'

const query = groq`
{
  "vendor" : *[_type == "business"][1],
  "products" : *[_type == "smoothie"]
}`

export default {
  components: {
    Footer,
    CallButton,
    SmoothieCard,
  },
  async asyncData() {
    try {
      return {
        ...(await sanityClient.fetch(query)),
        storeUrl: process.env.storeUrl,
      }
    } catch (error) {
      return { error }
    }
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
  margin: 2em auto;
  max-width: 800px;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* margin-bottom: 2em; */
  gap: 1em;
}

a {
  color: #333;
  text-decoration: none;
  padding: 5px;
}

a:visited {
  color: #333;
}

a:hover {
  border: 1px solid #333;
  border-radius: 7px;
}
</style>
