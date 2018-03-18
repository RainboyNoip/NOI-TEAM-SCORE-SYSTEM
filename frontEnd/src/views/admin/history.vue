<template>
  <div>
    <Timeline>
      <TimelineItem v-for="item in history">
        <p class="time">{{item.time | formatDate}}</p>
        <p class="content">
           <Tag checkable color="green">{{item.name}}:</Tag>{{item.content}}</p>
        <p class="content">
           <Tag checkable color="blue">分值:</Tag> {{item.score}}</p>
      </TimelineItem>
    </Timeline>
  </div>
</template>

<script>

import tabcard from '../../components/tabCard.vue'
export default {
  data(){
    return {
    }

  },
  components:{
    tabcard
  },
  computed:{
    history(){
      return this.$store.getters.history
    }
  },
  filters:{
    formatDate(time) {
      let date = new Date(time)
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    }
  }
}
</script>
