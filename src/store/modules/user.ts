import router from '@/router/index'

const user = {
    // 创建基本状态
    state: {
        token: "",
        lastLoginTime: "",
        lastLoginIp: ""
    },

    // 创建改变状态的方法
    mutations:{
       login (state, data){
           state.token = data.token
           state.lastLoginTime = data.lastLoginTime
           state.lastLoginIp = data.lastLoginIp

       },

       logout (state){
           state.token = ""
           state.lastLoginTime = ""
           state.lastLoginIp = ""
       }
    },

    // 创建驱动Actions，使得改变状态的mutations得以启动
    // store.dispatch('login', {token: 'token'}) ,该方法目前有问题
    // 该方法目前有问题,建议：store.commit('login', {token: response.data.token})
    // actions:{
    //     login ({ commit }){
    //         // commit的login是mutations的login
    //         commit('login')
    //     },

    //     logout ({commit}){
    //         commit('logout')
    //     }
    // },

    // 获取state的方法
    // 通过store.getters.func 调用，参考：https://next.vuex.vuejs.org/zh/guide/getters.html
    getters: {
        token: (state) => {
            return state.token
        }
    }
}

export default user