<template>
  <b-modal v-model="isOpenLogout" @hidden="onModalHidden" @click.native="closeModalOnOutsideClick"
    :no-close-on-backdrop="false" :dialog-class="main_modal" :hide-footer="true">

    <div class="content_modal">

      <div class="image">
        <img src="@/assets/images/logout.svg" title="" loading="lazy" alt="" width="190" height="100%" />
      </div>

      <div slot="modal-footer" class="footer_content">

        <div class="info">
          <p>{{ $t('pages.confirm_delete_account') }}</p>
        </div>

        <div class="btns_footer">
          <button type="button" class="main_btn close_btn" @click="deleteAccount">{{ $t('pages.yes') }}</button>
          <button type="button" class="main_btn ok" @click="isOpenLogout = false">{{ $t('pages.no') }}</button>
        </div>

      </div>

    </div>

    <!-- <slot></slot> -->
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      isOpenLogout: false,
      main_modal: ["main_modal"]
    };
  },
  methods: {
    onModalHidden() {
      // Emit an event when the modal is closed
      this.$emit('modal-closed');
    },

    // handle logout

    async deleteAccount() {

      try {

        await this.$axios.$delete('auth/delete-account').then(response => {

          this.$iziToast.success({
            title: 'OK',
            timeout: 3000,
            message: `${response.message}`,
          });

          this.isOpenLogout = false;

          localStorage.clear();

          this.$auth.logout();

          this.$cookies.remove('auth._token.local')
          window.localStorage.removeItem('vuex');

          this.$router.push(this.localePath({ path: "/login" }));

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

  created() {
    // Listen for the logout event emitted by Axios interceptor
    window.$nuxt.$on('logout', this.deleteAccount);
  },
  destroyed() {
    // Ensure to remove the event listener when component is destroyed
    window.$nuxt.$off('logout', this.deleteAccount);
  },
};
</script>
