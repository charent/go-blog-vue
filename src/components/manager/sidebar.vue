<template>
  
  <el-card :body-style="{ padding: '0px' }">
    <!--  default-active="/dashboard" -->
    <el-menu
      :default-active="activeMenu"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      router
    >

      <!-- 一级菜单 -->
      <template v-for="item in menuList" :key="item.id">

        <!-- 不存在二级菜单，只渲染一级菜单 -->
        <template v-if="!item.children">
          <el-menu-item :index="item.path">
              <i :class="item.icon"></i>
              <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>

        <!-- 二级菜单 -->
        <template v-if="item.children && item.children.length > 0">
          <el-sub-menu :index="item.id">
            <!-- 二级菜单标题 -->
            <template #title>
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
            </template>

            <!-- 多个二级菜单 -->
            <el-menu-item :index="child.path" v-for="child in item.children" :key="child.id">
              <template #title>
                <i :class="child.icon"></i>
                <span>{{ child.title }}</span>
              </template>
            </el-menu-item>

          </el-sub-menu>
        </template>

      </template>

    </el-menu>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { onBeforeRouteUpdate  } from 'vue-router'
import { useRoute } from 'vue-router'
// import router from '@/router/index'

export default defineComponent({
    data() {
      return {
        menuList:[
          { id: "1", icon: 'el-icon-s-marketing', title: '数据看板', path: '/manager/dashboard' },

          { id: "2", icon: 'el-icon-document',title: '文章管理', path: '/art',
            children: [
              { id: "2.1", icon: 'el-icon-edit', title: '发表文章', path: '/manager/publish' },
              { id: "2.2", icon: 'el-icon-edit-outline', title: '修改文章', path: '/edit' },
              { id: "2.3", icon: 'el-icon-delete-solid', title: '已删除文章', path: '/deleted' }
            ]},

          { id: "3", icon: 'el-icon-paperclip', title: '分类管理', path: '/manager/category' },
          { id: "4",  icon: 'el-icon-picture', title: '图床管理', path: '/manager/picbed' },
          { id: "5",  icon: 'el-icon-s-order', title: '系统日志', path: '/manager/log' },

          { id: "6",  icon: 'el-icon-setting', title: '设置', path: '/manager/setting',
            children: [
              { id: "6.1", icon: 'el-icon-lock', title: '修改密码', path: '/manager/changepwd' },
              { id: "6.2", icon: 'el-icon-user-solid', title: '修改个人信息', path: '/manager/changeinfo' }
            ]},

          { id: "7", icon: 'el-icon-message-solid', title: '我的消息', path: '/manager/message' },
            
          { id: "8",  icon: 'el-icon-document-copy', title: '数据备份', path: '/manager/backup',}
        ]
      }
    },
    props:{
        isCollapse:{
            type:Boolean,
            default:true
        }
    },
  setup(props) {
    watch(() => {
            return props.isCollapse
        },(n) => {
            console.log(n)
    })
    // const isCollapse = ref(true)
    const handleOpen = (key, keyPath) => {
      // console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      // console.log(key, keyPath)
    }
    const activePath = ref<string>('')
    
    // 路由监听
    onBeforeRouteUpdate((to) => {
      // console.log(to.path)
      activePath.value = to.path
    })
    
    const route = useRoute()
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta !== null || meta !== undefined) {
        if (meta.activeMenu) {
          return meta.activeMenu
        }
      }
      console.log(path)
      return path
    })

    // const selectMenu = (path:any):void => {
    //   console.log(path)
    //         router.push({path:path})
    //     }

    return {
      // isCollapse,
      handleOpen,
      handleClose,
      activeMenu,
      // selectMenu,
    }
  },
})
</script>

<style lang='scss' scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 500px;
}
</style>