<template>
  <div class="bg-fuchsia-900 h-screen">
    <div class="container-page">
      <div class="p-5 flex justify-center">
        <SpecialTable></SpecialTable>
      </div>
      <div class="p-5 flex justify-center">
        <BasicTable></BasicTable>
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
import SpecialTable from './components/SpecialTable'
import BasicTable from './components/BasicTable'
import InfoTable from './components/InfoTable'
import ControlScores from './components/ControlScores'
</script>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;
.container-page {
  margin: 0 auto;
}

</style>
