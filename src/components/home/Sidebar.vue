<template>
   <el-row>
     <el-col :span="24">
        <div>
            <h3>{{ nickName_en }}的博客</h3>
        </div>
     </el-col>
   </el-row>

   <!-- 头像 -->
   <el-row>
     <el-col :span="24">
        <div class="demo-basic--circle">
            <div class="block">
            <el-avatar :size="90" :src="avatar_url"></el-avatar>
            </div>
      </div>
     </el-col>
   </el-row>

    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>个人信息</span>
                </div>
            </template>

            <div style="font-size:12px">
                <el-row>
                  <el-col :span="6"> <div style="text-align:right">昵称：</div></el-col>
                  <el-col :span="18"> <div style="text-align:center">{{ nickName_zh }}</div></el-col>
                </el-row>
                <div class="line"><div></div></div>

                <el-row>
                  <el-col :span="8"> <div style="text-align:center;">联系方式：<br/>(^替换为@)</div></el-col>
                  <el-col :span="16"> <div style="text-align:center; margin-top:8px; overflow:hidden;">{{ email }}</div></el-col>
                </el-row>
                <div class="line"><div></div></div>

                <el-row>
                  <el-col :span="8"> <div style="text-align:center">Gitee主页：</div></el-col>
                  <el-col :span="16"> <div style="text-align:center"><a :href="gitee" target="_blank">{{ gitee }}</a></div></el-col>
                </el-row>
                <div class="line"><div></div></div>

                  <el-row>
                  <el-col :span="8"> <div style="text-align:center">Github主页：<br/>（备份用）</div></el-col>
                  <el-col :span="16"> <div style="text-align:center;margin-top:8px; "><a :href="github" target="_blank">{{ github }}</a></div></el-col>
                </el-row>
                <div class="line"><div></div></div>

                <el-row>
                  <el-col :span="24" class="mytag">
                      <el-tag type="warning">后台开发</el-tag>
                      <el-tag type="success">Go/Java/Python/C++</el-tag>
                      <el-tag type="danger">自然语言处理</el-tag>
                      <el-tag type="info">深度学习</el-tag>
                      <el-tag type="success">数据库</el-tag>
                  </el-col>
                </el-row>
            </div>
           
        </el-card>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
            <template #header>
            <div class="card-header">
                <span>文章分类</span>
            </div>
            </template>
            
            <div>
                <el-tree :data="class_data"  @node-click="handleNodeClick" />
            </div>
    
        </el-card>
      </el-col>
    </el-row>

</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
    data() {
        return {
            class_data: [
                {
                    label: '前后端开发',
                    children: [{label: 'Gin'}, {label: 'Vue3'}],
                },
                {
                    label: '安卓开发',
                    children: [{label: 'Android 10',}],
                },
                {
                    label: '深度学习',
                    children: [{label: 'Pytorch',}],
                },
            ]
        }
    },

    methods: {
    handleNodeClick(data) {
      console.log(data)
    },
  },

  setup() {
    const state = reactive({
      avatar_url: require('@/assets/logo.png'),
      nickName_en: "Charent",
      nickName_zh: "Charent",
      email: "Y2hhcmVudC5jaGVuXmdtYWlsLmNvbQ==",
      gitee: "https://gitee.com/charent",
      github: "https://github.com/charent"
    })

    const class_data = {
        
    }
    
    return {
      ...toRefs(state),
    }
  },
})
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10px;
}

.box-card {
    margin-top: 20px;
  /* width: 480px; */
  margin-left: 10px;
  margin-right: 10px;

}


.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.line div {
    margin-top: 5px;
    margin-bottom: 10px;
    width: 100%;
    height: 0;
    border-bottom: 2px solid var(--el-border-color-base);
}

.mytag {
    text-align: left;
}

.mytag el-tag{
    text-align: center;
    margin-right: 5px;
}

a:link {   
    color: #000000;   
    text-decoration: none;   
}   
a:visited {    
    color: #000000;   
    text-decoration: none;   
}   
a:hover { 
    color: #17b458;   
    text-decoration: none;   
} 

</style>