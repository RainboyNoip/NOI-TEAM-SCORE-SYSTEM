<template>
  <Menu mode="horizontal" theme="dark" active-name="1">
    <div class="layout-logo" @click="goIndex">
      <Icon type="calculator"></Icon>
      SCYZ-NOI-TEAM 积分表
    </div>
    <div class="layout-nav">
      <MenuItem name="1">
      <Icon type="ios-information"></Icon>
      关于
      </MenuItem>
    </div>
  </Menu>
</template>

<script>
export default {
  data(){
    return {}
  },
  methods:{
    goIndex(){
      this.$router.push({path:'/'})
    }
  }
}
</script>

<style>
.layout-logo{
  cursor:pointer;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  left: 20px;
  font-weight:bolder;
  font-size:20px;
  color:#fff;
  padding:0 20px;
}

.layout-logo:hover {
  background:#797F8E;
  color:#00fdd1;
}

.layout-nav{
  float:right;
  right:20px;
}
</style>
