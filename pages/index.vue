<template>
  <main>
    <!-- ::::::::Start main page components ::::::;:: -->
    <LazyLayoutsHeader />
    <LazyHomeAbout />
    <LazyHomeCoach />

    <!-- <LazyLayoutsContact :value="value" /> -->
    <!-- ::::::::Start main page components ::::::;:: -->
  </main>
</template>

<script>
  export default {
    name: "indexPage",

    layout: "default",

    head() {
      return {
        title: this.$t("navbar.home"),
        meta: [
          {
            hid: "title",
            name: "title",
            content: this.$t("navbar.home"),
          },
          {
            hid: "og:title",
            property: "og:title",
            content: this.$t("navbar.home"),
          },
          {
            hid: "description",
            name: "description",
          },
        ],
      };
    },

    // ::::::::: start get main Page data ::::::::::::

    async asyncData({ $axios }) {
      return await $axios.get("settings?key=social_contact").then((response) => {
        const { value } = response.data.data[0];
        return {
          value: value,
        };
      });
    },

    // ::::::::: End get main Page data ::::::::::::

    data() {
      return {
        coaches: [],
        content: [],
      };
    },
  };
</script>
