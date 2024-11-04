<template>
  <div class="subscribe_page">

    <!-- ::::::::::: start subscribe pages :::::::::::: -->
    <LazySubscribe :subscriptions="subscriptions" />
    <!-- ::::::::::: End subscribe pages :::::::::::: -->

  </div>
</template>

<script>

export default {

  name: 'subscribe',

  layout: "default",

  head() {
    return {
      title: this.$t('pages.my_subscriptions_list'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('pages.my_subscriptions_list'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('pages.my_subscriptions_list'),
        },
        {
          hid: 'description',
          name: 'description',
        },
      ],
    }
  },

  data() {
    return {
      subscriptions:[]
    };
  },

  // ::::::::: start Page data ::::::::::::

  // async asyncData({ $axios }) {
  //   return await $axios.get('settings?key=policy').then(response => {
  //     const { value } = response.data.data[0];
  //     return {
  //       privacy_policy: value
  //     }
  //   })
  // },

  // ::::::::: End Page data :::::::::::::::

  mounted() {
    this.getTrainers();
  },

  methods: {

    async getTrainers() {
      return await this.$axios.get('client-subscriptions').then(response => {
        const { Subscriptions } = response.data.data;
        this.subscriptions = Subscriptions;

      })
    }
  },

};
</script>

<style></style>
