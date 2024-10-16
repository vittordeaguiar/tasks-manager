export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},

    css: ["./assets/css/main.css"],

    runtimeConfig: {
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
        },
    },

    modules: ['@nuxtjs/tailwindcss'],
});