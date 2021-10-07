<template>
  <el-card class="article_card" :path="path" @click="handleCardClick(path)">
      <template #header>
      <div class="article-header">
          <span>{{  title }}</span>
          
      </div>
      </template>
      <div class="article">
           <v-md-preview :text="text"></v-md-preview>
      </div>
        
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      text: '## markdown head',
    };
  },
};
</script>

<style scoped>
.article_card {
    min-height: 100vh;
    text-align: left;
}
</style>