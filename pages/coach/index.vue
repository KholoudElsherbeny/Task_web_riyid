<template>
  <div class="favorite_page coach_page">

    <div class="search_box">
      <div class="container">
        <form action="">

          <input type="text" :placeholder="$t('pages.search_for_trainer')" v-model="trainer_name" />
          <button class="main_btn" type="button" @click="searchName">{{ $t('pages.search') }}</button>

        </form>

        <div class="toggle_filter" @click="toggleFilter">

          <font-awesome-icon :icon="['fas', 'arrow-down-short-wide']" />

        </div>

      </div>
    </div>

    <div class="container">

      <div class="row">

        <transition name="fade">
          <div class="col-lg-3 col-12" v-if="filter_show">

            <div class="filters">

              <!-- ::::::::::: start main_type :::::::::::: -->
              <!-- {{ selectedMainType }} -->
              <div class="box box_category">
                <h4>{{ $t('pages.main_specialization') }}</h4>

                <div class="form-group" v-for="(option, index) in mainTypes" :key="index">
                  <input type="radio" :id="'main_type_' + index" name="main_type" :value="option.id"
                    v-model="selectedMainType" />
                  <label :for="'main_type_' + index">{{ option.name }}</label>
                </div>

              </div>
              <!-- ::::::::::: start main_type :::::::::::: -->

              <!-- ::::::::::: default_type :::::::::::: -->
              <!-- {{ selectedSubType }} -->
              <div class="box box_category">
                <h4>{{ $t('pages.sub_specialization') }}</h4>

                <div class="form-group" v-for="(option, index) in subTypes" :key="index">
                  <input type="radio" :id="'sub_type_' + index" name="sub_type" :value="option.id"
                    v-model="selectedSubType" />
                  <label :for="'sub_type_' + index">{{ option.name }}</label>
                </div>

              </div>
              <!-- ::::::::::: default_type :::::::::::: -->

              <!-- ::::::::::: coach_status :::::::::::: -->

              <!-- {{ availability }} -->

              <div class="box">
                <h4>{{ $t('pages.trainer_status') }}</h4>

                <div class="form-group">
                  <input type="radio" id="" name="coach_status" value="null" v-model="availability" />
                  <label for="">{{ $t('pages.all') }}</label>
                </div>
                <div class="form-group available">
                  <input type="radio" id="" name="coach_status" value="1" v-model="availability" />
                  <label for="">
                    <span><font-awesome-icon :icon="['fas', 'circle']" /></span>
                    <span>{{ $t('pages.available') }}</span>
                  </label>
                </div>
                <div class="form-group available disavailable">
                  <input type="radio" id="" name="coach_status" value="0" v-model="availability" />
                  <label for="">
                    <span><font-awesome-icon :icon="['fas', 'circle']" /></span>
                    <span>{{ $t('pages.unavailable') }}</span>
                  </label>
                </div>

              </div>
              <!-- ::::::::::: coach_status :::::::::::: -->

              <!-- ::::::::::: years of expertise :::::::::::: -->
              <!-- {{ experiences_year }} -->
              <div class="box">
                <h4>{{ $t('pages.years_of_experience') }}</h4>

                <div class="form-group">
                  <input type="text" :placeholder="$t('pages.enter_years')" v-model="experiences_year" />
                  <label for="">{{ $t('pages.year') }}</label>
                </div>

              </div>
              <!-- ::::::::::: years of expertise :::::::::::: -->

              <!-- ::::::::::: rate :::::::::::: -->
              <!-- {{ selectedRating }} -->
              <div class="box">
                <h4>{{ $t('pages.rating') }}</h4>

                <div class="form-group">
                  <input type="radio" id="" name="rate" value="0" v-model="selectedRating" />
                  <label for="">{{ $t('pages.all') }}</label>
                </div>

                <div class="form-group">
                  <input type="radio" id="" name="rate" value="5" v-model="selectedRating" />
                  <label for="">
                    <no-ssr>
                      <star-rating :rating="5" :star-size="20" :read-only="true" :show-rating="false"></star-rating>
                    </no-ssr>
                  </label>
                </div>

                <div class="form-group">
                  <input type="radio" id="" name="rate" value="4" v-model="selectedRating" />
                  <label for="">
                    <no-ssr>
                      <star-rating :rating="4" :star-size="20" :read-only="true" :show-rating="false"></star-rating>
                    </no-ssr>
                  </label>
                </div>

                <div class="form-group">
                  <input type="radio" id="" name="rate" value="3" v-model="selectedRating" />
                  <label for="">
                    <no-ssr>
                      <star-rating :rating="3" :star-size="20" :read-only="true" :show-rating="false"></star-rating>
                    </no-ssr>
                  </label>
                </div>

                <div class="form-group">
                  <input type="radio" id="" name="rate" value="2" v-model="selectedRating" />
                  <label for="">
                    <no-ssr>
                      <star-rating :rating="2" :star-size="20" :read-only="true" :show-rating="false"></star-rating>
                    </no-ssr>
                  </label>
                </div>

                <div class="form-group">
                  <input type="radio" id="" name="rate" value="1" v-model="selectedRating" />
                  <label for="">
                    <no-ssr>
                      <star-rating :rating="1" :star-size="20" :read-only="true" :show-rating="false"></star-rating>
                    </no-ssr>
                  </label>
                </div>

              </div>
              <!-- ::::::::::: rate :::::::::::: -->

              <!-- ::::::::::: program_price :::::::::::: -->
              <!-- {{ selectedOrder }} -->
              <div class="box">
                <h4>{{ $t('pages.program_price') }}</h4>

                <div class="form-group">
                  <input type="radio" id="" name="program_price" value="asc" v-model="selectedOrder" />
                  <label for="">{{ $t('pages.from_lowest_to_highest') }}</label>
                </div>

                <div class="form-group">
                  <input type="radio" id="" name="program_price" value="desc" v-model="selectedOrder" />
                  <label for="">
                    <span>{{ $t('pages.from_highest_to_lowest') }}</span>
                  </label>
                </div>

              </div>
              <!-- ::::::::::: program_price :::::::::::: -->

              <div class="form-group">
                <button class="main_btn" type="button" @click="getData('search_btn')">{{ $t('pages.search') }}</button>
                <button class="main_btn reset" type="button" @click="clearData">{{ $t('pages.clear_search') }}</button>
              </div>

            </div>

          </div>
        </transition>

        <div class="col-lg-9 col-12">

          <h2 class="main_head">{{ $t('pages.trainers_list') }}</h2>
          <!-- ::::::::::: start favorite pages :::::::::: -->
          <LazyCoach :coaches="coaches" @like-toggled="getData" />
          <!-- ::::::::::: End favorite pages :::::::::::: -->

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {

  name: 'trainers',

  layout: "default",

  head() {
    return {
      title: this.$t('pages.trainers_list'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('pages.trainers_list'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('pages.trainers_list'),
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

      coaches: [],

      trainer_name: "",
      availability: "",
      experiences_year: "",
      selectedRating: "",
      selectedOrder: "",

      selectedMainType: '',
      selectedSubType: '',
      mainTypes: [],
      subTypes: [],

      filter_show: true

    };
  },

  methods: {

    ...mapMutations(['setFilterValues']),

    toggleFilter() {
      this.filter_show = !this.filter_show;
    },

    // ::::::::: start Page data ::::::::::::

    clearData() {
      this.trainer_name = "";
      this.availability = "";
      this.experiences_year = "";
      this.selectedRating = "";
      this.selectedOrder = "";

      this.selectedMainType = "";
      this.selectedSubType = "";

      this.getData();
      window.scrollTo(0, 0)
    },

    async getData(search_btn) {

      if (window.innerWidth <= 767) {
        this.filter_show = false;
        if (search_btn === 'search_btn') {
          this.filter_show = false;
        }
      } else {
        this.filter_show = true;
      }

      // Create an object to hold the parameters
      const params = {};

      if (this.selectedMainType) params.specialty = this.selectedMainType;

      if (this.selectedSubType) params.subspecialty = this.selectedSubType;
      if (this.availability) params.available = this.availability;
      if (this.experiences_year) params.experience = this.experiences_year;
      if (this.selectedRating) params.rate = this.selectedRating;
      if (this.selectedOrder) params.orderByPrograms = this.selectedOrder;

      this.setFilterValues(params);

      return await this.$axios.get('coaches', { params }).then(response => {
        const { data } = response.data;
        this.coaches = data;

        // update page route with keys


        window.scrollTo(0, 0)

      })
    },

    async searchName() {
      // Create an object to hold the parameters
      const params = {};

      // Add parameters only if they have values
      if (this.trainer_name) params.name = this.trainer_name;

      return await this.$axios.get('coaches', { params }).then(response => {
        const { data } = response.data;
        this.coaches = data;

      })
    },

    async getMainTypes() {

      const params = {
        is_active: 1,
        limit: 0
      }

      return await this.$axios.get('specialties', { params }).then(response => {
        const { data } = response.data;
        this.mainTypes = data;

      })
    },

    async getSubTypes() {

      const params = {
        is_active: 1,
        limit: 0
      }

      return await this.$axios.get('sub-specialties', { params }).then(response => {
        const { data } = response.data;
        this.subTypes = data;

      })
    },

    // ::::::::: End Page data :::::::::::::::

  },

  computed: {
    ...mapState(['filterValues']),

    shouldShowFilter() {
      return window.innerWidth > 767;
    }
  },

  beforeRouteEnter(to, from, next) {
    // Add a meta field to route indicating if it came from 'coach/any_id'
    next(vm => {
      vm.$route.meta.cameFromCoachAnyId = from.path.includes('/coach') || from.path.includes('/any_id');
    });
  },

  mounted() {
    // Check if the previous page was 'coach/any_id'
    const cameFromCoachAnyId = this.$route.meta.cameFromCoachAnyId;

    if (cameFromCoachAnyId) {
      this.selectedMainType = this.filterValues.specialty;
      this.selectedSubType = this.filterValues.subspecialty;
      this.selectedRating = this.filterValues.rate;
      this.availability = this.filterValues.available;
      this.experiences_year = this.filterValues.experience;
      this.selectedOrder = this.filterValues.orderByPrograms;
    } else {
      // Reset filter values
      this.clearData();
    }

    this.getData();
    this.getMainTypes();
    this.getSubTypes();
  },

};
</script>

<style></style>
