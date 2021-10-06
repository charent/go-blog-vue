<template>
 <el-container>
      <el-aside >
          <Sidebar></Sidebar>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>

</template>

<script lang="ts">
import{ defineComponent,toRefs,reactive }from 'vue';
import Sidebar from '@/components/home/Sidebar.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    // name: "",
    components:{
        Sidebar,
    },
})

</script>

<style>
.el-aside {

  background-color: #e5e8ecea;
  color: var(--el-text-color-primary);
  text-align: center;
  width: 250px;
  /* line-height: 200px; */
  /* min-height: 600px; */
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  /* line-height: 160px; */
}

</style>
