import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

//配置请求数据
import {AxiosInstance } from "axios";
import Axios from "axios";

//全局配置Axios
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $axios: AxiosInstance;
    }
}


const app = createApp(App)
app.config.globalProperties.$axios = Axios;
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')
