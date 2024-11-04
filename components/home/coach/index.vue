<template>
  <div class="coach_section" id="coach_section">
    <div class="container">
      <div class="main_head">
        <h3>{{ $t("pages.popular_destinations") }}</h3>
        <p>{{ $t("pages.desc_book") }}</p>
      </div>

      <!-- :::start :::::: coach :::::: -->
      <LazyCoach :coaches="coaches" @like-toggled="getTrainers" />
      <!-- :::e\End :::::: coach :::::: -->
    </div>
  </div>
</template>

<script>
  export default {
    name: "coachComponent",

    // :::::::: start props :::::
    props: {
      title: { type: String, default: "" },
      // coaches: { type: Array, default: [] }
    },
    // :::::::: End props :::::

    data() {
      return {
        coaches: [],
      };
    },

    mounted() {
      this.getTrainers();
    },

    methods: {
      async getTrainers() {
        return await this.$axios.get("coaches").then((response) => {
          const { data } = response.data;
          this.coaches = data.slice(0, 4);
        });
      },
    },
  };
</script>

<style lang="scss" scoped></style>
