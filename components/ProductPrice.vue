<template>
  <span>
    <span id="currency-mark">{{ currency }}</span>
    <span id="price">{{ price }}</span>
  </span>
</template>

<script>
export default {
  props: {
    price: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: '$',
    },
  },
}
</script>

<style scoped>
#currency-mark {
  font-size: 11px;
  color: #333;
}

#price {
  font-size: 23px;
}
</style>
