<template>
<!-- <el-scrollbar style="height:96vh;">
    <div> -->
 <el-container >

      <el-aside >
          <Sidebar></Sidebar>
      </el-aside>
      
      <el-container>
        <el-main>
          <div class="show-card">
            <el-row>
              <el-col :span="24">
                <HomeHeader></HomeHeader>
              </el-col>
            </el-row>
            
            <el-row >
              <el-col :span="24">
              <ArticleCard></ArticleCard>    
              </el-col>
            </el-row>
          </div>

          <el-row >
            <!-- <el-col :span="12"></el-col> -->
            <el-col :span="24">
              <div class='page-box'>
                <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination> 
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>

    </el-container>
  <!-- </div>
</el-scrollbar> -->
</template>

<script lang="ts">
import{ defineComponent,toRefs,reactive }from 'vue';
import { useRoute } from 'vue-router'
import Sidebar from '@/components/home/Sidebar.vue'
import ArticleCard from '@/components/home/ArticleCard.vue'
import HomeHeader from '@/components/home/Header.vue'

export default defineComponent({
    // name: "",
    components:{
        Sidebar,
        ArticleCard,
        HomeHeader,
    },
})

</script>

<style lang='scss' scoped>
.el-aside {

  background-color:azure;
  color: var(--el-text-color-primary);
  text-align: center;
  width: 250px;
  /* line-height: 200px; */
  /* min-height: 600px; */
}

.el-main {
  /* background-color: #e9eef3; */
  color: var(--el-text-color-primary);
  text-align: center;
  padding-top: 0px;
  /* line-height: 160px; */
}

// .show-card {
//   .el-row {
//     // margin-top: 10px;
//     // margin-bottom: 10px;
//   }
 
// }

.page-box {
  margin-top: 20px;
}

</style>
