<template>
  <div id="app">
    <router-view name="login"></router-view>
    <router-view name="admin"></router-view>
    <div  :style="{display:islogin}">
      <mheader></mheader>
      <div class="layout-breadcrumb">
      </div>
      <div class="layout-content">
        <router-view></router-view>
      </div>
      <mfooter></mfooter>
    </div>
  </div>
</template>

<script>
import mheader from './components/header.vue'
import mfooter from './components/footer.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    mheader,
    mfooter
  },
  computed:{
    islogin(){
      return (this.$route.name === 'Login' ||this.$route.name === 'Admin' ||
        this.$route.matched[0].path === '/admin'
      ) ? 'none':'block';
    }
  }
}
</script>

<style>
html,body,#app {
  height:100%;
  width:100%;
}
.layout-assistant{
  width: 300px;
  margin: 0 auto;
  height: inherit;
}
.layout-breadcrumb{
  margin:15px auto;
  padding: 10px 15px 0;
  //background:#fff;
  //border:1px solid #eee;
}
.layout-content{
  min-height: 500px;
  max-width:1024px;
  margin: 0 auto;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
  border:1px solid #eee;
}
.layout-content-main{
  padding: 10px;
}
body {
  background: url('./assets/bk.png');
  background-image: url('./assets/bk.png');
  background-position-x: initial;
  background-position-y: initial;
  background-size: initial;
  background-repeat-x: initial;
  background-repeat-y: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: initial;
}
</style>
