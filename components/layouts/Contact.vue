<template>
  <div class="flight-search-form">
    <div class="container">
      <div class="form-content">
        <div class="form-header">
          <label>
            <input type="radio" name="trip_type" value="one_way" checked />
            {{ $t("booking.one_way") }}
          </label>
          <label>
            <input type="radio" name="trip_type" value="round_trip" />{{
              $t("booking.round_trip")
            }}
          </label>
        </div>
        <div class="line"></div>
        <div class="row">
          <!-- From Field -->
          <div class="col-lg-2 col-md-6 col-12">
            <div class="form-group">
              <label>
                <img
                  src="@/assets/images/from.png"
                  alt="From Icon"
                  width="30"
                  height="30"
                />
                <span>{{ $t("booking.from") }}</span>
              </label>
              <input type="text" :placeholder="$t('pleacholder.flight')" />
            </div>
          </div>

          <!-- To Field -->
          <div class="col-lg-2 col-md-6 col-12">
            <div class="form-group">
              <label>
                <img src="@/assets/images/to.png" alt="To Icon" width="30" height="30" />
                <span> {{ $t("booking.to") }}</span>
              </label>
              <input type="text" :placeholder="$t('pleacholder.where')" />
            </div>
          </div>

          <!-- Depart Field -->
          <div class="col-lg-2 col-md-6 col-12">
            <div class="form-group">
              <label>
                <img
                  src="@/assets/images/day.png"
                  alt="Depart Icon"
                  width="30"
                  height="30"
                />
                <span> {{ $t("booking.depart") }}</span>
              </label>
              <input type="date" placeholder="DD/MM/YYYY" />
            </div>
          </div>

          <!-- Return Field -->
          <div class="col-lg-2 col-md-6 col-12">
            <div class="form-group">
              <label>
                <img
                  src="@/assets/images/day.png"
                  alt="Return Icon"
                  width="30"
                  height="30"
                />
                {{ $t("booking.return") }}
              </label>
              <input type="date" placeholder="DD/MM/YYYY" />
            </div>
          </div>

          <!-- Cabin Class & Travelers -->
          <div class="col-lg-2 col-md-6 col-12">
            <div class="form-group">
              <label>
                <img
                  src="@/assets/images/class.png"
                  alt="Class Icon"
                  width="30"
                  height="30"
                />
                <span> {{ $t("booking.cobin_class") }}</span>
              </label>
              <select>
                <option>{{ $t("pleacholder.adult1") }}</option>
                <option>{{ $t("pleacholder.adult2") }}</option>
                <option>{{ $t("pleacholder.adult3") }}</option>
              </select>
            </div>
          </div>

          <!-- Search Button -->
          <div class="col-lg-1 col-md-6 col-12">
            <button class="search-btn">🔍</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ValidationProvider, ValidationObserver } from "vee-validate";

  export default {
    props: {
      value: { type: Object, default: {} },
    },

    name: "contactComponent",

    layout: "auth-layout",

    // define all properties

    components: {
      ValidationProvider,
      ValidationObserver,
    },

    data() {
      return {
        social: {},

        email: "",
        phone: "",
        whatsapp_phone: "",
        dial_code: "",

        formData: {
          name: "",
          email: "",
          phone: "",
          dial_code: "",
          code: "",
          type: "",
          body: "",
        },

        isWaitingRequest: false,
        // multiselect

        value: "",

        // vue tel input options

        dropdownOptions: {
          showDialCodeInSelection: true,
          showFlags: true,
          showDialCodeInList: true,
        },
        inputOptions: {
          required: true,
          maxlength: 15,
          placeholder: `${this.$t("login.phone_number")}`,
        },
      };
    },

    computed: {
      messageTypes() {
        return [
          {
            id: 1,
            name: this.$t("STATUS.request"),
            value: "request",
          },
          {
            id: 2,
            name: this.$t("STATUS.suggestion"),
            value: "suggestion",
          },
          {
            id: 3,
            name: this.$t("STATUS.inquiry"),
            value: "inquiry",
          },
          {
            id: 4,
            name: this.$t("STATUS.complaint"),
            value: "complaint",
          },
          {
            id: 5,
            name: this.$t("STATUS.other"),
            value: "other",
          },
        ];
      },
    },

    methods: {
      //start :: get code of country
      countryChanged(country) {
        // console.log(country)
        this.dial_code = country.dialCode;
        this.formData.code = country.iso2;
      },
      //End :: get code of country

      // Start:: validate Form Inputs
      validateFormInputs() {
        this.isWaitingRequest = true;

        const phoneRegex = /^05\d{8}$/;
        if (!this.formData.name) {
          this.isWaitingRequest = false;
          this.$iziToast.error({
            title: "Error",
            timeout: 3000,
            position: "topRight",
            message: `${this.$t("VALIDATION.name")}`,
          });
          return;
        } else {
          this.submitForm();
          return;
        }
      },
      // End:: validate Form Inputs

      //start:: login method
      async submitForm() {
        const REQUEST_DATA = new FormData();
        // Start:: Append Request Data

        REQUEST_DATA.append("name", this.formData.name);
        REQUEST_DATA.append("email", this.formData.email);
        REQUEST_DATA.append("mobile", this.formData.phone);
        REQUEST_DATA.append("country_key", this.dial_code);
        REQUEST_DATA.append("type", this.formData.type.value);
        REQUEST_DATA.append("body", this.formData.body);

        try {
          await this.$axios
            .$post("contacts", REQUEST_DATA)
            .then((response) => {
              this.$iziToast.success({
                title: "OK",
                timeout: 3000,
                message: `${response.message}`,
              });

              this.isWaitingRequest = false;

              this.$refs.observer.reset();

              this.formData = {
                name: "",
                email: "",
                phone: "",
                code: "",
                dial_code: "",
                type: "",
                body: "",
              };
            })
            .catch((error) => {
              console.log("fail" + error.response.data.message);
              this.isWaitingRequest = false;
              this.$iziToast.error({
                title: "Error",
                timeout: 3000,
                position: "topRight",
                message: `${error.response.data.message}`,
              });
            });
        } catch (error) {
          console.error(error);
        }
      },
      //End:: login method

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

      // End :::::::::: get social data ::::::::::
    },

    mounted() {
      window.scrollTo(0, 0);
      this.$nextTick(() => {
        window.scrollTo(0, 0);
      });

      // Start :::::::::: call methods ::::::::::
      this.getData();
      // End :::::::::: call methods ::::::::::
    },
  };
</script>

<style lang="scss" scoped></style>
