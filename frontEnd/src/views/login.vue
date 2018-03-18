<template>
  <div class="login-background" v-show="isShow">
    <div class="login-panel">
    <h1> Student Score System Admin </h1>
    <br>
    <div style="max-width:300px;">
    <Input v-model="login.username" >
        <span slot="prepend">用户名</span>
    </Input>
    <br>
    <Input v-model="login.secret" type="password">
        <span slot="prepend">密码</span>
    </Input>
    </div>
    <br>
    <Button type="info" @click="submit">登录</Button>
    </div>
  </div>
</template>

<script>
import api from '../services/login.js'
//var md5 = require('md5')
import md5 from 'js-md5';
export default {

  data(){
    return {
      login:{
        username:'',
        secret:''
      }
    }
  },
  created(){
  },
  methods:{
    submit(){
      let self = this
      let data = {}
      data.username = self.login.username
      data.secret = self.login.secret
      if( data.username.length !=0 && data.secret.length !=0){
        data.secret = md5(data.secret)

        api.login(data).then((res)=>{
          console.log(res)
          if(res.status != 0 ){
            alert(res.message)
            return
          }
          return self.$store.dispatch('updateAdminToken',res.token)
            .then( ()=>{
              if( self.$store.getters.isLogin)
                self.$router.push("/admin")
            })

        })
      }
      else{
        alert("密码或用户名不能为空!")
      }
    }
  },
  computed:{
    isShow(){
      return !this.$store.getters.islogined
    }
  }
}
</script>

<style>
.login-background {
  position:absolute !important;
  top:0;
  left:0;
  display:flex;
  height:100%;
  width:100%;
  background:linear-gradient(to bottom, blue, steelblue);
  z-index:9999;
  position:absolute;
  justify-content: center;
  align-items: center;
}
.login-panel{
  margin:0;
  text-align:center;
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
}

.login-panel > h1 {
  color:#eee;
  font-size:5em;
}
</style>
