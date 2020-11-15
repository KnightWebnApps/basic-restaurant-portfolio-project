<template>
  <div class="container">
    <section class="content">
      <header>
        <h1 class="name">{{ vendor.name }}</h1>
        <p class="tagline">{{ vendor.tagline }}</p>
        <NuxtLink class="cta" to="/melissas-smoothies/menu">
          See Our Smoothies
        </NuxtLink>
      </header>
      <section class="hours">
        <h2>Hours</h2>
        <ul class="hours-list">
          <li v-for="date in vendor.hours" :key="date._key">
            <span class="day">{{ date.day }}</span>
            <span>{{ date.startTime }} -</span>
            <span>- {{ date.endTime }}</span>
          </li>
        </ul>
      </section>
      <section class="location">
        <h2>Address</h2>
        <a class="location-link" :href="vendor.address.link">
          <span>Get Directions</span>
          <img
            class="location-icon"
            src="/location.svg"
            alt="Location Pin Icon"
          />
        </a>
        <!-- <iframe
          title="Melissa's Smoothies Fake Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11838.99806161058!2d-72.55509665310971!3d42.11283512615537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e6e7bba36ff5d9%3A0xd6f79339543475bd!2sGolden%20Krust%20Caribbean%20Restaurant!5e0!3m2!1sen!2sus!4v1605299435857!5m2!1sen!2sus"
          width="400"
          height="300"
          frameborder="0"
          style="border: 0; display: inline-block"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe> -->
        <p>{{ vendor.address.street }}</p>
        <p>
          {{ vendor.address.city }}, {{ vendor.address.state }}
          {{ vendor.address.postalCode }}
        </p>
      </section>
      <section class="reviews">
        <h2>The Gossip</h2>
        <article class="review">
          <h4>Racheal says...</h4>
          <p>
            Had the Banana-Mango smoothie and while it's always hard to balance
            the flavors, they did an amazing job.
          </p>
        </article>
        <article class="review">
          <h4>Kyle says...</h4>
          <p>
            Great atmosphere for studying, the team is very nice and always
            welcoming.
          </p>
        </article>
        <article class="review">
          <h4>Melissa says...</h4>
          <p>
            Amazingly clean area for doing work and the I've never had anything
            I didn't absolutly love.
          </p>
        </article>
      </section>
      <section class="menu">
        <h2>Menu</h2>
        <ul>
          <li v-for="(product, index) in products" :key="product._id">
            <SmoothieCard :product="product" :index="index" />
          </li>
        </ul>
      </section>
      <!-- <div>
        Icons made by
        <a
          href="https://www.flaticon.com/authors/dinosoftlabs"
          title="DinosoftLabs"
        >
          DinosoftLabs
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div> -->
    </section>
    <Footer :social="vendor.socialMedia || []" :name="vendor.name" />
  </div>
</template>

<script>
import groq from 'groq'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import sanityClient from '~/sanityClient'
import SmoothieCard from '~/components/SmoothieCard'
import Footer from '~/components/Footer'

const query = groq`
{
  "vendor" : *[_type == "business"][1],
  "products" : *[_type == "smoothie"]
}`

export default {
  components: {
    SmoothieCard,
    Footer,
  },
  async asyncData() {
    return await sanityClient.fetch(query)
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to('.name', {
      opacity: 1,
      duration: 1,
      x: 0,
    })
    gsap.to('.tagline', {
      opacity: 1,
      delay: 0.5,
      x: 0,
    })
    gsap.to('.cta', {
      opacity: 1,
      delay: 0.5,
    })
  },
  head() {
    const vendor = this.vendor
    return {
      title: "Smoothy's",
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
@font-face {
  font-family: 'Taviraj';
  src: url(~assets/Taviraj-Bold.ttf) format('truetype');
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Taviraj', serif;
}
.container {
  background-image: url('/smoothie-bg.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  height: 100%;
  width: 100%;
  background-position: center;
  overflow: hidden;
  padding: 10px;
  text-align: right;
}

.content {
  width: 100%;
  margin: 0 auto;
  max-width: 600px;
  height: 100%;
}

header {
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.name {
  margin-top: 1em;
  font-size: 42px;
  transform: translateX(-100px);
  opacity: 0;
}

.tagline {
  margin-bottom: 2em;
  transform: translateX(-100px);
  opacity: 0;
}

.cta {
  opacity: 0;
}

section {
  margin-top: 2em;
}

section h2 {
  margin-bottom: 15px;
}

.review {
  background-color: aliceblue;
  border-radius: 7px;
  padding: 15px 10px;
  margin-bottom: 1em;
}

.review h4 {
  margin: 10px 0;
}

.review p {
  font-style: italic;
}

.hours-list li {
  margin-bottom: 10px;
}

.day {
  font-weight: bold;
  margin-right: 10px;
}

.location {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.location-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 180px;
  margin-bottom: 2em;
}

.location-link span {
  font-weight: bold;
}

.location-icon {
  height: 28px;
  width: 24px;
}

a:visited {
  color: #333;
}

a {
  padding: 7px 10px;
  font-size: 16px;
  background-color: rgb(71, 233, 255);
  border-radius: 7px;
  cursor: pointer;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

a:hover {
  background-color: rgb(55, 187, 204);
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
