import sanityClient from '@sanity/client'

export default sanityClient({
  projectId: 'kamo2xzn',
  dataset: 'production',
  useCdn: true,
})
