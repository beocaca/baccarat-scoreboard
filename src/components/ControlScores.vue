<template>
  <div class="flex justify-center">
    <button type="button"
            :data-test="'btn-'+item.title"
            v-for="(item,index) in Object.values(state.infoType)"
            @click="useScoresStore.addScoreInput(item.value)"
            :class="item.colorClass"
            class="focus:outline-none text-white
              hover:bg-red-00 focus:ring-2 focus:ring-neutral-300
             font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
      {{ item.title }} WIN
    </button>
    <button @click="useScoresStore.resetScores"
            type="button"
            class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200
            hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-200">
      Reset
    </button>
  </div>
</template>

<script setup>
import {useScores} from "@/store/scores";
import {storeToRefs} from "pinia/dist/pinia";

const useScoresStore = useScores()
const {state} = storeToRefs(useScoresStore)
</script>

<style scoped>

</style>