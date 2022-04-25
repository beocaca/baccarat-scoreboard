<template>
  <div class="flex justify-center">
    {{state}}
    <button type="button"
            v-for="(item,index) in _arr"
            @click="useScoresStore.addType(item.value)"
            :class="item.colorClass"
            class="focus:outline-none text-white
              hover:bg-red-00 focus:ring-4 focus:ring-neutral-300
             font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
      {{ item.tittle }} WIN
    </button>
    <button @click="useScoresStore.resetScores"
            type="button"
            class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
      Reset
    </button>
  </div>
</template>

<script setup>
import {useScoresStorePin} from "@/store/scores";
import {storeToRefs} from "pinia/dist/pinia";

const useScoresStore = useScoresStorePin()
const {state} = storeToRefs(useScoresStore)
let _arr = [
  {
    colorClass: 'bg-red-600',
    tittle: 'BANKER',
    value: '1'
  },
  {
    colorClass: 'bg-blue-700',
    tittle: 'PLAYER',
    value: '2'
  }, {
    colorClass: 'bg-green-700',
    tittle: 'TIE',
    value: '3'
  }
]

</script>

<style scoped>

</style>