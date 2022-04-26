<template>
  <div class="h-full w-full flex items-center justify-center">
    <div class="container-page">
      <div x-show="cookies red"
           class=" rounded-lg bg-white shadow-2xl w-full  max-w-[450px] overflow-hidden"
           x-transition:enter="transition ease-in duration-200"
           x-transition:enter-start="opacity-0 transform -translate-x-40"
           x-transition:enter-end="opacity-100 transform translate-x-0"
           x-transition:leave="transition ease-in duration-200"
           x-transition:leave-start="opacity-100 transform translate-x-0"
           x-transition:leave-end="opacity-0 transform -translate-x-40">

        <!-- Text -->
        <div class="relative overflow-hidden px-8 pt-8">
          <div width="80"
               height="77"
               class="absolute -top-10 -right-10 text-yellow-500">
            <svg width="120"
                 height="119"
                 viewBox="0 0 120 119"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.3"
                    d="M6.38128 49.1539C3.20326 32.893 13.809 17.1346 30.0699 13.9566L70.3846 6.07751C86.6455 2.89948 102.404 13.5052 105.582 29.7661L113.461 70.0808C116.639 86.3417 106.033 102.1 89.7724 105.278L49.4577 113.157C33.1968 116.335 17.4384 105.729 14.2604 89.4686L6.38128 49.1539Z"
                    fill="currentColor"></path>
            </svg>
          </div>
          <div class="text-2xl flex flex-col pb-4">
            <span class="text-3xl font-bold">Baccarat scoreboards !</span>
          </div>
          <div class="pb-4">
            <div class="text-xl ">Baccarat scoreboards view project using: Vuejs3, VueRouter, Pinia, Tailwind CSS, E2E
              Playwright
              test.
            </div>
          </div>
        </div>
        <div class="w-full flex justify-center items-center border-t border-solid border-gray-200">
          <div class="flex p-3 items-center justify-center">
            <router-link
                :to="'/score-board'"
                class="px-6 py-3 text-sm font-semibold text-blue-800 bg-blue-100 rounded-lg"
            >Go to scoreboards
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
document.title = 'Home';
</script>

<style>
.red {
  border: solid red 1px;
}
</style>