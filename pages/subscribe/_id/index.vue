<template>
  <div class="subscribe_page">

    <section>
      <div class="container">

        <div class="links">
          <ul>
            <li class="active"><nuxt-link :to="localePath('/')">{{ $t('navbar.home') }} /</nuxt-link></li>
            <li class="active"><a href="#"><nuxt-link :to="localePath('/')">{{ $t('pages.subscriptions') }}
                  /</nuxt-link></a>
            </li>
            <li>{{ $t('pages.subscription_details') }}</li>
          </ul>
        </div>

        <div class="row">

          <div class="col-lg-7 col-12">

            <div class="col-12">
              <!-- :::::::::: start subscribe ::::::::::: -->
              <div class="subscribe_box">

                <div class="head_id flex-between">
                  <span>#{{ subscription.id }}</span>
                  <div class="date">
                    <span><font-awesome-icon :icon="['fas', 'calendar-days']" /></span>
                    <span>{{ subscription.created_at }}</span>
                  </div>
                </div>

                <div class="info">
                  <span class="title">{{ $t('pages.trainer') }} :</span>

                  <div class="coach">
                    <div class="image">
                      <img :src="subscription.coach?.image" alt="coach" width="40" height="40">
                      <h2>{{ subscription.coach?.name }}</h2>
                    </div>

                    <div class="licence">
                      <img src="@/assets/images/hand.png" alt="coach" width="24" height="24">
                      <p> {{ subscription.coach?.specialty }} - {{ subscription.coach?.subspecialty }}</p>
                    </div>

                    <div class="contact">
                      <a :href="'tel:' + subscription.coach?.mobile" target="_blank" rel="noopener noreferrer">
                        <div class="licence">
                          <img src="@/assets/images/phone.png" alt="coach" width="24" height="24">
                          <p>{{ subscription.coach?.mobile }}</p>
                        </div>
                      </a>
                      <a :href="'https://wa.me/' + subscription.coach?.whatsapp_mobile" target="_blank"
                        rel="noopener noreferrer">
                        <div class="licence">
                          <img src="@/assets/images/whatsapp.png" alt="coach" width="24" height="24">
                          <p>{{ subscription.coach?.whatsapp_mobile }}</p>
                        </div>
                      </a>
                    </div>

                  </div>
                </div>

              </div>
              <!-- :::::::::: End subscribe ::::::::::: -->
            </div>

            <div class="col-12">
              <!-- :::::::::: start subscribe ::::::::::: -->
              <div class="subscribe_box">

                <div class="info">
                  <span class="title">{{ $t('pages.program') }}</span>

                  <div class="content">
                    <h3>{{ subscription.program?.name }}</h3>
                    <p>{{ subscription.program?.description }}</p>
                  </div>

                </div>

              </div>
              <!-- :::::::::: End subscribe ::::::::::: -->
            </div>

            <div class="col-12">
              <div class="subscribe_box">
                <div class="bill" @click="openBill">
                  <img src="@/assets/images/book.png" alt="coach" width="40" height="40">
                  <p>{{ $t('pages.electronic_tax_invoice') }}</p>
                </div>
              </div>
            </div>

          </div>

          <div class="col-lg-5 col-12">
            <div class="col-12">
              <!-- :::::::::: start subscribe ::::::::::: -->
              <div class="subscribe_box">

                <div class="box_price">
                  <div class="info">
                    <span class="title">{{ $t('pages.price_details') }}</span>

                    <ul>
                      <li>
                        <span> {{ $t('pages.program_price') }}</span>
                        <span>{{ subscription.program?.price }} {{ $t('pages.r_s') }}</span>
                      </li>
                      <li>
                        <span>{{ $t('pages.vat_amount') }}</span>
                        <span>{{ subscription.tax }} {{ $t('pages.r_s') }}</span>
                      </li>
                      <li class="price">
                        <span>{{ $t('pages.total') }}</span>
                        <span>{{ subscription.total }} {{ $t('pages.r_s') }}</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
              <!-- :::::::::: End subscribe ::::::::::: -->

              <!-- :::::::::: start rate subscribe ::::::::::: -->
              <div class="subscribe_box" v-for="(item, index) in subscription.rates" :key="'m' + index">

                <div class="info flex-between">
                  <span class="title">{{ $t('pages.request_evaluation') }}</span>
                  <no-ssr>
                    <star-rating :rating="item?.stars" :star-size="20" :read-only="true"
                      :show-rating="false"></star-rating>
                  </no-ssr>
                </div>

                <p>"{{ item?.comment }}"</p>

              </div>
              <!-- :::::::::: End rate subscribe ::::::::::: -->
            </div>
          </div>

        </div>

        <div class="rate_button" v-if="!subscription.is_rate">
          <button class="main_btn" @click="openModal">{{ $t('pages.evaluation') }}</button>
        </div>

        <div class="back_image">
          <img src="@/assets/images/gym_girl.png" alt="coach" width="40" height="40">
        </div>

        <!-- start modal -->

        <LazyModalsAddProject ref="modal">
          <div class="image">
            <!-- <img src="@/assets/images/modal.svg" title="logo" loading="lazy" alt="nav logo" width="120" height="48" /> -->
          </div>

          <div class="all_modal_body">
            <div class="info">
              <no-ssr>
                <star-rating :rating="formData.rate_stars" :star-size="50" :read-only="false" :show-rating="false"
                  @rating-selected="setRating"></star-rating>
              </no-ssr>

              <textarea type="text" v-model="formData.comment" class="textarea_comment"
                :placeholder="$t('pages.leave_comment')"></textarea>
            </div>

            <button class="main_btn reset_pass" aria-label="save" title="save" @click="validateFormInputs"
              :disabled="isWaitingRequest">{{
                $t('contact.send')
              }}</button>
          </div>

        </LazyModalsAddProject>

        <LazyModalsBill ref="bill_modal" :invoice="invoice"></LazyModalsBill>

        <!-- end modal -->


      </div>

    </section>

  </div>
