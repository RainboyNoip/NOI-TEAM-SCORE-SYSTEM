<template>
  <div>
    <h1>年/级</h1>
    <CheckboxGroup v-model="selectYear">
      <template v-for="year in ylist">
        <Checkbox :label="year">
          <Icon type="calendar"></Icon>
          <span>{{year}}</span>
        </Checkbox>
      </template>
    </CheckboxGroup>
    <h1>学生列表</h1>
    <CheckboxGroup v-model="selectStudent">
      <template v-for="stu in Students">
        <Checkbox :label="stu">
          <Icon type="person"></Icon>
          <span>{{stu}}</span>
        </Checkbox>
      </template>
    </CheckboxGroup>
    <h1>选中的学生</h1>
    <Tag checkable color="green" v-for="stu in selectStudent">{{ stu}}</Tag>
   
    <h1>具体的操作</h1>
    <h2>分值</h2>
      <InputNumber v-model="score" :precision="2"></InputNumber>
    <h2>原因</h2>
      <Input v-model="content" placeholder="输入原因" style="width: 300px"></Input>
    <h2>其它</h2>
    <Checkbox v-model="retired">是否退役</Checkbox>
    <br>
    <br>
    <br>
    <h1> 提交 </h1>
    <Button @click="submit" long type="info">提交</Button>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      selectYear:[],
      selectStudent:[],
      score:0,
      content:'',
      retired:false
    }
  },
  mounted(){
  },
  methods:{
    getYlist(){
      let self = this
      let yset =  new Set()
      for(let i;i<self.slist.length;i++)
        yset.add(self.slist[i].year)
      yset.forEach(e=>self.ylist.push(e))
    },
    submit(){
      let self = this
      console.log('go')
      if(self.retired){
        self.$store.state.adminSocket.emit('SET_STUDENT',{
          name:self.selectStudent,
          retired:self.retired
        })
      }
      else{
        self.$store.state.adminSocket.emit('ADDSCORE',{
          name:self.selectStudent,
          score:self.score
        })
      }
    }
  },
  computed:{
    ...mapGetters(['studentList','ylist']),
    Students(){
      let list = []
      let set = new Set(this.selectYear)
      this.studentList.forEach((e)=>{
        if(set.has(e.year))
          list.push(e._id)
      })
      return list
    }
  }
}
</script>

<style>

</style>
