<template>
<div id="login-wrapper">
	<div class="login-container">
		<h2>
			博客后台管理
		</h2>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <el-form-item prop="userName">
            <el-input
              ref="userName"
              v-model="loginForm.userName"
              placeholder="用户名"
              name="userName"
              type="text"
              auto-complete="on">
              
              <template #prefix>
                  <i class="el-input__icon el-icon-user"></i>
              </template>

              </el-input>
        </el-form-item>

          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="loginForm.password"
              placeholder="密码"
              name="password"
              type="password"
              auto-complete="on"
              @keyup.enter.prevent="handleLogin"> 
              
              <template #prefix>
                  <i class="el-input__icon el-icon-lock"></i>
              </template>

               <template #suffix>
                  <i class="el-input__icon el-icon-view"  @click="handleIconClick"></i>
              </template>
              
              </el-input>
            
        </el-form-item>
        
        <el-form-item label="">
          <el-button  :loading="loading" type="primary" style="width:100%" @click.prevent="handleLogin('loginForm')">登录</el-button>
        </el-form-item>
        
        <el-form-item label="">
          <el-button :loading="loading" type="primary" style="width:100%;" @click.prevent="handleReg('loginForm')">注册</el-button>
        </el-form-item>

    </el-form>
	</div>
</div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import router from "@/router/index";
import store from "@/store/index";
import { ElMessage } from "element-plus";
// import { Router } from "@/router";
export default defineComponent({

  setup() {

  },
  data() {
    return {
      loginForm: {
        userName: 'admin',
        password: 'admin',
      },
      loginRules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur',},
          {min: 5,max: 15, message: '用户名长度: [5, 10]', trigger: 'blur',}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur',},
          {min: 5,max: 18, message: '密码长度: [5, 18]',trigger: 'blur',}
        ]
      },
    }
  },

  methods: {
    showPwd() {
     
    },
    
    handleLogin(formName) {
    
      this.$refs[formName].validate((valid) => {
      // this.loading = true
      if (valid) {
        // 提交表单数据，登录
        // this.login_button.disabled = true
        // console.log( this.login_button.disabled)
        this.$axios.post('api/user/login',this.loginForm)
        .then(function(response){
         if (response.data.code == 200){
           ElMessage.success("登录成功")
            // 存储token
          store.dispatch('login', {token: response.data.token})
          router.push("/manager")
          return true
         }else{
           ElMessage.success("登录失败")
         }

        })
        .catch(function(err){
          ElMessage.error("登录失败，请检查用户名和密码")
          console.log(err);
        });
        
      } else {
        ElMessage.error("校验失败，请检查用户名和密码")
      
        return false
      }
      return false
      })
    },

    handleReg(loginForm) {
       ElMessage.error('暂未开放注册！')
    }

  }
}
);
</script>

<style scoped>
#login-wrapper {
  background: radial-gradient(ellipse at bottom, #0607089d 0%, #090a0fc2 50%);
  height: 100%;
  overflow: hidden;
}
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(244, 244, 245, 0.938);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-container h2 {
  margin: 0 0 30px;
  padding: 0;
  font-size: 15pt;
  color: rgb(104, 124, 212);
  text-align: center;
}

.login-container .user-box {
  position: relative;
}

.login-container .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-container .user-box input:focus ~ label,
.login-container .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.svg-container {
  padding: 6px 5px 6px 15px;
  /* color: $; */
  vertical-align: middle;
  width: 30px;
  display: inline-block;
}

</style>
