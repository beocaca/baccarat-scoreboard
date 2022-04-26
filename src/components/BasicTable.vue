<template>
  <div>
    <table>
      <tr v-for="(row, rowIndex) in state.rowsBasic"
          class="flex"
          :key="rowIndex">
        <td
            class="w-10 h-10 flex items-center justify-center"
            v-for="(column, columnIndex) in row"
            :key="columnIndex"
        >
          <div class="w-9 h-9 rounded flex items-center justify-center bg-neutral-300">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-white"
                 :class="{'bg-blue-700':column === '2',
                 'bg-green-700':column === '3',
                 'bg-red-700':column === '1'}">
              {{ column === 0 ? '' : column }}
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>

</template>

<script setup>
import {onMounted} from "vue";
import {useScoresStorePin} from "@/store/scores";
import {storeToRefs} from "pinia/dist/pinia";

const useScoresStore = useScoresStorePin()
const {state} = storeToRefs(useScoresStore)

onMounted(() => {
  useScoresStore.initRowsBasic()
  useScoresStore.initDataBasic()
})
</script>

<style scoped>

</style>