<template>
  <div>
    <div class="content">

      <p>{{ $t('pages.page_not_found') }}</p>

      <nuxt-link :to="localePath('/')">
        <button class="main--btn">{{ $t('login.return_to_home') }}</button>
      </nuxt-link>

      <div class="image">
        <img src="@/assets/images/error.png" title="error" alt="error image" width="100" height="100" />
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'errorPage',

  layout: 'auth-layout',

  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/Global/helpers/variables.scss';

.content {

  text-align: center;

  button {
    margin: auto;
    max-width: 200px;
    transition: 0.5s;
    border-radius: 8px;
    background: $mainColor;
    border: 1px solid transparent;

    &:hover {
      color: $mainColor ;
      background: #FFF;
      border: 1px solid $mainColor
    }
  }

  p {
    font-size: 32px;
    padding-bottom: 20px;
  }

  .image {
    margin-top: 50px;
    margin-bottom: 100px;
    margin: 50px 30px 100px;
    // height: 470px;
    width: auto;

    img {
      width: 100%;
      max-width: 50%;
      height: 100%;
      object-fit: contain
    }
  }

}

@media(max-width:991px) {
  .content {
    margin-top: 100px;

    .image {

      img {
        max-width: 100%;
      }
    }
  }
}

@media(max-width:575px) {
  .content {

    h1 {
      margin-top: 30px;
      font-size: 30px;

    }

    p {
      font-size: 20px;
    }

    .image {
      // height: 55vh;
      margin-top: 50px;
      margin-bottom: 20px;

      img {}
    }
  }
}
</style>
