<template>
  <div class="h-full w-full flex items-center justify-center">
    <div class="container-page">
      <div class="text-xl ">Baccarat scoreboard views project using: Vuejs3, VueRouter, Pinia, E2E Playwright test</div>
      <div class="flex p-3 items-center justify-center">
        <router-link
            :to="'/score-board'"
            class="px-6 py-3 text-sm font-semibold text-blue-800 bg-blue-100 rounded-lg"
        >Go to Test page
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
document.title = 'Home';
</script>

<style>
</style>