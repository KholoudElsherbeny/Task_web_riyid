<template>
  <div class="favorite_page">

    <!-- ::::::::::: start favorite pages :::::::::::: -->
    <LazySingleCoach :coach="coach" @like-toggled="getData" />
    <!-- ::::::::::: End favorite pages :::::::::::: -->

  </div>
</template>

<script>

export default {

  name: 'favorite',

  layout: "default",

  head() {
    return {
      title: this.$t('pages.trainer_details'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('pages.trainer_details'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('pages.trainer_details'),
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
      coach: {}
    }
  },


  methods: {

    // ::::::::: start Page data ::::::::::::

    async getData() {
      return await this.$axios.get(`coaches/${this.$route.params.id}`).then(response => {
        const { Coach } = response.data.data;
        this.coach = Coach;
      })
    },

    // ::::::::: End Page data ::::::::::::
  },

  mounted() {
    // :::::::::::: start call methods::::::::::
    this.getData()
    // :::::::::::: start call methods::::::::::
  }

};
</script>

<style></style>
