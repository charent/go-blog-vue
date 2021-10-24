<template>
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formData" ref="formData"  :rules="formRelus">
                <!-- <el-form-item label="文章分类："></el-form-item> -->

                <el-form-item label="" style="width: 160px" prop="categoryFirstSelected">
                    <el-select  @change="categorySelectChanged"  v-model="formData.categoryFirstSelected" placeholder="选择一级分类">
                        <el-option
                        v-for="item in categoryFirstData"
                        :key="item"
                        :label="item"
                        :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>
                
                
                <el-form-item label=""  style="width: 160px" prop="categorySecondSelected">
                    <el-select v-model="formData.categorySecondSelected" placeholder="选择二级分类">
                        <el-option
                        v-for="item in categorySecondData"
                        :key="item"
                        :label="item"
                        :value="item"
                        >
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="" style="width: 120px">
                     <el-switch v-model="formData.isPrivate" active-text="私密" inactive-text="公开"> </el-switch>
                </el-form-item>

                <el-form-item style="width: 40vw" prop="title">
                    <el-input
                        ref="title"
                        placeholder="标题"
                        name="title"
                        v-model="formData.title"
                        type="text"
                        auto-complete="on">
                    </el-input>
                </el-form-item>

                <el-form-item style="width: 40px">
                    <el-button type="primary" plain  @click="handlePublish('formData')">发布</el-button>
                </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- markdown编辑器 -->
    <el-row>
      <el-col :span="24">
        <v-md-editor v-model="markdownText" height="75vh"></v-md-editor>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24"></el-col>
    </el-row>
</template>

<script lang='ts'>
import { ElMessage } from "element-plus";
import store from "@/store/index";
import router from '@/router/index'

export default {
  data() {
    return {
      markdownText: '',
      formData: {
        categoryFirstSelected: '',
        categorySecondSelected: '',
        title: '',
        isPrivate: false,
      },

      categoryMap: new Map(),

      categoryFirstData: [],
      categorySecondData: [],
     
      formRelus: {
        categoryFirstSelected: [
          {required: true, message: '请输选择一级分类', trigger: ['blur', 'change'],},
        ],
        categorySecondSelected: [
          {required: true, message: '请输选择二级分类', trigger: ['blur', 'change'],},
        ],
        title: [
          {required: true, message: '请输入标题', trigger: 'blur',},
          {min: 4, max: 64, message: '标题长度: [4, 64]', trigger: 'blur',}
        ]
      },
    };
  },

  mounted() {
  this.$nextTick(function () {
      // 仅在整个视图都被渲染之后才会运行的代码

      // 从服务器获取该用户的文章分类信息
      let token = store.getters.token
      let url = '/api/manager/category/second'
      // 注意： Bearer后面有个空格
      this.$axios.get(url,  {headers: {'Authorization': 'Bearer ' + token}})
          .then(
              // 这里必须使用箭头函数，否则this=undefined
              (response) => {
                  if (response.data.code == 200){
                      let category = response.data.category
                      var cMap = new Map()
      
                      for (let index = 0; index < category.length; index++) {
                          const element = category[index];
                          let CategoryFirstName = element.CategoryFirstName

                          if (cMap.has(CategoryFirstName)){
                            var secondList = cMap.get(CategoryFirstName)
                            secondList.push(element.CategorySecondName)
                            
                            cMap.set(CategoryFirstName, secondList)

                          }else{
                            cMap.set(CategoryFirstName, [element.CategorySecondName])
                            this.categoryFirstData.push(CategoryFirstName)
                          }
                      }
                      this.categoryMap = cMap
                      
                  }else{
                      ElMessage.error("连接服务器错误...")
                  }
              }
          )
          .catch(function(err){
              ElMessage.error("网络或者服务器返回数据错误，" +  err.response.message)
          });
        
  })
  },

  methods :{
    handlePublish (formName) {
      if (this.markdownText.length == 0) {
        ElMessage.error("文章还没有字，不能发表")
        return
      }
      this.$refs[formName].validate((valid) => {
          if (valid){
            
            let url = '/api/manager/article'
            let data = {
              'categoryFirstName': this.formData.categoryFirstSelected,
              'categorySecondName': this.formData.categorySecondSelected,
              'title': this.formData.title,
              'markdownText': this.markdownText,
              'isPrivate': this.formData.isPrivate
            }
            
            let token = store.getters.token
        
            // 第一个参数为url，第二个参数为data，第三个参数为配置
            this.$axios.put(url, data, {headers: {'Authorization': 'Bearer ' + token}})
            .then(
                // 这里必须使用箭头函数，否则this=undefined
                (response) => {
                    if (response.data.code == 200){
                        ElMessage.success("发布成功")
                        let data = response.data
                        
                        let path = '/article/' + data.articleId
                        let routerUrl = router.resolve({
                          path: path
                        })

                        window.open(routerUrl.href, '_blank')
                        
                    }
                }
            )
            .catch(function(err){
                let response = err.response.data
                if (response.code == 400){
                    ElMessage.error("创建失败, " + response.message)

                }else {
                    ElMessage.error("网络或者服务器返回数据错误, " + response.message)
                }
              
            });



          }else{
            ElMessage.error('文章的分类或者标题还没填完')
          }

      })
    },

    // 选择一级分类后动态生成对应的二级分类
    categorySelectChanged (){
      this.formData.categorySecondSelected = ''
      this.categorySecondData = this.categoryMap.get(this.formData.categoryFirstSelected)

    }
  }
};
</script>

<style lang='scss' scoped>
.el-form-item {
  margin-bottom: 18px;
}
</style>