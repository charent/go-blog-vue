<template>
  <el-card class="article_card" :path="path" @click="handleCardClick(path)">
      <template #header>
      <div class="article-header">
          <span>{{  title }}</span>
          
      </div>
      </template>
      <div class="article">
           <v-md-preview :text="markdown_content"></v-md-preview>
      </div>
        
  </el-card>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from 'vue'
import { ElMessage } from "element-plus";
import router from '@/router/index'

export default defineComponent({

  // 当APP被挂载之后，自动执行该函数更新文章数据
   mounted() {
    this.$nextTick(function () {
      // 仅在整个视图都被渲染之后才会运行的代码
      let url = '/api/home/article/' + this.$route.params.articleId
      let data = this.$axios.get(url)
        .then(
          
          // 这里必须使用箭头函数，否则this=undefined
          (response) => {
              if (response.data.code == 200){
                let data = response.data
                let article = data.article
                
                // 更新页面数据
                this.title = article.Title
                this.markdown_content = data.markdown
                
              }else{
                ElMessage.error("连接服务器错误..")
              }
          }
        )
        .catch(function(err){
          ElMessage.error("网络或者服务器返回数据错误，" + err)
          router.push('/404NotFound')
        });

    })
  },


  setup: (props, context) => {
    
    let data = reactive({
      title: '正在加载...',
      markdown_content: '# 正在加载'

    })

    return {
      ...toRefs(data),
    }
    
  }


  
})

</script>


<style scoped>
.article_card {
    min-height: 100vh;
    text-align: left;
}
</style>