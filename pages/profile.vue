<template>
  <section class="profile_side_component">

    <div class="profile_content projects_offer_component">
      <div class="container">

        <div class="links">
          <ul>
            <li class="active"><a href="#">{{ $t('navbar.home') }} /</a></li>
            <li>{{ $t('hero.profile') }}</li>
          </ul>
        </div>

        <div class="row ">

          <div class="col-lg-3 col-12">

            <div class="all_side_content">

              <div class="info">
                <div class="head">

                  <div class="form">
                    <form action="">
                      <div class="profile_image">
                        <img :src="avatar ? avatar : '@/assets/images/default.svg'" title="logo" loading="lazy"
                          alt="image" width="120" height="120" />

                        <div class="upload_profile">
                          <input type="file" id="upload_image_1" @change="onFileChange">
                          <label for="upload_image_1" class="flex-center">
                            <font-awesome-icon :icon="['fas', 'camera-retro']" />
                          </label>
                        </div>
                      </div>
                    </form>

                  </div>

                </div>
                <h3>{{ this.$store.getters.user_name }}</h3>
              </div>

              <div class="side_menu_profile">

                <ul>

                  <li :class="{
                    'active': $route.path.split('/').pop() == 'profile'
                  }">
                    <a :href="'mailto:' + this.$store.getters.user_email">
                      <img src="@/assets/images/email.png" title="logo" loading="lazy" alt="image" width="20"
                        height="20" />
                      <span>{{ this.$store.getters.user_email }}</span>
                    </a>
                  </li>

                  <li>
                    <a :href="'tel:' + this.$store.getters.user_mobile">
                      <img src="@/assets/images/phone.png" title="logo" loading="lazy" alt="image" width="20"
                        height="20" />
                      <span>{{ this.$store.getters.user_mobile }}</span>
                    </a>
                  </li>

                  <li>
                    <nuxt-link :to="localePath('/favorite')">
                      <img src="@/assets/images/heart.png" title="logo" loading="lazy" alt="image" width="20"
                        height="20" />
                      <span>{{ $t('pages.favorites') }}</span>
                    </nuxt-link>
                  </li>

                  <li>
                    <nuxt-link :to="localePath('/subscribe')">
                      <img src="@/assets/images/subscribe.png" title="logo" loading="lazy" alt="image" width="20"
                        height="20" />
                      <span>{{ $t('pages.subscriptions') }}</span>
                    </nuxt-link>
                  </li>

                  <li class="not_link" @click="openLogoutModal">
                    <img src="@/assets/images/folder_close.svg" title="logo" loading="lazy" alt="image" width="20"
                      height="20" />
                    <span>{{ $t('pages.delete_account') }}</span>
                  </li>

                  <li class="not_link" @click="handleLogOut">
                    <img src="@/assets/images/person_close.svg" title="logo" loading="lazy" alt="image" width="20"
                      height="20" />
                    <span>{{ $t('hero.logout') }}</span>
                  </li>

                </ul>

              </div>

            </div>

          </div>

          <div class="col-lg-9 col-12">
            <nuxt-child />
          </div>

        </div>

        <div class="images_pattern">
          <img src="@/assets/images/profile_back.png" alt="image" class="image-1" loading="lazy" width="100%"
            height="100%" />
        </div>

      </div>
    </div>

    <!--  start ::::::::: open logout popup ::::::::::: -->
    <LazyModalsLogout ref="modal_logout">
    </LazyModalsLogout>
    <!--  End ::::::::: open logout popup ::::::::::: -->

  </section>
</template>

<script>

export default {

  name: "profile_side_component",

  layout: "default",

  // middleware: ["default"],
  // middleware: ["auth-user", "auth"],


  data() {
    return {

      selectedFile: null,

      // data from api

      name: '',
      avatar: '',
      cover: "",

      formData: {
        name: "",
        email: "",
        mobile: "",
      },

    }
  },


  watch: {

    // update personal info image
    async selectedFile(newFile) {

      const formData = new FormData();

      formData.append('avatar', newFile);

      try {

        await this.$axios.$post('auth/update-profile', formData).then(response => {

          this.avatar = response.data.user.user.image;

          this.$store.commit('setUserImage', this.avatar);

          this.$iziToast.success({
            title: 'OK',
            timeout: 3000,
            message: `${response.message}`,
          });

        }).catch(error => {

          this.$iziToast.error({
            title: 'Error',
            timeout: 3000,
            position: 'topRight',
            message: `${error.response.data.message}`,
          });

        })
      } catch (error) {
        console.log('try catch =>', error);
      }

    },

  },

  mounted() {

    window.scrollTo(0, 0);

  },

  // All methods and logic

  methods: {

    // get files from input file

    onFileChange(event) {
      this.selectedFile = event.target.files[0];
    },

    // start ::::::::: open logout popup :::::::::::
    openLogoutModal() {
      this.$refs.modal_logout.isOpenLogout = true;
    },
    // End ::::::::: open logout popup :::::::::::


    async handleLogOut() {

      this.isOpenLogout = false

      localStorage.clear();

      this.$auth.logout();

      this.$cookies.remove('auth._token.local')
      window.localStorage.removeItem('vuex');

      await this.$router.push(this.localePath({ path: "/" }));

      // for set user from api
      // window.location.reload()

    },


  },

  // ::::::::: start collect data ::::::::

  async fetch() {
    try {
      return await this.$axios.get(`auth/profile`).then(response => {

        let { user } = response.data.data;
        this.formData.name = user.name;
        this.formData.email = user.email;
        this.formData.mobile = user.mobile;
        this.avatar = user.image;

      }).catch(error => {
        console.log(error)
      })
    } catch (error) {
      console.log("catch : " + error)
    }
  },

  // ::::::::: End collect data ::::::::

}
</script>

<style lang="scss" scoped></style>
