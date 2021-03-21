export default {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: "Nông Thôn Việt" || "",
    meta: [
      //hiển thị title khi share
      {
        hid: "og:site_name",
        name: "og:site_name",
        property: "og:site_name",
        content: "Nông Thôn Việt"
      },
      {
        hid: "og:title",
        property: "og:title",
        name: "og:title",
        content: "Nông Thôn Việt"
      },
      {
        hid: "description",
        property: "description",
        name: "description",
        content: "Kênh thông tin Nông nghiệp Việt Nam"
      },

      {
        hid: "og:image",
        property: "og:image",
        name: "og:image",
        content:
          "http://nongthonviet.ngn.com.vn/_nuxt/img/logotapchi.f49aa0a.png"
      },
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "og:description",
        property: "og:description",
        name: "og:description",
        content: "Kênh thông tin Nông nghiệp Việt Nam"
      }
    ],
    link: [
      { rel: "icon ", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "shortcut icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "apple-touch-icon", href: "/icon.png" }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  /*
   ** Global CSS
   */
  css: ["~assets/style/main.css"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    // { src: "~/plugins/request.js" },
    { src: "~/plugins/filters.js" },
    { src: "~/plugins/vuelidate.js" },
    { src: "~/plugins/swiper.js", mode: "client" }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    "@nuxtjs/tailwindcss"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    "@nuxtjs/device",
    "@nuxtjs/google-analytics"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    header: "Content-Type: application/json"
  },
  googleAnalytics: {
    id: "UA-187464713-1",
    checkDuplicatedScript: true
  },
  /*
   ** Build configuration
   */
  build: {
    rules: [
      // ... other rules omitted

      // this will apply to both plain `.scss` files
      // AND `<style lang="scss">` blocks in `.vue` files
      {
        test: /\.scss$/,
        use: ["vue-style-loader", "css-loader", "sass-loader"]
      }
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    Webname: "Nông Nghiệp 365",
    BASE_URL:
      process.env.NODE_ENV !== "production"
        ? "http://cms.ngn.com.vn"
        : "http://cms.ngn.com.vn",
    BASE_API:
      process.env.NODE_ENV !== "production"
        ? "http://cms-api.ngn.com.vn/public"
        : "http://cms-api.ngn.com.vn/public"
  }
  //  server: {
  //   port: 8000, // default: 3000
  //   host: '0.0.0.0', // default: localhost,
  //   timing: false
  // }
};
