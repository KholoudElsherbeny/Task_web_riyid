<template>
  <div class="breadcrumb_component">
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script>

export default {
  name: "BreadCrumbComponent",

  props: {
    title: {
      type: String,
      required: true
    }
  }

}
</script>

<style lang="scss" scoped></style>
