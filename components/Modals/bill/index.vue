<template>
  <b-modal v-model="isOpen" @hidden="onModalHidden" @click.native="closeModalOnOutsideClick"
    :no-close-on-backdrop="false" size="lg" :dialog-class="main_modal" :hide-footer="true">

    <div class="bill_content">
      <div class="row">
        <div class="col-lg-6 col-12">
          <div class="image">
            <p v-html="invoice.qrcode"></p>
            <!-- <img src="@/assets/images/qr.png" alt="bill" width="" height="" /> -->
          </div>
          <div class="logo">
            <img src="@/assets/images/logo-1.png" alt="bill" width="" height="" />
          </div>
        </div>
        <div class="col-lg-6 col-12">
          <div class="bill_info">
            <ul>
              <li>
                <span>{{ $t('pages.serial_number') }} :</span>
                <span class="num">{{ invoice.id }}</span>
              </li>
              <li>
                <span>{{ $t('pages.invoice_issue_date') }} :</span>
                <span class="num">{{ invoice.created_at }}</span>
              </li>
              <li>
                <span>{{ $t('pages.trainer') }} :</span>
                <span class="num">{{ invoice.coach?.name }}</span>
              </li>
              <li>
                <span>{{ $t('pages.trainee') }} :</span>
                <span class="num">233</span>
              </li>
              <li>
                <span>{{ $t('pages.program') }} :</span>
                <span class="num">{{ invoice.program?.name }}</span>
              </li>
              <li>
                <span>{{ $t('pages.program_price') }} :</span>
                <span class="num price_num">{{ invoice.program?.price }} {{ $t('pages.r_s') }}</span>
              </li>
              <li>
                <span>{{ $t('pages.value_added_tax') }} :</span>
                <span class="num price_num">{{ invoice.tax }} {{ $t('pages.r_s') }}</span>
              </li>
              <li>
                <span>{{ $t('pages.total_paid') }} :</span>
                <span class="num price_num">{{ invoice.total }} {{ $t('pages.r_s') }}</span>
              </li>
            </ul>
          </div>

          <button class="main_btn" @click="printBill">
            {{ $t('pages.pdf') }}
          </button>
        </div>
      </div>
    </div>

  </b-modal>
</template>

<script>
export default {

  props: {
    invoice: { type: Object, default: {} }
  },

  data() {
    return {
      isOpen: false,
      // main_modal:
      main_modal: ["bill_modal", "main_modal"]
    };
  },
  methods: {
    onModalHidden() {
      // Emit an event when the modal is closed
      this.$emit('modal-closed');
    },

    printBill() {
      window.print()
    }
  }
};
</script>
