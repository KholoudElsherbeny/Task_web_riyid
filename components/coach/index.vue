<template>
  <div class="coach_component">
    <div class="container">
      <div class="row" v-if="booking.length">
        <div
          class="col-lg-3 col-md-6 col-12"
          v-for="(item, index) in booking"
          :key="index"
        >
          <!-- :::::::::: start coach_page ::::::::::: -->
          <nuxt-link :to="localePath(`/booking`)">
            <div class="box_coach">
              <div class="image">
                <img :src="item.image" alt="coach" width="" height="" />
              </div>

              <div class="info">
                <div class="rate flex-between">
                  <div class="head flex-between">
                    <span><font-awesome-icon :icon="['fas', 'location-dot']" /></span>
                    <p>{{ item.location }}</p>
                  </div>
                </div>

                <div class="desc">
                  <h4>{{ item.desc }}</h4>
                </div>
                <div class="head flex-between" v-if="item.days">
                  <p>{{ item.days }} {{ $t("pages.days") }}</p>
                </div>
                <div class="rate flex-between">
                  <div class="head flex-between">
                    <span><font-awesome-icon :icon="['fas', 'dollar-sign']" /></span>
                    <p>375</p>
                  </div>
                </div>
              </div>
            </div>
          </nuxt-link>
          <!-- :::::::::: End coach_page ::::::::::: -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "coachComponent",

    // :::::::: start props :::::
    // props: {
    //   coaches: { type: Array, default: [] },
    // },

    data() {
      return {
        booking: [
          {
            id: 1,
            image: require("@/assets/images/booking1.png"),
            desc: this.$t("booking.desc1"),
            location: this.$t("booking.location1"),
            days: "3",
          },
          {
            id: 2,
            image: require("@/assets/images/booking2.png"),
            desc: this.$t("booking.desc2"),
            location: this.$t("booking.location2"),
            days: "1",
          },
          {
            id: 3,
            image: require("@/assets/images/booking3.png"),
            desc: this.$t("booking.desc3"),
            location: this.$t("booking.location3"),
            days: null,
          },
          {
            id: 4,
            image: require("@/assets/images/booking4.png"),
            desc: this.$t("booking.desc4"),
            location: this.$t("booking.location4"),
            days: "14",
          },
        ],
      };
    },
    // :::::::: End props :::::

    methods: {},
  };
</script>

<style lang="scss" scoped></style>
