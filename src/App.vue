<template>
  <Layout>
    <router-view></router-view>
  </Layout>
</template>

<script setup>

import Layout from './layouts/default.vue'

</script>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
.container-page {
  max-width: 1200px;
  margin: 0 auto;
}

.container-table {
  max-width: 720px;
  overflow: scroll;
}

</style>
