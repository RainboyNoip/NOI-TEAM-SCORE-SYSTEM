<template>
  <div class="list" style="margin:30px;">
    <tabcard></tabcard>
    <div class="option">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import clientSocket from '../services/index2.js'
import selectYear from '../components/selectYear.vue'
import tabcard from '../components/tabCard.vue'

export default {
  data () {
    return {
      userSocket:null
    }
  },
  mounted(){
    let ret = clientSocket()
    this.userSocket =  ret.userCon;
    this.$store.state.userSocket = ret.userCon;
  },
  methods:{
  },
  components:{
    tabcard
  }
}
</script>

<style>
.option {
  padding:20px;
  text-align:justify;

}
.option .ivu-input-group {
  top:0px;
}
.option .item {
  display:inline-block;
  vertical-align:top;
  margin-left:10px;
}
.list h1 {
  margin-top:50px;
  margin-bottom:20px;
  text-align:center;
  font-size:30px;
  color: #ddd;
  letter-spacing: 0;
  text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135 
}
</style>
