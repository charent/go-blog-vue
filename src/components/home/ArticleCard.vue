<template>
  <template v-for="item in articles" :key="item.ArticleId">
    <el-row>
      <el-col :span="24">
        <el-card class="article-tiny" :path="item.ArticleId" @click="handleCardClick(item.ArticleId)">
            <template #header>
              <el-row>
                <el-col :span="20">
                  <div class="article-header">
                    <el-link type="primary"> <span>{{  item.Title }}</span></el-link>
                  </div>
                </el-col>
                <el-col :span="4" class='publish-time'>
                  <span>{{ item.PublishTime }}</span>
                </el-col>
              </el-row>
            </template>
            <div class="article-abstract">
                {{item.Abstract}}
            </div>
        
        </el-card>
      </el-col>
    </el-row>
  </template>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import { ElMessage } from "element-plus";
import router from '@/router/index'

export default defineComponent({

  // 当APP被挂载之后，自动执行该函数更新首页
   mounted() {
    this.$nextTick(function () {
      // 仅在整个视图都被渲染之后才会运行的代码

       let data = this.$axios.get('api/home/articles')
        .then(
          
          // 这里必须使用箭头函数，否则this=undefined
          (response) => {
              if (response.data.code == 200){
                 this.articles = response.data.articles
                
              }else{
                ElMessage.error("连接服务器错误..")
              }
          }
        )
        .catch(function(err){
          ElMessage.error("网络或者服务器返回数据错误")
          console.log(err);
        });

    })
  },


  setup: (props, context) => {
    
    let data = reactive({
        articles: []
    })

    data.articles = [
       {
              "ArticleId": 1,
              "Title": "这是标题2",
              "Abstract": "这是摘要1",
              "PublishTime": "0",
              "Visited": 0
          },
          {
              "ArticleId": 2,
              "Title": "这是标题3",
              "Abstract": "这是摘要1",
              "PublishTime": "0",
              "Visited": 0
          },
    ]

    const handleCardClick = (path) => {
       path = '/article/' + path
        let routerUrl = router.resolve({
          path: path
        })

        window.open(routerUrl.href, '_blank')
    }

    return {
      ...toRefs(data),
      handleCardClick,
    }
    
  }


  
})

</script>

<style scoped>

.article-tiny {
    height: 180px;
    margin-top: 10px;
}

.article-tiny:hover {
    background-color:rgb(250, 250, 250);
    box-shadow: 8px 2px 8px rgba(0, 0, 0, 0.5);
    
}
.publish-time {
  font-size: 12px;
  text-align: right;
  color: rgb(31, 129, 52);
}
.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-abstract {
    text-align: left;
    font-size: 12px;
}
.text {
  font-size: 14px;
}

.box-article-tiny {
  width: 100%;
}
</style>