<template>
  <div class="layout">
    <router-view name="background"></router-view>
    <Row type="flex">
      <Col span="5" class="layout-menu-left">
      <slide-menu></slide-menu>
      </Col>
      <Col span="19">
      <div class="layout-content">
        <div class="layout-content-main">
          <router-view>
          </router-view>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import slideMenu from './slideMenu.vue'
import socket from '../../services/index2.js'
export default {
  data(){
    return {
      AdminSocket:null,
      UserSocket:null
    }
  },
  components:{
    slideMenu
  },
  mounted(){
    //连接server
    let ret = socket('admin')
    this.AdminSocket = ret.adminCon;
    this.UserSocket=   ret.userCon;

    //处理返回信息
    this.AdminSocket.on('ADMIN_RESPONE',this.deal_respone)

    ret.adminCon.on('ADMIN_RESPONE',function(res){
      console.log(res)
    })

    this.$store.state.adminSocket = ret.adminCon;
    this.$store.state.userSocket = ret.userCon;
  },
  beforeDestroy(){
    //断开连接
  },
  methods:{
    deal_respone(data){ // 处理socket返回的信息
      let self  = this
      if( data.status == 0){
        self.$Notice.info({
          title:'消息',
          desc:data.message
        })
      }
      else {
        self.$Notice.info({
          title:'失败',
          desc:data.message
        })
      }
    }
  }
}
</script>


<style>
.layout{
  position:relative;
  background: #f5f7f9;
  position: relative;
  height:100%;
}
.layout-breadcrumb{
  padding: 10px 15px 0;
}
.layout-content{
  height:100%;
  margin:0;
  background: #fff;
  border-radius: 4px;
  overflow-y:scroll;
}
.layout-content-main{
  padding: 10px;
}
.layout-copy{
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left{
  background: #464c5b;
}
.layout-header{
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout >div.ivu-row-flex {
  height:100%;
}
</style>
