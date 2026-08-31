import { defineConfig } from 'tinacms'

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  'main'

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '98ab9535-44c1-492c-a156-521e58d17271'

export default defineConfig({
  branch,
  clientId,
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images/uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'settings',
        label: 'Ajustes generales',
        path: 'content/settings',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: 'string',
            name: 'brandName',
            label: 'Nombre de la marca',
            required: true,
          },
        ],
      },
    ],
  },
})
