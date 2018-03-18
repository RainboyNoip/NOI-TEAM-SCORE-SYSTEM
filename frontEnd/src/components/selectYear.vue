<template>
  <div>
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
        <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选</Checkbox>
    </div>
    <CheckboxGroup v-model="selectYear">
      <template v-for="year in ylist">
        <Checkbox :label="year" :value="true">
          <Icon type="calendar"></Icon>
          <span>{{year}}</span>
        </Checkbox>
      </template>
    </CheckboxGroup>
  </div>
</template>

<script>
export default {
  data(){
    return {
      selectYear:[],
      checkAll:false,
      indeterminate: true,
    }
  },
  props:['value','ylist'],
  mounted(){
    this.selectYear = this.value
  },
  watch:{
    ylist(){
      this.selectYear = this.ylist
      this.$emit("input",this.selectYear)
    },
    selectYear(){
      this.$emit("input",this.selectYear)
    }
  }
}
</script>
