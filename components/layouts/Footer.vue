<template>
  <div class="footer_component">
    <div class="footer_content">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 col-md-12 col-12">
            <div class="logo">
              <img
                src="@/assets/images/logo_task.png"
                title=""
                loading="lazy"
                alt="logo"
                width="180"
                height="175"
              />
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-12">
            <div class="info">
              <h5>{{ $t("navbar.about") }}</h5>
              <ul>
                <li>
                  <nuxt-link :to="localePath('/')">
                    <span>{{ $t("footer.about_gooseFlight") }}</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/coach')">
                    <span>{{ $t("footer.how_it_work") }}</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/blog')">
                    <span>{{ $t("footer.blog") }}</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/forum')">
                    <!-- <font-awesome-icon :icon="['fas', 'dumbbell']" /> -->
                    <span>{{ $t("footer.forum") }}</span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 col-12">
            <div class="info">
              <h5>{{ $t("footer.support") }}</h5>
              <ul>
                <li>
                  <nuxt-link :to="localePath('/faq')">
                    <span>{{ $t("footer.help") }}</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/contact')">
                    <span>{{ $t("footer.contact") }}</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/privacy-policy')">
                    <span>{{ $t("footer.privacy_policy") }}</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/terms-and-conditions')">
                    <span>{{ $t("footer.term") }}</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/trust')">
                    <span>{{ $t("footer.trust") }}</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/accessibility')">
                    <span>{{ $t("footer.accessibility") }}</span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <div class="info">
              <h5>{{ $t("footer.get_to_app") }}</h5>
              <ul>
                <li>
                  <nuxt-link :to="localePath('/andriod')">
                    <span>{{ $t("footer.andriod") }}</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/ios')">
                    <span>{{ $t("footer.ios") }}</span>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link :to="localePath('/mobile_site')">
                    <span>{{ $t("footer.mobile_site") }}</span>
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <div class="link_website" @click="copyURL">
              <img
                src="@/assets/images/app_store.png"
                title=""
                loading="lazy"
                alt="logo"
                width="150"
                height="100"
              />
            </div>
            <div class="link_website" @click="copyURL">
              <img
                src="@/assets/images/google_play.png"
                title=""
                loading="lazy"
                alt="logo"
                width="150"
                height="100"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "footerComponent",

    data() {
      return {
        social: {},
      };
    },

    methods: {
      // Start :::::::::: get social data ::::::::::

      async getData() {
        try {
          return await this.$axios
            .get(`settings?key=social_contact`)
            .then((response) => {
              this.social = response.data.data[0].value;
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log("catch : " + error);
        }
      },

      copyURL() {
        const url = window.location.href;
        navigator.clipboard
          .writeText(url)
          .then(() => {
            console.log("URL copied to clipboard:", url);
            this.$iziToast.success({
              timeout: 3000,
              message: `${this.$t("pages.copied_to_clipboard")}`,
            });
          })
          .catch((err) => {
            console.error("Failed to copy URL to clipboard:", err);
            // Handle errors, if any
          });
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
