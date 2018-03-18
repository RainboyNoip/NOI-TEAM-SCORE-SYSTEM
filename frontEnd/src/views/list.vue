<template>
  <div >
    <h2>选择年份</h2>
    <select-year v-model="$store.state._syear" :ylist="ylist">
    </select-year>
    <br>
    <br>
    <h2>列表</h2>
    <Table 
      :data="studentlist"
      :columns="columns"
      :showHeader="true"
      border
      ></Table>
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
      userSocket:null,
      columns:[ {
        title:'姓名',
        key:'_id',
      },
      {
        title:'年/级',
        key:'year',
      },
      {
        title:'积分',
        key:'score',
      },
        {
          title:'是否退役',
          key:'retired',
        }
      ]
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
    tabcard,
    selectYear,
  },
  computed:{
    slist(){
      return this.$store.getters.studentList;
    },
    ylist() {
      return this.$store.getters.ylist;
    },
    studentlist(){
      let data = []
      let self = this
      this.slist.forEach((e)=>{
        if( self.$store.state._syear.indexOf(e.year) > -1)
          data.push(e)
      })

      return data
    }
  }
}
</script>


