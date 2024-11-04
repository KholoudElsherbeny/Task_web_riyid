<template>
  <b-modal v-model="isOpen" @hidden="onModalHidden" @click.native="closeModalOnOutsideClick" :no-close-on-backdrop="false"
    :dialog-class="main_modal" :hide-footer="true">

    <div class="content_modal">
      <slot></slot>
    </div>

  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
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
