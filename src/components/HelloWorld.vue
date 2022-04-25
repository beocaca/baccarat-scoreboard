<template>
  <div class="p-5">
    <div v-for="(a,ind) in matrix"
         class="flex red"
         :key="ind">
      <div v-for="(aaa,ind) in a"
           class="red w-10 text-white h-10 flex items-center justify-center"
           :class="{'bg-blue-700':aaa === '2',
                 'bg-green-700':aaa === '3',
                 'bg-red-600':aaa === '1'}"
           :key="ind">
        {{ aaa }}
      </div>
    </div>
    <button @click="run"> CLICK</button>
    rows{{ rows }} columnIndex{{ columnIndex }} rowsIndex{{ rowsIndex }} round{{ round }}

    <div class="p-10">
      <div class="relative">
        <div :key="a"
             class="flex"
             v-for="a in 6">
          <div
              class="red h-10 w-10 overflow-hidden bg-amber-50"
              v-for="i in 18"
              :key="i">
          </div>
        </div>
        <div class="top-0 absolute left-0 flex flex-col flex-wrap h-60">
          <div v-for="item in aaa"
               class="h-10 w-10 "
               :key="item">
            <div class="m-1 font-bold  text-sm rounded-full w-8 h-8 flex items-center justify-center"
                 :class="{'bg-blue-700':item === 'PLAYER',
                 'bg-green-700':item === 'TIE',
                 'bg-red-600':item === 'BANKER'}">
              {{ item.split('')[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
//1: banker \\\\ 2: player
let aaa = [
  "1",
  "2",
  "2",
  "1",
  "2",
  "1",
  "1",
  "1",
  "2",
  "2",
  "2",
  "2",
  "2",
  "2",
  "2",
  "1",
  "1",
  "2",
  "2",
  "2",
  "2",
  "2",
  "2",
  "2",
  "2",
  "2",
  "2",
  "1",
  "1",
  "2",
  "1",
  "2",
  "1",
  "1",
  "2",
  "1",
  "2",
]
const chunkSize = 6;
let _arrArr = ref([])

for (let i = 0; i < aaa.length; i += chunkSize) {
  const chunk = aaa.slice(i, i + chunkSize);
  _arrArr.value.push(chunk)
}

let matrix = ref([]);
let rows = ref(6)
let rowsIndex = ref(0)
let columnIndex = ref(0);
let round = ref(0);
let columns = 30

for (let i = 0; i < rows.value; i++) {
  matrix.value[i] = [];
  for (let j = 0; j < columns; j++) {
    matrix.value[i][j] = _arrArr.value[j]?.[i]
    // matrix.value[i][j] = i + '' + j
  }
}

// isPlay = false
// gia tri luu lai: rowIndex : 0 , columnIndex : 0
// create rows and columns
// rows = 6
// columns = 500

// play game
// round steps ex: round 6 value: 1
// check value current round and pre-round
// ===: rowIndex += 1 , columnIndex = preColumnIndex
// >>> if rowIndex === 6 , coloumnIndex = columnIndex +1
// >>> else {
//>>> if value of columnIndex === value of columnIndex - 1
// >>>  coloumnIndex = columnIndex +1
// >>>
// }
// !==: rowIndex = 0 , columnIndex = rows[0].length -1
//
//
// if pre-round is 1 => rows[][indexPreRound]

</script>
<style lang="scss">

.red {
  border: solid red 1px
}
</style>