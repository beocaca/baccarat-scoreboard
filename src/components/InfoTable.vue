<template>
  <div>
    <div v-for="(item,ind) in Object.values(state.infoType)"
         :key="ind"
         :data-test="'title-'+item.title"
         class="bg-neutral-300 font-bold flex items-center p-1 px-3 rounded justify-between mb-1">
      <div class="flex items-center">
        <div class="w-8 rounded-full h-8"
             :class="item.colorClass"></div>
        <div class="ml-3"> {{ item.title }}</div>
      </div>
      <div class="title">
        {{ getTotal(item.value) }}
      </div>
    </div>
    <div data-test="title-TOTAL"
         class="bg-neutral-300 font-bold flex items-center p-1 px-3 rounded justify-between mb-1">
      <div class="flex  items-center">
        <div class="w-8 rounded-full h-8"></div>
        <div class="ml-3 text-fuchsia-600"> GAME NUMBER</div>
      </div>
      <div class="text-fuchsia-700 title">
        {{ state.inputSample.length }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {useScores} from "@/store/scores";
import {storeToRefs} from 'pinia'

const useScoresStore = useScores()
const {state} = storeToRefs(useScoresStore)

let getTotal = (_value) => {
  return (state.value.inputSample || []).filter(e => e === _value).length
}

</script>

<style scoped>

</style>