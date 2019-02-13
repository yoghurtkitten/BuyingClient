import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

const store = new vuex.Store({
    state: {
      user: '',
      timerNumber: 0
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
    }
  })
  
  export default store