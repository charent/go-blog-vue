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

  <el-row >
    <!-- <el-col :span="12"></el-col> -->
    <el-col :span="24">
      <div class='page-box'>
        <el-pagination background 
        layout="prev, pager, next, jumper" 
        v-model:currentPage="current_page"
        :total="totalPage"
        :page-size="page_size"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        >
        
        </el-pagination> 
        
      </div>
    </el-col>
  </el-row>
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

       let data = this.$axios.get('api/home/article/0')
        .then(
          
          // 这里必须使用箭头函数，否则this=undefined
          (response) => {
              if (response.data.code == 200){
                let data = response.data
                this.articles = data.articles
                this.current_page = data.currentPage + 1
                this.totalPage = data.totalPage * this.page_size
                
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

  methods: {
    handleSizeChange(val){
      console.log(`${val} items per page`)
    },

    handleCurrentChange(val){
      let page = val - 1
      let url = 'api/home/article/' + page
      console.log(url)
      this.$axios.get(url)
        .then(
          
          // 这里必须使用箭头函数，否则this=undefined
          (response) => {
              if (response.data.code == 200){
                let data = response.data
                 this.articles = data.articles
                 this.current_page = data.currentPage + 1
                //  this.page_size = data.artcles.length
                this.totalPage = data.totalPage * this.page_size

                
              }else{
                ElMessage.error("连接服务器错误...")
              }
          }
        )
        .catch(function(err){
          ElMessage.error("网络或者服务器返回数据错误，" + err)
          console.log(err);
        });

    }
  },


  setup: (props, context) => {

  


    
    let data = reactive({
        articles: [],
        current_page: 5,

        // 每一页显示的条数
        page_size: 10,

        // 总页数
        totalPage: 1
    })

    data.articles = [
       {
              "ArticleId": -1,
              "Title": "如果你看到这个标题，说明没有获取到后端服务器的数据",
              "Abstract": "如果你看到这个摘要，说明没有获取到后端服务器的数据，请联系管理员",
              "PublishTime": "0",
              "Visited": 0
          },
          {
              "ArticleId": -2,
              "Title": "标题示例",
              "Abstract": "摘要示例",
              "PublishTime": "2021-10-11 199:16",
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

.page-box {
  margin-top: 20px;
}

</style>