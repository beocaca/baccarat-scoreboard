<template>
  <div class="h-full w-full">
    <div class="container-page">
      <div class="p-5 pt-10 flex justify-center ">
        <div class="container-table pb-4">
          <SpecialTable></SpecialTable>
        </div>
      </div>
      <div class="p-5 flex justify-center">
        <div class="container-table pb-4">
        <BasicTable></BasicTable>
        </div>
        <div class="ml-8"
             style="width: 21rem;">
          <InfoTable></InfoTable>
        </div>
      </div>
      <ControlScores></ControlScores>
    </div>
  </div>
</template>

<script setup>
import SpecialTable from '../components/SpecialTable'
import BasicTable from '../components/BasicTable'
import InfoTable from '../components/InfoTable'
import ControlScores from '../components/ControlScores'

document.title = 'Baccarat scoreboards';

</script>

<style scoped>

</style>