</template>

<script>

export default {

  name: 'subscribe',

  layout: "default",

  head() {
    return {
      title: this.$t('pages.subscription_details'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('pages.subscription_details'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('pages.subscription_details'),
        },
        {
          hid: 'description',
          name: 'description',
        },
      ],
    }
  },

  data() {
    return {

      isWaitingRequest: false,

      subscription: {},
      invoice: {},

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
    openBill() {
      this.$refs.bill_modal.isOpen = true;
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
      if (!this.formData.comment) {
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

    //start:: login method
    async submitForm() {

      const REQUEST_DATA = new FormData();
      // Start:: Append Request Data

      REQUEST_DATA.append("user_id", this.$auth.user.id);
      REQUEST_DATA.append("comment", this.formData.comment);
      REQUEST_DATA.append("stars", this.formData.rate_stars);
      REQUEST_DATA.append("coach_id", this.subscription.coach.id);
      REQUEST_DATA.append("program_id", this.subscription.program.id);

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
    //End:: login method

    // ::::::::: start Page data ::::::::::::

    async getData() {
      return await this.$axios.get(`subscriptions/${this.$route.params.id}`).then(response => {
        const { Subscription } = response.data.data;
        this.subscription = Subscription;
      })
    },

    async getBillInfo() {
      return await this.$axios.get(`invoice-details?subscription_id=${this.$route.params.id}`).then(response => {
        const { Invoice } = response.data.data;
        this.invoice = Invoice;
      })
    },

    // ::::::::: End Page data ::::::::::::

  },


  mounted() {
    // :::::::::::: start call methods::::::::::
    this.getData()
    this.getBillInfo()
    // :::::::::::: start call methods::::::::::
  }


};
</script>

<style></style>
