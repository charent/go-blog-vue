<template>
    <el-tabs type="card" @tab-click="handleTabClick">
        <el-tab-pane label="一级分类">
            <div class="create-category">
                <el-form :inline="true" :model="category1" ref="category1"  :rules="categoryRules">
                    <el-form-item label="创建新的一级分类："></el-form-item>
                    <el-form-item prop="categoryName">
                        <el-input
                            ref="categoryName"
                            placeholder="一级分类名称"
                            name="categoryName"
                            v-model="category1.categoryName"
                            type="text"
                            auto-complete="on">
                        </el-input>
                    </el-form-item>

                    <el-form-item>
                         <el-button type="primary" plain  @click="handleCreateCategory('category1')">创建</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <div>
                <el-table :data="categoryFirstData" stripe style="width: 100%">
                    <el-table-column prop="CategoryName" label="一级分类"  />
                    <el-table-column prop="ArticleCount" label="该分类下的文章数" />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">重命名</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-tab-pane>

        <el-tab-pane label="二级分类">
            <div class="create-category">
                <el-form :inline="true" :model="category2" ref="category2"  :rules="categoryRules">
                        <el-form-item label="创建新的二级分类："></el-form-item>

                        <el-form-item label="">
                           <el-select v-model="createSecondSelectFirst" placeholder="选择一级分类">
                                <el-option
                                v-for="item in categoryFirstData"
                                :key="item.CategoryName"
                                :label="item.CategoryName"
                                :value="item.CategoryName"
                                >
                                </el-option>
                            </el-select>

                        </el-form-item>

                        <el-form-item prop="categoryName">
                            <el-input
                                ref="categoryName"
                                placeholder="二级分类名称"
                                name="categoryName"
                                v-model="category2.categoryName"
                                type="text"
                                auto-complete="on">
                            </el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" plain  @click="handleCreateCategory('category2')">创建</el-button>
                        </el-form-item>
                </el-form>
            </div>

            <div>
                <el-table :data="categorySecondData" stripe style="width: 100%">
                    <el-table-column prop="CategoryFirstName" label="一级分类"  />
                    <el-table-column prop="CategorySecondName" label="二级分类"  />
                    <el-table-column prop="ArticleCount" label="该分类下的文章数" />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">重命名</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        
         </el-tab-pane>

    </el-tabs>

    <!-- 确认对话框 -->
    <el-dialog v-model="createConformVisiable_1" title="确认创建" width="30%" center>
        <span>创建一级标题：<span style="color:#E6A23C">{{category1.categoryName}}</span> </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="createConformVisiable_1 = false">取消</el-button>
                <el-button type="primary" @click="createConformVisiable_1 = false">确认</el-button>
            </span>
        </template>
    </el-dialog>

     <el-dialog v-model="createConformVisiable_2" title="确认创建" width="30%" center>
        <span>创建二级标题：<span style="color:#E6A23C">{{category2.categoryName}}</span> </span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="createConformVisiable_2 = false">取消</el-button>
                <el-button type="primary" @click="createConformVisiable_2 = false">确认</el-button>
            </span>
        </template>
    </el-dialog>


</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import store from "@/store/index";

export default {
  data() {
    return {
        // 创建一级标题对话框可见
        createConformVisiable_1: false,
        createConformVisiable_2: false,
        categoryFirstData: [
            // {CategoryName: 'golang', ArticleCount: 3},
            // {CategoryName: 'vue', ArticleCount: 6}

        ],
        categorySecondData: [
            // {CategoryFirstName: 'golang', CategorySecondName: 'gin', ArticleCount: 3},
        ],

        activeName: 'first',
        createSecondSelectFirst: '',
        categoryRules: {
            categoryName: [
            {required: true, message: '请输入分类名称', trigger: 'blur',},
            {min: 2, max: 16, message: '分类名长度: [2, 16]', trigger: 'blur',}
            ],
        },
        category1: {categoryName: ''},
        category2: {categoryName: ''},

    }
  },
  mounted() {
    this.$nextTick(function () {
        // 仅在整个视图都被渲染之后才会运行的代码
        let url = '/api/manager/category/first'
        this.updataTableData(url, 'categoryFirst')
         
    })
  },
  methods: {

    updataTableData(url, categoryTable) {
        let token = store.getters.token
    
        // 注意： Bearer后面有个空格
        this.$axios.get(url,  {headers: {'Authorization': 'Bearer ' + token}})
            .then(
                // 这里必须使用箭头函数，否则this=undefined
                (response) => {
                    if (response.data.code == 200){
                        let data = response.data

                        if (categoryTable == 'categoryFirst'){
                            this.categoryFirstData = data.category
                            
                        }
                        
                        if (categoryTable == 'categorySecond'){
                            this.categorySecondData = data.category
                        }
                        
                    }else{
                        ElMessage.error("连接服务器错误...")
                    }
                }
            )
            .catch(function(err){
            ElMessage.error("网络或者服务器返回数据错误")
            console.log(err);
            });
    },

    handleCreateCategory(formName){
        this.$refs[formName].validate((valid) => {
           if (valid) {
               if (formName == 'category1'){
                    this.createConformVisiable_1 = true
               }
               if (formName == 'category2'){
                    this.createConformVisiable_2 = true
               }
               
           }
        })
    },


    handleEdit(index, row) {
      console.log(index, row)
    },

    handleDelete(index, row) {
      console.log(index, row)
    },

    handleTabClick(tab, event) {
      if (tab.paneName == 0){
          let url = '/api/manager/category/first'
          this.updataTableData(url, 'categoryFirst')
      }
       if (tab.paneName == 1){
          let url = '/api/manager/category/second'
          this.updataTableData(url, 'categorySecond')
         
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.create-category{
    height: 60px;
    display: flex;

}
.el-form-item {
    margin-right: 5px;

}

</style>