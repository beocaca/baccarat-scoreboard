<template>
  <div>
    <div v-for="(item,ind) in _arr"
         :key="ind"
         class="bg-neutral-300 font-bold flex items-center p-1 px-3 rounded justify-between mb-1">
      <div class="flex items-center">
        <div class="w-8 rounded-full h-8"
             :class="item.colorClass"></div>
        <div class="ml-3"> {{ item.tittle }}</div>
      </div>
      <div class="">
        {{ getTotal(item.value) }}
      </div>
    </div>
    <div class="bg-neutral-300 font-bold flex items-center p-1 px-3 rounded justify-between mb-1">
      <div class="flex  items-center">
        <div class="w-8 rounded-full h-8"></div>
        <div class="ml-3 text-fuchsia-600"> GAME NUMBER</div>
      </div>
      <div class="text-fuchsia-700">
        {{ state.inputSample.length }}
      </div>
    </div>
  </div>
</template>

<script setup>
import {useScoresStorePin} from "@/store/scores";
import {storeToRefs} from 'pinia'
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
let getTotal = (_value) => {
  return (state.value.inputSample || []).filter(e => e === _value).length
}

</script>

<style scoped>

</style>