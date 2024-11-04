<template>
  <section class="about_section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="info" data-aos="fade-up">
            <h4>{{ $t("messages.decs1") }}</h4>
            <p>{{ $t("messages.decs2") }}</p>
          </div>
        </div>
      </div>

      <div class="row py-5 radio_group">
        <div class="col-12">
          <div class="content" data-aos="fade-up">
            <!-- <v-radio-group row>
              <v-radio :label="$t('fields.bank_account')" :value="1" />
              <v-radio :label="$t('labels.iban')" :value="2" />
            </v-radio-group> -->
            <LazyLayoutsContact :value="value" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "aboutComponent",

    data() {
      return {
        about_keys: {},
      };
    },

    methods: {
      // Start :::::::::: get data ::::::::::
      // End :::::::::: get data ::::::::::
    },

    mounted() {
      // Start :::::::::: call methods ::::::::::
      // this.getData();
      // End :::::::::: call methods ::::::::::
    },
  };
</script>

<style lang="scss" scoped></style>
