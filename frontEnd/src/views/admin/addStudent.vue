<template>
  <div class="addstudent">
    <h1> 增加学生 </h1>
    <br>
    <br>

    <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend">
      <div class="ivu-input-group-prepend" style="">
        <span>姓名</span></div>
      <i class="ivu-icon ivu-icon-load-c ivu-load-loop ivu-input-icon ivu-input-icon-validate"></i>
      <input-tag :tags="name"></input-tag>
    </div>

    <br>
    <br>
    <Row>
      <Col span="12">

      <Input v-model="score" number size="large" style="width:200px">
        <span slot="prepend">初始积分</span>
      </Input>

      </Col>

      <Col span="12">

    <DatePicker type="year" placeholder="学生的参加年份" v-model="year" style="width: 200px;padding-left:20px" size="large"></DatePicker>
      </Col>
    </Row>
    <br>
    <br>
    <Button type="info" long @click="addstudent">添加</Button>


  </div>
</template>

<script>
import InputTag from 'vue-input-tag'
export default {
  data(){
    return {
      name:[],
      score:3,
      year:null,
      realYear:0,
    }
  },
  mounted(){
    this.year = new Date()
  },
  components:{
    InputTag
  },
  methods:{
    addstudent(){
      if( this.name.length == 0){
        this.$Message.error('姓名列表为空!');
        return 
      }
      let submit_data = {
        score:this.score,
        name:this.name,
        year: this.year.getFullYear()
      }
      //console.log(this.$store.state.adminSocket)
      this.$store.state.adminSocket.emit('ADD_STUDENT',submit_data)
    }
  }
}
</script>
