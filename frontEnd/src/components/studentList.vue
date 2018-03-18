<template>
  <div>
    <Table 
      :loading="loading"
      :columns="columns" 
      :data="data"
      border="border" 
      :stripe="stripe"
      :showHeader="showHeader"
      :highlightRow="highlightRow"
      ></Table>
  <div>
</template>

<script>
export default {
  data(){
  }
}
</script>

<style>

</style>
