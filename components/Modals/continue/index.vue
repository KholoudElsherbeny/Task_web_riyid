<template>
  <b-modal v-model="open" @hidden="onModalHidden" @click.native="closeModalOnOutsideClick" :no-close-on-backdrop="false"
    :dialog-class="main_modal" :hide-footer="true">

    <div class="content_modal">

      <div class="image">
        <img src="@/assets/images/push.png" title="" loading="lazy" alt="" width="190" height="100%" />
      </div>

      <div slot="modal-footer" class="footer_content">

        <div class="info">
          <p>{{ $t('pages.complete_profile_message') }}</p>
        </div>

        <div class="btns_footer">
          <nuxt-link class="w-100" :to="{ path: localePath('/profile'), query: { tab: 2 } }"><button type="button"
              class="main_btn ok">{{
                $t('pages.complete_profile_button') }}</button></nuxt-link>
          <button type="button" class="main_btn close_btn" @click="open = false">{{ $t('pages.close_button')
            }}</button>
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
      open: false,
      main_modal: ["main_modal", "logout_modal"]
    };
  },
  methods: {

    onModalHidden() {
      // Emit an event when the modal is closed
      this.$emit('modal-closed');
    },

  },

};
</script>
