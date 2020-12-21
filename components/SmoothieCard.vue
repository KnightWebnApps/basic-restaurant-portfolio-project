<template>
  <article id="content">
    <h3 class="title">
      {{ product.name }} |
      <i>${{ product.price.toFixed(2) }}</i>
    </h3>
    <small>{{ product.calories }} Cal.</small>
    <SanityImage
      :image="product.mainAsset.image"
      :width="200"
      :height="200"
      :alt="product.mainAsset.alt"
      class="main-img"
    />
    <h4 class="title">Ingredients</h4>
    <ul>
      <li v-for="ing in product.ingredients" :key="ing._key">
        {{ ing.name }}
        <SanityImage :width="48" :height="48" :image="ing.asset.asset" />
      </li>
    </ul>
    <button
      class="snipcart-add-item cart-btn"
      :data-item-id="product._id"
      :data-item-price="product.price"
      :data-item-url="storeUrl + this.$route.path"
      :data-item-description="product.description"
      :data-item-image="imageUrl"
      :data-item-name="product.name"
    >
      Add to Cart
    </button>
  </article>
</template>

<script>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
/* eslint-disable vue/require-default-prop */
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '~/sanityClient'
const builder = imageUrlBuilder(sanityClient)

export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      storeUrl: process.env.storeUrl,
    }
  },
  computed: {
    imageUrl() {
      return builder
        .image(this.product.mainAsset.image)
        .size(200, 200)
        .auto('format')
        .fit('max')
        .url()
    },
  },
  mounted() {
    // const delay = 1 * this.index
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('#content', {
      scrollTrigger: '#content',
      // delay,
      y: 0,
      opacity: 1,
      duration: 1,
    })
  },
}
</script>

<style scoped>
#content {
  /* margin-top: 1em; */
  background-color: aliceblue;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
  margin-bottom: 1em;
  transform: translateY(50px);
  opacity: 0;
}

.title {
  margin: 15px;
}

.main-img {
  outline: 3px solid #333;
}

small {
  margin-bottom: 1em;
}

ul {
  margin: 0;
  padding: 0;
}

#content li {
  display: flex;
  align-items: center;
  width: 150px;
  justify-content: space-between;
}

.cart-btn {
  padding: 10px 15px;
  border-radius: 7px;
  background-color: #fed047;
  font-weight: 500;
  border: none;
  width: 200px;
  font-size: 17px;
  margin-top: 1em;
}

.cart-btn:hover {
  background-color: #c09e3a;
  cursor: pointer;
}
</style>
