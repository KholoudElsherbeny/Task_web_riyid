<template>
  <div class="payment subscribe_page">

    <section>
      <div class="container">

        <div class="links">
          <ul>
            <li class="active"><nuxt-link :to="localePath('/')">{{ $t('navbar.home') }} /</nuxt-link></li>
            <li class="active"><nuxt-link :to="localePath('/coach')">{{ $t('pages.trainers') }} /</nuxt-link></li>
            <li class="active"><nuxt-link :to="localePath(`/coach/${coach_id}`)">{{ $t('pages.trainer_details') }}
                /</nuxt-link>
            </li>
            <li>{{ $t('pages.order_summary_payment') }}</li>
          </ul>
        </div>

        <div class="row">

          <div class="col-lg-3 col-12">
            <div class="order_detail">

              <h4>{{ $t('pages.order_summary') }}</h4>

              <div class="info flex-between">
                <p class="title">{{ $t('pages.program_price') }}</p>
                <p>{{ subscription.price }} {{ $t('pages.r_s') }}</p>
              </div>

              <span class="hint">{{ $t('pages.subtotal') }}</span>

              <div class="info flex-between">
                <p class="title">{{ $t('pages.vat_amount') }}</p>
                <p>{{ subscription.tax }} {{ $t('pages.r_s') }}</p>
              </div>

              <div class="info total flex-between">
                <p class="title">{{ $t('pages.total') }}</p>
                <p class="price">{{ subscription.total }} {{ $t('pages.r_s') }}</p>
              </div>
              <span class="hint">{{ $t('pages.total_with_tax') }}</span>

            </div>
          </div>

          <div class="col-lg-9 col-12">
            <div class="bank_box order_detail">
              <h5>{{ $t('pages.payment') }}</h5>

              <div class="all_methods">
                <div class="form-group">
                  <input type="radio" value="visa" name="payment_card">
                  <label for="">
                    <img src="@/assets/images/visa.png" alt="visa">
                    <p>{{ $t('pages.visa') }}</p>
                  </label>
                </div>
                <div class="form-group">
                  <input type="radio" value="master" name="payment_card">
                  <label for="">
                    <img src="@/assets/images/master.png" alt="master">
                    <p>{{ $t('pages.mastercard') }}</p>
                  </label>
                </div>
                <div class="form-group">
                  <input type="radio" value="mada" name="payment_card">
                  <label for="">
                    <img src="@/assets/images/mada.png" alt="mada">
                    <p>{{ $t('pages.maestro') }}</p>
                  </label>
                </div>
                <div class="form-group">
                  <input type="radio" value="apple" name="payment_card">
                  <label for="">
                    <img src="@/assets/images/apple.png" alt="apple">
                    <p> {{ $t('pages.apple_pay') }}</p>
                  </label>
                </div>
              </div>

              <h6>{{ $t('pages.card_details') }}</h6>

              <form action="">

                <div class="form-group main_input">
                  <label for="">{{ $t('pages.card_holder_name') }}</label>
                  <input type="text" :placeholder="$t('login.card_holder_name')" />
                </div>
                <div class="form-group main_input">
                  <label for="">{{ $t('pages.card_number') }}</label>
                  <input type="text" placeholder="45** **** **** ****" />
                </div>

                <div class="row">
                  <div class="col-lg-6 col-12">
                    <div class="form-group main_input">
                      <label for="">{{ $t('pages.expiry_date') }}</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div class="col-lg-6 col-12">
                    <div class="form-group main_input">
                      <label for="">CVV</label>
                      <input type="text" placeholder="***" />
                    </div>
                  </div>
                </div>

              </form>

            </div>
          </div>

        </div>

        <button class="main_btn" @click="submitForm" :disabled="isWaitingRequest">{{ $t('pages.pay_button') }}</button>

        <div class="back_image">
          <img src="@/assets/images/payment_back.png" alt="back" width="100" height="100">
        </div>

      </div>

    </section>

  </div>
</template>

<script>

export default {

  name: 'subscribe',

  layout: "default",

  data() {
    return {

      isWaitingRequest: false,


      subscription: {},

      coach_id: null,

      formData: {
        name: "",
        comment: "",
        rate_stars: ""
      }
    };
  },


  methods: {

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

      REQUEST_DATA.append("program_id", this.$route.params.id);
      // REQUEST_DATA.append("comment", this.formData.comment);
      // REQUEST_DATA.append("stars", this.formData.rate_stars);

      try {

        // REQUEST_DATA

        await this.$axios.$get('payment');

        await this.$axios.$post('subscriptions', REQUEST_DATA).then(response => {

          this.isWaitingRequest = true;

          this.$iziToast.success({
            title: 'OK',
            timeout: 3000,
            message: `${response.message}`,
          });

          this.$router.push(this.localePath({ path: "/" }));

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

    // ::::::::: start Page data ::::::::::::

    async getData() {
      await this.$axios.get(`subscription-details?program_id=${this.$route.params.id}`).then(response => {
        const { Subscription } = response.data.data;
        this.subscription = Subscription;
      })
    },

    // ::::::::: End Page data ::::::::::::

  },

  mounted() {

    this.getData();

    this.coach_id = this.$route.query.coach_id;
  }


};
</script>

<style></style>
