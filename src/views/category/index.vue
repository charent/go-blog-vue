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
                            name="categoryName1"
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
                <el-table :data="categoryFirst" stripe style="width: 100%">
                    <el-table-column prop="category_name" label="一级分类"  />
                    <el-table-column prop="article_count" label="该分类下的文章数" />
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
                        <el-form-item prop="categoryName">
                            <el-input
                                ref="categoryName"
                                placeholder="一级分类名称"
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
                <el-table :data="categorySecond" stripe style="width: 100%">
                    <el-table-column prop="category_first" label="一级分类"  />
                    <el-table-column prop="category_name" label="二级分类"  />
                    <el-table-column prop="article_count" label="该分类下的文章数" />
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
export default {
  data() {
    return {
        // 创建一级标题对话框可见
        createConformVisiable_1: false,
        createConformVisiable_2: false,
        categoryFirst: [
            {category_name: 'golang', article_count: 3},
            {category_name: 'vue', article_count: 6}

        ],
        categorySecond: [
            {category_first: 'golang', category_name: 'gin', article_count: 3},
        ],

        activeName: 'first',
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
  methods: {

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
      console.log(tab, event)
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