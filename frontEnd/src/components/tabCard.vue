<template>
  <div>
    <Tabs type="card" @on-click="goto" v-model="active" >
      <TabPane label="学生列表"></TabPane>
      <TabPane label="历史记录"></TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  data(){
    return {
      active:0,
      routeMap:{
        0:'List',
        1:'listhistory'
      }
    }
  },
  methods:{
    goto(name){
      this.active = name
      this.$router.push({name: this.routeMap[name]})
    }
  }
}
</script>
