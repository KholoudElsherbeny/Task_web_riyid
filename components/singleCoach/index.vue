<template>
  <div class="subscribe_page coach_component subscribe_page  details_coach">

    <section>
      <div class="container">

        <div class="links">
          <ul>
            <li class="active"><nuxt-link :to="localePath('/')">{{ $t('navbar.home') }} /</nuxt-link></li>
            <li class="active"><nuxt-link :to="localePath('/coach')">{{ $t('pages.trainers') }} /</nuxt-link></li>
            <li>{{ $t('pages.trainer_details') }}</li>
          </ul>
        </div>

        <div class="row" data-aos="fade-up">

          <div class="col-lg-9 col-12">

            <div class="coach_details">

              <div class="image">
                <img :src="coach.image" alt="dumble" width="" height="" />
              </div>

              <div class="all_content">
                <div class="head flex-between">

                  <div class="title">
                    <h4>{{ coach.name }}</h4>
                    <no-ssr>
                      <star-rating :rating="coach.rate" :star-size="15" :read-only="true"
                        :show-rating="false"></star-rating>
                    </no-ssr>
                  </div>

                  <div class="actions flex-center">

                    <div class="likes reminder flex-center" @click="makeReminder(coach.id)" v-if="!coach.available">
                      <img src="@/assets/images/notification-bell.png" alt="notification-bell" width="24" height="24" />
                      <!-- <font-awesome-icon :icon="['far', 'bell']" /> -->
                    </div>

                    <div class="likes flex-center" :class="{ 'like': coach.favorite }"
                      @click="toggleLike(coach.id, $event)">
                      <font-awesome-icon :icon="['far', 'heart']" />
                    </div>

                  </div>

                </div>

                <div class="desc">
                  <p>{{ coach.description }}</p>
                </div>

                <div class="foot">

                  <div class="licence">
                    <img src="@/assets/images/medal.svg" alt="coach" width="24" height="24">
                    <p>{{ $t('pages.experience') }} {{ coach.experience }} {{ $t('pages.years') }}</p>
                  </div>

                  <div class="licence">
                    <img src="@/assets/images/hand.png" alt="coach" width="24" height="24">
                    <p>{{ coach.specialty?.name }} - {{ coach.subspecialty?.name }}</p>
                  </div>

                  <div class="available" :class="{ 'disavailable': !coach.available }">
                    <span><font-awesome-icon :icon="['fas', 'circle']" /></span>
                    <span>{{ coach.available ? $t('pages.available') : $t('pages.unavailable') }}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div class="col-lg-3 col-12">
            <div class="contact">
              <h5>{{ $t('pages.contact_trainer') }}</h5>
              <a :href="'tel:' + coach.mobile" target="_blank" rel="noopener noreferrer">
                <div class="licence">
                  <img src="@/assets/images/phone.png" alt="coach" width="24" height="24">
                  <p>{{ coach.mobile }}</p>
                </div>
              </a>
              <a :href="'https://wa.me/' + coach.whatsapp" target="_blank" rel="noopener noreferrer">
                <div class="licence">
                  <img src="@/assets/images/whatsapp.png" alt="coach" width="24" height="24">
                  <p>{{ coach.whatsapp }}</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        <div class="head_section" data-aos="fade-up">
          <div class="image">
            <img src="@/assets/images/programs.svg" alt="dumble" width="" height="" />
            <h6>{{ $t('pages.available_programs') }}</h6>
          </div>
        </div>

        <div class="row">

          <div class="col-lg-4 col-md-6 col-12" v-for="(item, index) in coach.programs" :key="'g' + index">
            <div class="program_box" v-if="item.is_active == 1">

              <div class="image">
                <img src="@/assets/images/program.png" alt="program" width="" height="" />
              </div>

              <div class="overlay">
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>

                <div class="price">
                  <span>{{ $t('pages.program_price') }} :</span>
                  <span>{{ item.price }} {{ $t('pages.r_s') }}</span>
                </div>

                <div class="subscribe_btn">
                  <button class="main_btn" :disabled="!coach.available"
                    @click="openContinue(item.id, item.is_subscripted)">{{
                      $t('pages.subscribe_to_program_label') }}</button>
                </div>
              </div>

            </div>
            <!-- <p class="not_found"></p> -->
          </div>

        </div>

        <div class="back_image">
          <img src="@/assets/images/back_coach.png" alt="coach" width="40" height="40">
        </div>

      </div>

      <!-- Start :::::::::: success modal :::::::::::: -->
      <LazyModalsSuccessApplied ref="modal_SuccessApplied">
        <p>{{ $t('footer.success_message') }}</p>
      </LazyModalsSuccessApplied>
      <!-- Start :::::::::: success modal :::::::::::: -->

      <!-- Start :::::::::: continue modal :::::::::::: -->
      <LazyModalsContinue ref="modal_continue">
      </LazyModalsContinue>
      <!-- Start :::::::::: continue modal :::::::::::: -->

      <!-- Start :::::::::: modal_login :::::::::::: -->
      <LazyModalsSuccess ref="modal_login">
        <h2 class="text-center">{{ $t('pages.login_required_message') }}</h2>

        <div class="footer_content">
          <nuxt-link :to="localePath('/login')">
            <button type="button " class="main_btn reset_pass">{{
              $t('navbar.login') }}</button>
          </nuxt-link>
        </div>

      </LazyModalsSuccess>
      <!-- Start :::::::::: modal_login :::::::::::: -->

    </section>

  </div>
