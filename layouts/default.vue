<template>
  <client-only>
    <div>
      <LazyLayoutsNavbar />
      <Nuxt />
      <LazyLayoutsFooter />
    </div>
  </client-only>
</template>

<script>
  export default {
    name: "default",
  };
</script>

<style lang="scss" scoped></style>
