<template>
  <div class="header_component">
    <VueOwlCarousel
      v-if="ads.length > 0"
      :loop="true"
      :margin="40"
      :autoHeight="true"
      :items="1"
      :autoplay="false"
      :navText="['<', '>']"
      :center="false"
      dir="ltr"
      :nav="false"
      :dots="true"
    >
      <div class="item" v-for="(item, index) in ads" :key="'o' + index">
        <div class="overlay">
          <div class="image">
            <img
              loading="lazy"
              :src="item.advertisement"
              alt="item.name"
              title=""
              width="100"
              height="100"
            />
          </div>
          <div class="content">
            <img
              loading="lazy"
              src="@/assets/images/logo_task.png"
              alt="item.name"
              title=""
              width="266"
              height="240"
            />
            <h1>{{ item.name }}</h1>
            <button
              class="main_btn"
              aria-label="Shop Now"
              title=""
              @click="scrollToSection('coach_section')"
            >
              اشترك الان
            </button>
          </div>
        </div>
      </div>
    </VueOwlCarousel>
  </div>
</template>

<script>
  export default {
    name: "headerComponent",

    data() {
      return {
        content: [
          {
            id: 1,
            image: "header-1.png",
          },
          {
            id: 6,
            image: "header-1.png",
          },
          {
            id: 11,
            image: "header-1.png",
          },
          {
            id: 12,
            image: "header-1.png",
          },
          {
            id: 15,
            image: "header-1.png",
          },
        ],

        ads: [],

        // responsive: {
        //   0: {
        //     items: 1,
        //     nav: false
        //   },
        //   500: {
        //     items: 2,
        //     nav: false
        //   },
        //   991: {
        //     items: 3,
        //     nav: false
        //   },
        //   1200: {
        //     items: 4,
        //     nav: false
        //   },
        // }
      };
    },

    methods: {
      // START:: SCROLL TO SECTION
      scrollToSection(section_id) {
        if (this.$route.path != this.localePath("/")) {
          this.$router.push(this.localePath("/"));
        } else {
          const selected_section = document.querySelector(`#${section_id}`);
          selected_section.scrollIntoView();
        }
      },
      // END:: SCROLL TO SECTION

      // Start :::::::::: get social data ::::::::::

      async getData() {
        try {
          return await this.$axios
            .get(`advertisements`)
            .then((response) => {
              this.ads = response.data.data;
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log("catch : " + error);
        }
      },

      // End :::::::::: get social data ::::::::::
    },

    mounted() {
      // Start :::::::::: call methods ::::::::::
      this.getData();
      // End :::::::::: call methods ::::::::::
    },
  };
</script>

<style lang="scss" scoped></style>
