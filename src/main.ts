import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';

import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';


import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

// highlight js
// import hljs from 'highlight.js';
import prism from 'prismjs';

//配置请求数据
import {AxiosInstance } from "axios";
import Axios from "axios";

//全局配置Axios
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $axios: AxiosInstance;
    }
}

VMdPreview.use(vuepressTheme, {
  // Hljs: hljs,
  Prism: prism,
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
});

VueMarkdownEditor.use(vuepressTheme, {
  // Hljs: hljs,
  Prism: prism,
  extend(md) {
    // md为 markdown-it 实例，可以在此处进行修改配置,并使用 plugin 进行语法扩展
    // md.set(option).use(plugin);
  },
});

const app = createApp(App)
app.config.globalProperties.$axios = Axios;
app.use(ElementPlus)
app.use(VueMarkdownEditor)
app.use(VMdPreview)
app.use(store)
app.use(router)
app.mount('#app')
