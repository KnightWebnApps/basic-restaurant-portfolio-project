<template>
  <article id="content">
    <h3 class="title">{{ product.name }}</h3>
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
  </article>
</template>

<script>
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

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

<style>
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
</style>
