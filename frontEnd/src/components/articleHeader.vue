<template>
  <div class="article-header">
    <h1>{{title}}</h1>

    <div class="info">
      <div>
        标签:
        <u class="article-tags" >
          <li v-for="tag in tags">
            <Tag color="green">{{tag}}</Tag>
          </li>
        </u>
      </div>

      <div class="vis">
        访问数量: <Tag> {{visited}} </Tag>
      </div>
      <div class="vis">
        作者: <Tag> {{author}} </Tag>
      </div>

    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
    title:String,
    tags:Array,
    visited:Number,
    author:String
  }
}
</script>

<style>

.article-header {
  margin:20px auto;
  text-align:center;
}
.article-header h1 {
  font-size:40px;
}

.article-header .article-tags{
  list-style-type:none;
}


.article-tags li {
  display:inline-block;
  margin:auto 5px ;
}

.info {
  font-size:18px;
  line-height:25px;
  height:25px;
  display:inline-block;
}
.info div {
  display:inline-block;
}

.info .vis {
  margin-left:40px;
}


</style>
