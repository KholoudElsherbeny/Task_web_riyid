<template>
  <b-modal v-model="isSuccessApplied" @hidden="onModalHidden" @click.native="closeModalOnOutsideClick"
    :no-close-on-backdrop="false" :dialog-class="main_modal" :hide-footer="true">

    <div class="content_modal">

      <div class="image">
        <img src="@/assets/images/bell.svg" title="" loading="lazy" alt="" width="220" height="100%" />
      </div>

      <div slot="modal-footer" class="footer_content">

        <div class="info">
          <slot></slot>
        </div>

        <nuxt-link :to="localePath('/')">
          <button type="button " class="main_btn reset_pass" @click="isSuccessApplied = false">{{
            $t('login.return_to_home') }}</button>
        </nuxt-link>

      </div>

    </div>

  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      isSuccessApplied: false,
      main_modal: "main_modal"
    };
  },
  methods: {
    onModalHidden() {
      // Emit an event when the modal is closed
      this.$emit('modal-closed');
    }
  }
};
</script>
