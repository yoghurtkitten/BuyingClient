import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

const store = new vuex.Store({
    state: {
      user: '',
      timerNumber: 0,
      baseUrl: 'http://127.0.0.1:5050',
      business: localStorage.getItem('business')||''
    },
    mutations: {
      //所有mutations中的方法的第一个参数一定是state变量，用来进行对state中的状态的操作
      //第二个参数是可选参数，用于调用该 mutations 方法的时候传参
      setUser (state, data) {
        state.user = data
      },
      setTimer (state, data) {
        state.timerNumber = data;
      }
    },
    actions: {
        commitUser:({commit},user)=>commit('setUser',user),
        commitTimer:({commit},timerNumber)=>commit('setTimer', timerNumber),
    },
    getters: {
      getBaseUrl: state => {
        return state.baseUrl;
      },
      getBusiness: state => {
        return state.business;
      }
    }
  })
  
  export default store