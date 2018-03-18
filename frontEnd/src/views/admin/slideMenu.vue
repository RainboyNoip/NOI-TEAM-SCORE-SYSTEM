<template>
  <div>
    <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']" @on-select="onSelect">

      <div class="layout-logo-left">
        <Checkbox v-model="adminConnected" disabled>admin连接</Checkbox>
        <Checkbox v-model="userConnected" disabled>user连接</Checkbox>
      </div>

      <MenuGroup title="学生管理">
        <MenuItem name="1">
        <Icon type="document-text"></Icon>
        学生列表
        </MenuItem>
        <MenuItem name="2">
        <Icon type="chatbubbles"></Icon>
        历史记录
        </MenuItem>
        <MenuItem name="3">
        <Icon type="chatbubbles"></Icon>
        增加学生
        </MenuItem>
      </MenuGroup>
      <MenuGroup title="积分管理">
        <MenuItem name="4">
        <Icon type="document-text"></Icon>
        设定积分
        </MenuItem>
      </MenuGroup>

    </Menu>
  </div>
</template>

<script>
import { mapGetters,mapState } from 'vuex'
export default {
  name: 'header',
  data () {
    return {
      routeMap:{
        '1':'studentlist',
        '2':'history',
        '3':'addstudent',
        '4':'setScore'
      }
    }
  },
  computed: mapState([
    'adminConnected',
    'userConnected'
  ]),
  methods:{
    onSelect(name){
      let self  = this
      if( name in this.routeMap){
        console.log(name)
        this.$router.push({name: this.routeMap[name]})
      }
      else
        this.$router.push({name:'404'})
      //this.$router.push({name:name})
    }
  }
}
</script>

<style>
.layout-logo-left{
  width: 90%;
  height: 60px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
  padding-top:5px;
  padding-left:15px;
  color:#eee;
}
</style>
