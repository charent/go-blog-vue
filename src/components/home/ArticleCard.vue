<template>
    <el-row>
      <el-col :span="24">
        <el-card class="article-tiny" :path="path" @click="handleCardClick(path)">
            <template #header>
              <el-row>
                <el-col :span="20">
                  <div class="article-header">
                    <el-link type="primary"> <span>{{  title }}</span></el-link>
                  </div>
                </el-col>
                <el-col :span="4" class='publish-time'>
                  <span>{{ publish_time }}</span>
                </el-col>
              </el-row>
            </template>
            <div class="article-abstract">
                {{text}}
            </div>
        
        </el-card>
      </el-col>
    </el-row>
</template>

<script>
// import router from '@/router/index.vue'
export default {
  data() {
    return {
        title: '文章标题',
        text: '## 这是文章摘要',
        path: '/article/5',
        publish_time:'2021-10-7',
    };
  },

  methods: {
    handleCardClick(path) {
      let routerUrl = this.$router.resolve({
        path: path
      })

      window.open(routerUrl.href, '_blank')
    },
  }
};

</script>

<style scoped>

.article-tiny {
    height: 180px;
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