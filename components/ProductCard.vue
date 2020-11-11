<template>
  <article>
    <SanityImage
      :width="256"
      :height="256"
      :image="product.defaultProductVariant.images[0]"
      class="avatar"
    />
    <h2 class="card-title">{{ product.title }}</h2>
    <ProductPrice :price="product.defaultProductVariant.price" />
  </article>
</template>

<script>
import SanityImage from '~/components/SanityImage'
import ProductPrice from '~/components/ProductPrice'

export default {
  components: {
    SanityImage,
    ProductPrice,
  },
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>

<style scoped>
article {
  text-align: left;
  max-width: 256px;
}

.card-title {
  font-size: 21px;
  text-decoration: none;
  margin-left: 5px;
}

article span {
  margin-left: 5px;
  margin-bottom: 10px;
}

.avatar {
  border-radius: 50%;
}
</style>
