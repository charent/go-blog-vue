<template>
    <div class="home-header">
        <el-card :body-style="{ padding: '5px' }">
            <el-row >
                <el-col :span="18"></el-col>
                <el-col :span="6">
                    <el-input v-model="input" placeholder="请输入关键字">
                        <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                        </template>
                    </el-input>
                </el-col>
                <!-- <el-col :span="3">
                    <el-button type="primary" round>搜索</el-button>
                </el-col> -->
            </el-row>
            
        </el-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    return {
      input: ref(''),
    }
  },
})
</script>


<style lang='scss' scoped>
.home-header {
    height: 60px;
}

.home-header {
    .el-card {
    }
}
</style>