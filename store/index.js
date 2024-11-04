export const state = () => ({
  email: "",
  user_name: "",
  user_email: "",
  user_image: "",
  user_mobile: "",
  
  completeInfo: 0,

  filterValues: {},
});

//  return data in state of store
// call with : this.$store.getters.sum

export const getters = {
  email: (state) => state.email,

  user_name: (state) => state.user_name,
  user_email: (state) => state.user_email,
  user_image: (state) => state.user_image,
  user_mobile: (state) => state.user_mobile,
  filterValues: (state) => state.filterValues,
  is_completeInfo: (state) => state.completeInfo,
};

export const mutations = {
  setEmail(state, newEmail) {
    state.email = newEmail;
  },

  setUserName(state, newVal) {
    state.user_name = newVal;
  },
  setUserEmail(state, newVal) {
    state.user_email = newVal;
  },
  setUserImage(state, newVal) {
    state.user_image = newVal;
  },

  setUserMobile(state, newVal) {
    state.user_mobile = newVal;
  },

  setCompleteInfo(state, newVal) {
    state.completeInfo = newVal;
  },

  setFilterValues(state, values) {
    state.filterValues = values;
  },
};
