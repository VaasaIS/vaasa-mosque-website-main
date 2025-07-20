import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import schemas from './schemas/schema'

export default defineConfig({
  name: 'vaasa-mosque-cms',
  title: 'Vaasa Mosque CMS',
  projectId: '2lmbvnig',
  dataset: 'production',
  plugins: [
    deskTool(),
    visionTool(),
    // Add other plugins here if needed
  ],
  schema: {
    types: schemas,
  },
}) 