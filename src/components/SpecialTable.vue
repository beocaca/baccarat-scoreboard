<template>
  <table>
    <tr v-for="(row, rowIndex) in state.rows"
        class="flex"
        :key="rowIndex">
      <td
          class="w-10 h-10 flex items-center justify-center"
          v-for="(column, columnIndex) in row"
          :key="columnIndex"
      >
        <div class="w-9 h-9 rounded flex items-center justify-center bg-neutral-300">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-white"
               :class="{
                 'border-green-cell':column === state.infoType.tie.value,
                 'border-blue-cell':column === state.infoType.player.value,
                 'border-red-cell':column === state.infoType.banker.value}"
          >
          </div>
        </div>
      </td>
    </tr>
  </table>
</template>

<script setup>

import {useScores,} from "@/store/scores";
import {storeToRefs} from "pinia/dist/pinia";
import {onMounted} from "vue";

const useScoresStore = useScores()
const {state} = storeToRefs(useScoresStore)

onMounted(() => {
  useScoresStore.initRows()
  useScoresStore.initData()
})

</script>

<style>
:root {
  --bordercell-color-width: 3px;
}

.border-red-cell {
  border: solid var(--bordercell-color-width);
  @apply border-red-600
}

.border-blue-cell {
  border: solid var(--bordercell-color-width);
  @apply border-blue-700
}

.border-green-cell {
  border: solid var(--bordercell-color-width);
  @apply border-green-700
}
</style>