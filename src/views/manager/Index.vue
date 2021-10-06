<template>
      <el-container>
        <el-aside style="transition: all .5s" :width="!isCollapse ? '200px' : '64px'">
            <Logo :isCollapse="isCollapse"/>  <!-- logo -->
            <Sidebar :isCollapse="isCollapse" />  <!-- 侧边栏 -->
        </el-aside>

        <el-container>
        <el-header>
            <Myheader :isCollapse="isCollapse" @changeIsCollapse="changeIsCollapse" />  <!-- header 头部 -->
        </el-header>

        <el-main>
            <router-view></router-view>
        </el-main>

        </el-container>

    </el-container>
</template>
<script lang="ts">
import{ defineComponent,toRefs,reactive }from 'vue';
import Sidebar from '@/components/manager/Sidebar.vue'
import Myheader from '@/components/manager/Header.vue'
import Logo from '@/components/manager/Logo.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
    // name: "",
    components:{
        Sidebar,
        Logo,
        Myheader
    },
    setup: () => {
        const state = reactive({
            isCollapse:false  // 控制菜单展开 收起
        })
        const changeIsCollapse = ():void => {
            state.isCollapse = !state.isCollapse
        }

        const route = useRoute()
        const key = () => {
            console.log(route.path)
            return route.path
        }

        return {
            key,
            ...toRefs(state),
            changeIsCollapse
        }
    }
})
</script>
<style scoped>
.el-container{
    height:95vh;
}
.el-header{
    padding-left: 0px;
    padding-right: 0px;
}
</style>