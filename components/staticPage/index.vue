<template>
  <section class="static_page">
    <div class="container">

      <div class="row">
        <div class="col-12">
          <!-- :::::::::: start static_page ::::::::::: -->
          <p v-html="content"></p>
          <!-- :::::::::: End static_page ::::::::::: -->
        </div>
      </div>

      <div class="back_image">
        <!-- <img src="@/assets/images/static_map.png" alt="head" width="77" height="3"> -->
      </div>

    </div>

  </section>
</template>

<script>

export default {
  name: "staticComponent",

  // :::::::: start props :::::
  props: {
    title: { type: String, default: "" },
    content: { type: String, default: "" }
  },
  // :::::::: End props :::::

  data() {
    return {

    }
  },

  mounted() {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped></style>
