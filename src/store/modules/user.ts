import router from '@/router/index'

const user = {
    // 创建基本状态
    state:{
        token: "",
        logined: false
    },

    // 创建改变状态的方法
    mutations:{
       login (state, token){
           state.token = token
           state.logined = true
       },

       logout (state){
           state.token = ""
           state.logined = false
       }
    },

    // 创建驱动Actions，使得改变状态的mutations得以启动
    // store.dispatch('login', {token: 'token'})
    actions:{
        login ({ commit }){
            // commit的login是mutations的login
            commit('login')
        },

        logout ({commit}){
            commit('logout')
        }
    }
}

export default user