import { createCurrentUserHook, createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
  /**
   * Find your project ID and dataset in 'sanity.json in your sanity project.
   * These are considered "public", but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/

  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-03-25',
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN.
   **/
  // useCdn: process.env.NODE_ENV === 'production',
  useCdn: false,
}

// set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

/**
 * set up a helper function for generating image URLs with only the asset
 * reference data in your documents.
 * Reference: https://sanity.com/docs/image-url
 */
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

// set up a helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)
