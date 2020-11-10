<template>
  <section class="content">
    <header>
      <SanityImage
        class="main-img"
        :width="256"
        :height="256"
        :image="product.defaultProductVariant.images[0]"
      />
      <h1>{{ product.title }}</h1>
      <ProductPrice :price="product.defaultProductVariant.price" />
      <!-- TODO Add calorie count -->
      <!-- <span>{{ product}}</span> -->
    </header>
    <div class="bio" :v-if="product.body.en.length > 0">
      <BlockContent v-if="product.body" :blocks="product.body.en" />
    </div>
  </section>
</template>

<script>
import gsap from 'gsap'
import groq from 'groq'
import BlockContent from 'sanity-blocks-vue-component'
// import blocksToText from '~/lib/blocksToText'
import sanityClient from '~/sanityClient'
import SanityImage from '~/components/SanityImage'
import ProductPrice from '~/components/ProductPrice'
const query = groq`*[_type == "product" && slug.current == $slug][0]`

export default {
  components: {
    SanityImage,
    BlockContent,
    ProductPrice,
  },
  transition: 'in-out',
  async asyncData({ params }) {
    return {
      product: await sanityClient.fetch(query, params),
    }
  },
  mounted() {
    gsap.to('.content', { opacity: 1, duration: 0.6 })
    gsap.to('.main-img', {
      duration: 0.7,
      x: 100,
      delay: 0.5,
      opacity: 0.8,
      ease: 'bounce',
    })
  },
  head() {
    const product = this.product
    return {
      title: product.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: product.blurb.en,
        },
      ],
    }
  },
}
</script>

<style scoped>
.content {
  padding: 10px;
  max-width: 890px;
  margin: 0 auto 15px;
  overflow: hidden;
  min-height: 100vh;
}

header {
  height: 300px;
}

header h1 {
  margin: 0.7em 0 10px;
}

img {
  opacity: 0;
  position: absolute;
  z-index: -1;
  overflow: hidden;
}
</style>
