<template>
  <div class="container">
    <header>
      <div>
        <h1>{{ vendor.name }}</h1>
        <p class="tagline">{{ vendor.tagline }}</p>
        <div class="call-to-action">
          <NuxtLink to="/menu">Menu</NuxtLink>
          <a href="#feature">See More</a>
        </div>
      </div>
      <SanityImage
        class="headerImg"
        :width="400"
        :height="600"
        :image="vendor.headerImage"
      />
    </header>
    <section class="details">
      <div>
        <h2>Hours</h2>
        <ul>
          <li v-for="date in vendor.hours" :key="date._key">
            <div class="day">{{ date.day.substring(0, 3) }}</div>
            <div>{{ date.startTime }} -</div>
            <div>- {{ date.endTime }}</div>
          </li>
        </ul>
      </div>
      <SanityImage :width="300" :height="400" :image="vendor.images[0]" />
    </section>
    <section id="feature" class="featured">
      <h2>Featured Dishes</h2>
      <ul>
        <li v-for="feature in features" :key="feature._id">
          <ProductCard :product="feature" />
        </li>
      </ul>
      <NuxtLink to="/menu">See Full Menu</NuxtLink>
    </section>
  </div>
</template>

<script>
import groq from 'groq'
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'
import ProductCard from '~/components/ProductCard'

const query = groq`{
  "vendor" : *[_type == "business"][0],
  "features": *[_type == "product"][0..2]
}`

export default {
  components: {
    SanityImage,
    ProductCard,
  },
  async asyncData() {
    return await sanityClient.fetch(query)
  },
  transition: 'bounce',
  head() {
    const vendor = this.vendor
    return {
      title: vendor.name,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: vendor.tagline,
        },
      ],
    }
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1000px;
}

header {
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  place-items: center;
  width: 100%;
  margin-bottom: 1em;
}

.headerImg {
  max-width: 100%;
  height: 100vh;
}

section {
  width: 100%;
  padding-top: 3em;
}

.details {
  /* text-align: center; */
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
}

.tagline {
  color: #666666;
}

a {
  padding: 0.5em 0.3em;
  text-decoration: none;
  border: 1px solid #333;
}

a:visited {
  color: #333;
}

a:hover {
  background-color: #333;
  color: #f4f4f4;
}

.call-to-action {
  margin-top: 3em;
}

ul {
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 1em 0;
}

.details li {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 15px;
}

.details li .day {
  width: 60px;
  text-align: left;
}

.featured {
  text-align: center;
  margin-bottom: 3em;
}

.featured ul {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
  place-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.featured li {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 800px) {
  header {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .headerImg {
    opacity: 0.5;
    position: absolute;
    z-index: -1;
  }
}
</style>
