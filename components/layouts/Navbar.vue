<template>
  <div class="navbar_component">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-4 col-3">
          <nuxt-link :to="localePath('/')">
            <div class="logo">
              <img
                src="@/assets/images/logo_task.png"
                title=""
                loading="lazy"
                alt="logo"
                width="100"
                height="100"
              />
            </div>
          </nuxt-link>
        </div>
        <div class="col-lg-5 hide-media items-center justify-center">
          <div class="link_pages">
            <ul>
              <li v-for="(nav_item, index) in translatedNavLinks" :key="'l' + index">
                <nuxt-link :to="localePath(`${nav_item.url}`)">{{
                  $t(nav_item.text)
                }}</nuxt-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="nav-icons">
          <div class="language">
            <nuxt-link v-if="$i18n.locale == 'en'" :to="switchLocalePath('ar')">
              <span>
                <div class="icon">Ar</div>
              </span>
            </nuxt-link>
            <nuxt-link v-else :to="switchLocalePath('en')">
              <span>
                <div class="icon">En</div>
              </span>
            </nuxt-link>
          </div>
        </div>
        <div class="col-lg-2 col-6">
          <nuxt-link :to="localePath('/login')">
            <div class="profile_btn hide-media">
              <div class="form-group">
                <button
                  class="send_btn main_btn"
                  :disabled="invalid || isWaitingRequest"
                  aria-label="signup"
                  title="signup"
                  type="submit"
                >
                  {{ $t("navbar.signup") }}
                </button>
              </div>
            </div>
          </nuxt-link>

          <!-- start :::::::::::: side bar menu :::::::::::: -->
          <div class="sidebar side_bar_content">
            <b-button v-b-toggle.sidebar-backdrop>
              <font-awesome-icon :icon="['fas', 'list']" />
            </b-button>

            <b-sidebar id="sidebar-backdrop" backdrop shadow>
              <div class="info responsive_profile">
                <ul>
                  <li v-for="(nav_item, index) in translatedNavLinks" :key="'l' + index">
                    <nuxt-link :to="localePath(`${nav_item.url}`)">{{
                      $t(nav_item.text)
                    }}</nuxt-link>
                  </li>
                </ul>

                <!-- btns-auth  -->
                <div class="flex-center btns_responsive">
                  <nuxt-link :to="localePath('/login')">
                    <button
                      v-if="!$auth.loggedIn"
                      aria-label="account"
                      title="account"
                      class="main_btn"
                    >
                      {{ $t("navbar.signup") }}
                    </button>
                  </nuxt-link>
                </div>
              </div>
            </b-sidebar>
          </div>
          <!-- End :::::::::::: side bar :::::::::::: -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "navbarComponent",

    data() {
      return {
        profile: {},
      };
    },

    computed: {
      translatedNavLinks() {
        return [
          { text: this.$t("navbar.home"), url: "/", condition: true },
          { text: this.$t("pages.promo"), url: "/coach", condition: true },
          { text: this.$t("pages.booking"), url: "/about-us", condition: true },
        ];
      },
    },

    methods: {
      // Start :::::::::: getNotifications ::::::::::

      async getNotifications() {
        try {
          return await this.$axios
            .get(`notification/user-notifications`)
            .then((response) => {
              this.Notifications = response.data.data;
            })
            .catch((error) => {
              console.log(error);
            });
        } catch (error) {
          console.log("catch : " + error);
        }
      },

      async MarkRead(id) {
        const REQUEST_DATA = new FormData();
        REQUEST_DATA.append("notification_id", id);

        try {
          const response = await this.$axios.$post(
            "notification/mark-as-read",
            REQUEST_DATA
          );

          // this.$iziToast.success({
          //   title: 'OK',
          //   timeout: 3000,
          //   message: response.message,
          // });

          this.getNotifications();

          const response_2 = await this.$axios.get(`notification/notifications-count`);

          this.notification_count = response_2.data.count;
        } catch (error) {
          console.log("response 2", error.response.data.message);
          this.isWaitingRequest = false;
          this.$iziToast.error({
            title: "Error",
            timeout: 3000,
            position: "topRight",
            message: `${error.response.data.message}`,
          });
        }
      },

      // End :::::::::: getNotifications ::::::::::
    },

    async mounted() {
      // :::::::::: Start call methods ::::::::::
      if (this.$auth.loggedIn) {
        this.getNotifications();
        const response = await this.$axios.get(`notification/notifications-count`);

        this.notification_count = response.data.count;
      }

      // :::::::::: End call methods ::::::::::
    },
  };
</script>

<style lang="scss" scoped></style>
