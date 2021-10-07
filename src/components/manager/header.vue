<template>
    <div class="header-wrapper">
        <div style="display: flex;align-items: center;">
            <span :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="changeIsCollapse"></span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="display:inline-block;">
                
                <!-- <el-breadcrumb-item>活动管理</el-breadcrumb-item> -->
                <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->
                <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
            </el-breadcrumb>
        </div>

        <el-dropdown>
            <el-button type="primary" plain>
            个人中心<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
               <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
        </el-dropdown>

    </div>
</template>

<script lang="ts">
import{ defineComponent,watch,computed,toRefs,reactive }from 'vue';
import router from '@/router/index'
import store from '@/store/index'
export default defineComponent({
    name: "Myheader",
    props:{
        isCollapse:{
            type:Boolean,
            default:true
        }
    },
    setup: (props,{emit}) => {
        // const state:any = reactive({
        //     routeMatched:[],
        // })
        // watch(() => router.currentRoute.value.matched,(n) => {
        //     state.routeMatched = router.currentRoute.value.matched
        // },{deep:true,immediate:true})

        const logOut = () => {
            window.localStorage.clear()
            store.commit('logout')
            router.push({path:'/'})
        }
        const handleLink = (item:any) => {
            console.log(item.path)
            router.push({path:item.path})
        }
        const changeIsCollapse = ():void => {
            emit('changeIsCollapse')
        }
        return {
            changeIsCollapse,
            logOut,
            handleLink,
            // ...toRefs(state),
        }
    }
})
</script>
<style scoped>
.header-wrapper{
    height:100%;
    width: 100%;
    box-shadow: 8px 2px 8px rgba(32, 32, 32, 0.5);

    display:flex;
    justify-content: space-between;
    align-items: center;
}
.el-icon-s-fold,.el-icon-s-unfold{
    cursor: pointer;
    font-size:30px;
    padding:15px;
}
</style>