</template>

<script>

export default {

  props: {
    coach: { type: Object, default: {} }
  },

  name: 'subscribe',

  layout: "default",

  data() {
    return {

      isWaitingRequest: false,

      formData: {
        name: "",
        comment: "",
        rate_stars: ""
      }
    };
  },


  methods: {

    // Start :::::::::::::  open Modal :::::::::::::
    openModal() {
      this.$refs.modal.isOpen = true;
    },

    openContinue(program_id, is_subscripted) {
      if (this.$store.getters.is_completeInfo == 1 && this.$auth.loggedIn) {

        if (is_subscripted) {

          this.$iziToast.error({
            title: 'Error',
            timeout: 3000,
            position: 'topRight',
            message: this.$t('pages.is_subscribe'),
          });

        } else {
          this.$router.push(this.localePath({ path: `/payment/${program_id}`, query: { coach_id: this.coach.id } }));
        }
        // this.$router.push(this.localePath({ path: `/payment/${program_id}` }));

      } else if (this.$store.getters.is_completeInfo == 0 && this.$auth.loggedIn) {

        this.$refs.modal_continue.open = true;

      } else {

        this.$refs.modal_login.isOpen = true;
      }

    },
    // End ::::::::::::::: open Modal :::::::::::::

    // get stars number

    setRating(rating) {
      this.formData.rate_stars = rating;
    },

    // Start:: validate Form Inputs
    validateFormInputs() {
      this.isWaitingRequest = true;

      const phoneRegex = /^05\d{8}$/;
      if (!this.formData.name) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          title: 'Error',
          timeout: 3000,
          position: 'topRight',
          message: `${this.$t('VALIDATION.name')}`,
        });
        return;
      }
      else if (!this.formData.comment) {
        this.isWaitingRequest = false;
        this.$iziToast.error({
          title: 'Error',
          timeout: 3000,
          position: 'topRight',
          message: `${this.$t('VALIDATION.note')}`,
        });
        return;
      }
      else {
        this.submitForm();
        return;
      }
    },
    // End:: validate Form Inputs

    //start:: submitForm method
    async submitForm() {

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data

      REQUEST_DATA.append("name", this.formData.name);
      REQUEST_DATA.append("comment", this.formData.comment);
      REQUEST_DATA.append("stars", this.formData.rate_stars);

      try {

        await this.$axios.$post('rates', REQUEST_DATA).then(response => {

          this.$iziToast.success({
            title: 'OK',
            timeout: 3000,
            message: `${response.message}`,
          });

          this.formData = {
            name: "",
            comment: "",
            rate_stars: ""
          }

          this.$refs.modal.isOpen = false;

        }).catch(error => {
          console.log('fail' + error.response.data.message)
          this.$iziToast.error({
            title: 'Error',
            timeout: 3000,
            position: 'topRight',
            message: `${error.response.data.message}`,
          });

        })

      } catch (error) {
        console.error(error)
      }
    },
    //End:: submitForm method

    async toggleLike(coach_id, event) {
      // Prevent default behavior of the click event
      event.preventDefault();
      // Stop event propagation to prevent navigation
      event.stopPropagation();

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data

      REQUEST_DATA.append("coach_id", coach_id);

      try {

        await this.$axios.$post(`coaches/${coach_id}/favorite`, REQUEST_DATA).then(response => {

          this.$emit('like-toggled');

          this.$iziToast.success({
            title: 'OK',
            timeout: 3000,
            message: `${response.message}`,
          });


        }).catch(error => {

          console.log('fail' + error.response.data.message);
          this.isWaitingRequest = false;
          this.$iziToast.error({
            title: 'Error',
            timeout: 3000,
            position: 'topRight',
            message: `${error.response.data.message}`,
          });

        })

      } catch (error) {
        console.error(error)
      }
    },

    async makeReminder(coach_id) {

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data

      REQUEST_DATA.append("value", 1);

      try {

        await this.$axios.$post(`coaches/${coach_id}/reminder`, REQUEST_DATA).then(response => {

          this.$refs.modal_SuccessApplied.isSuccessApplied = true;

          this.$emit('like-toggled');

          this.$iziToast.success({
            title: 'OK',
            timeout: 3000,
            message: `${response.message}`,
          });


        }).catch(error => {

          console.log('fail' + error.response.data.message);
          this.isWaitingRequest = false;
          this.$iziToast.error({
            title: 'Error',
            timeout: 3000,
            position: 'topRight',
            message: `${error.response.data.message}`,
          });

        })

      } catch (error) {
        console.error(error)
      }
    }

  },


};
</script>

<style></style>
