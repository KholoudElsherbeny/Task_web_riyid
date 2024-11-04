// Global page headers

export default {
  // :::::::::::::::::: Start Build config :::::::::::
  target: "server",
  ssr: true,
  // :::::::::::::::::: End Build config ::::::::::::::

  // :::::::::::::::::: Start Head config :::::::::::::
  head() {
    const i18nHead = this.$nuxtI18nHead({
      addSeoAttributes: true,
      addDirAttribute: true,
    });
    return {
      htmlAttrs: {
        Developer: "Kholoud Waleed",
        ...i18nHead.htmlAttrs,
      },
      head: {
        titleTemplate: "%s",
        tittle: "Task Web", // the title you define. you must put your package-name here, if you want that name.
      },

      // %s refer to every title on page + global title

      titleTemplate: " Task Web",
      tittle: "Task Web",

      meta: [
        { charset: "utf-8" },
        {
          hid: "description",
          name: "description",
          content: "My Custom Description",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },

        {
          hid: "og:title",
          name: "og:title",
          content: "My Custom Description",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "My Custom Description",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "My Custom Description",
        },
        {
          hid: "og:url",
          property: "og:url",
          content: `url`,
        },
        ...i18nHead.meta,
      ],

      // cdn link script
      // body true to put link at end of body tag

      // script: [
      //   {
      //     src: "",
      //     body: true,
      //   },
      // ],

      // cdn link css

      link: [
        {
          hid: "apple-touch-icon",
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "stylesheet",
          href: "",
        },
        {
          hid: "icon",
          rel: "icon",
          type: "image/x-icon",
          href: "favicon.ico",
        },
        ...i18nHead.link,
      ],
    };
  },
  // :::::::::::::::::: End Head config :::::::::::::

  store: true,

  // :::::::::::::::::: Start Global CSS :::::::::::::
  css: [
    "@/assets/scss/main.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
    "bootstrap/dist/css/bootstrap.css",
    "bootstrap-vue/dist/bootstrap-vue.css",
  ],
  // :::::::::::::::::: End Global CSS ::::::::::::::::

  // customize progress bar color for router move

  loading: {
    color: "blue",
    height: "3px",
    duration: "8000",
  },

  // customize preloading for website

  // :::::::::::::::::: Start Page transition :::::::::::::
  loadingIndicator: {
    name: "circle",
    color: "#57009b",
    background: "white",
  },

  layoutTransition: {
    name: "fade",
    mode: "out-in",
  },

  pageTransition: {
    /*
        all animation:
         1- fade :good
         2- intro with it remove mode
         3- fade2
         4- page with it remove mode
         5- fadeOpacity : good
         6- page6 with it remove mode
         7- page7 :good with it remove mode
    */

    name: "fade",
    mode: "out-in",
  },

  // :::::::::::::::::: End Page transition :::::::::::::

  // :::::::::::::::::: Start Plugins :::::::::::::

  plugins: [
    "@/plugins/axios",
    { src: "@/plugins/vee-validate" },
    { src: "@/plugins/vue-tel-input" },
    // for save state even if page reload very important
    // { src: "@/plugins/vuex-persist", ssr: false },
    { src: "@/plugins/aos", mode: "client" },
    // { src: "@/plugins/vue-html2pdf.js", mode: "client", ssr: false },
    { src: "~/plugins/bootstrap-vue.js", ssr: false },
    { src: "~/plugins/vue-owl-carousel", mode: "client" },
    { src: "~/plugins/rating.js", mode: "client" },
    { src: "~/plugins/izitoast.js", ssr: false },
  ],

  // :::::::::::::::::: End Plugins :::::::::::::

  // :::::::::::::::::: Start component :::::::::::
  components: true,
  // :::::::::::::::::: End component :::::::::::::

  // :::::::::::::::::: Start Modules :::::::::::
  buildModules: [
    "@nuxtjs/fontawesome",
    // Simple usage
    "@nuxtjs/moment",

    // With options
    [
      "@nuxtjs/moment",
      {
        /* module options */
      },
    ],
  ],
  // :::::::::::::::::: End Modules :::::::::::::

  // :::::::::::::::::: Start Modules :::::::::::
  modules: [
    // "@nuxtjs/auth-next",
    "@nuxtjs/auth",
    "cookie-universal-nuxt",
    "bootstrap-vue/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/axios",
    "nuxt-vue-multiselect",
    [
      "nuxt-sweetalert2",
      {
        // confirmButtonColor: '#FFFFFF'
      },
    ],
  ],
  // :::::::::::::::::: End Modules :::::::::::::

  // :::::::::::::::::: start fontAwesome ::::::::
  fontawesome: {
    icons: {
      solid: true,
      brands: true,
      regular: true,
    },
  },
  // :::::::::::::::::: End fontAwesome ::::::::

  // :::::::::::::::::: start i18n plugin ::::::::
  i18n: {
    locales: [
      {
        name: "English",
        code: "en",
        iso: "en-US",
        file: "en-US.js",
        dir: "ltr",
      },
      {
        name: "Arabic",
        code: "ar",
        iso: "ar-EG",
        file: "ar-Ar.js",
        dir: "rtl",
      },
    ],
    lazy: true,
    // skipSettingLocaleOnNavigate: true,
    // reloadOnLanguageChange: true,
    langDir: "locales/",
    defaultLocale: "ar",
    // strategy: "no_prefix",
    strategy: "prefix_and_default",
    defaultDirection: "rtl",
    detectBrowserLanguage: false,
  },
  // :::::::::::::::::: End i18n plugin ::::::::

  // :::::::::::::::::: start build config  ::::::::
  build: {
    transpile: ["vee-validate/dist/rules"],
  },
  // :::::::::::::::::: End build config  ::::::::

  // :::::::::::::::::: start auth plugin ::::::::
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
            propertyName: "data.access_token",
          },
          logout: {
            url: "auth/logout",
            method: "post",
            // propertyName: "token",
          },

          user: {
            url: "auth/profile",
            method: "get",
            propertyName: "data.user",
          },
        },

        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer",
        },
        cookie: {
          prefix: "auth.",
        },
      },
    },

    redirect: {
      login: "/login",
      logout: "/login",
      home: "/",
    },
  },
  // :::::::::::::::::: End auth plugin ::::::::

  // :::::::::::::::::: start router config ::::::::
  router: {
    base: "/", //for build path
  },

  // :::::::::::::::::: start router config ::::::::

  // :::::::::::::::::: start server config ::::::::
  server: {
    port: 5030,
  },
  // :::::::::::::::::: End server config ::::::::::
};
