import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'hv051tjr', 
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2023-01-01',
})

const builder = imageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}