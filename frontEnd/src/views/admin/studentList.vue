<template>
  <div class="studentList">
    <h1 style="text-align:center"> 学生列表 </h1>

    <h1>年/级</h1>
    <select-year v-model="$store.state._syear" :ylist="ylist">
    </select-year>
    <br>
    <h1>列表</h1>
    <Table 
      :data="studentlist"
      :columns="columns"
      :showHeader="true"
      border
      ></Table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import selectYear from '../../components/selectYear.vue'
import tabcard from '../../components/tabCard.vue'
export default {
  data(){
    return {
      syear:[],
      columns:[ {
        title:'姓名',
        key:'_id',
        width:150
      },
      {
        title:'年/级',
        key:'year',
        width:150,
      },
      {
        title:'积分',
        key:'score',
        width:150
      },
        {
          title:'是否退役',
          key:'retired',
          width:150

        }
        ,{
          title:'操作',
        }
      ]
    }
  },
  components:{
    selectYear,
    tabcard
  },
  mounted(){
    let self  = this
  },
  methods:{
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

<style>
</style>
