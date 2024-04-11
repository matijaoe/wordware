// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    "@nuxt/image"
  ],

  colorMode: {
    classSuffix: '',
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },

  devtools: { enabled: true },

  experimental: {
    typedPages: true,
  },

  imports: {
    dirs: [
      'composables/**',
      // 'stores/**',
      'utils/**',
    ],
  },

  app: {
    head: {
      title: 'Wordware',
    },
  },

})