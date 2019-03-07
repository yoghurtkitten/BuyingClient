<template>
  <div :class="{'container-fluid':true, 'isFixed':toggleFixed}">
    <header class="header">
      <div class="nav container navbar-light">
        <div class="col-md-2 col-sm-3 col-xs-6">
          <div class="logo">
            <router-link to="/">
              <img :src="baseUrl+'/img/logo.png'" @click="toIndex">
            </router-link>
          </div>
        </div>
        <div class="col-md-10 col-sm-9 col-xs-6">
          <div class="header-right">
            <div class="show-btn" @click="toggle">
              <i class="iconfont">&#xebd8;</i>
            </div>
            <div class="header-info" v-if="isShow">
              <ul>
                <li>
                  <router-link to="/">首页</router-link>
                </li>
                <li>
                  <router-link to="/register">加盟</router-link>
                </li>
                <li>
                  <router-link to="/UserIndex">点外卖</router-link>
                </li>
                <li>
                  <router-link to="/Business">店家入口</router-link>
                </li>
              </ul>
            </div>
            <div class="header-menu list-info">
              <ul>
                <li>
                  <router-link to="/">首页</router-link>
                </li>
                <li>
                  <router-link to="/register">加盟</router-link>
                </li>
                <li>
                  <router-link to="/UserIndex">点外卖</router-link>
                </li>
                <li>
                  <router-link to="/Business">店家入口</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  props:['toggleFixed'],
  data() {
    return {
      isShow: false,
      baseUrl: this.$store.getters.getBaseUrl,
    };
  },
  mounted() {
    var _self = this;
    window.onresize = function() {
      _self.showHeader();
    };
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow;
    },
    showHeader() {
      if ($(".header-menu").is(":hidden")) {
        $(".show-btn").show();
      } else {
        $(".show-btn").hide();
        $(".header-info").hide();
      }
    },
     toIndex() {
      this.$router.push('/')
    }
  }
};
</script>
<style lang="css" scoped>
    @import '../../assets/css/userHeader.css'
</style>
