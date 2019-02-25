<template>
  <div :class="{'container-fluid':true, 'isFixed':toggleFixed}">
    <header class="header">
      <div class="nav container navbar-light">
        <div class="col-md-2 col-sm-3 col-xs-6">
          <div class="logo">
            <a href="index.html">
              <img :src="baseUrl+'/img/logo.png'" alt>
            </a>
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
                  <a href="#">首页</a>
                </li>
                <li>
                  <a href="#">加盟</a>
                </li>
                <li>
                  <router-link to="/UserIndex">点外卖</router-link>
                </li>
                <li>
                  <a href="#">关于我们</a>
                </li>
              </ul>
            </div>
            <div class="header-menu list-info">
              <ul>
                <li>
                  <a href="#">首页</a>
                </li>
                <li>
                  <a href="#">加盟</a>
                </li>
                <li>
                  <router-link to="/UserIndex">点外卖</router-link>
                </li>
                <li>
                  <a href="#">关于我们</a>
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
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container-fluid {
  width: 100%;
  margin: 0;
  padding: 0;
  z-index: 10;
}
.isFixed{
  position:fixed;
}
.list-info ul {
  display: flex;
  list-style: none;
  margin-bottom: 0;
}
.list-info ul li {
  height: 115px;
  margin-right: 4px;
  line-height: 115px;
  font-size: 16px;
  padding-left: 2rem;
}

@media screen and (max-width: 850px) and (min-width: 741px) {
  .fixed {
    position: static !important;
  }
}

.list-info ul li a {
  text-decoration: none;
  font-weight: bold;
  color: #535353;
  height: 100%;
  display: flex;
  text-align: center;
}
.list-info ul li a:hover {
  color: #e54c2a;
}
.nav {
  display: flex;
  padding-left: 15px;
  justify-content: space-around;
  margin: 0 auto;
}
.nav img {
  vertical-align: middle;
  margin-bottom: -23px;
  margin-right: 150px;
}
.test {
  padding-top: 30px;
  display: none;
  margin-left: 0;
}
.slider {
  width: 100%;
  height: auto;
  float: left;
  margin-top: -28.5%;
  margin-left: 17.5%;
}

@keyframes navAnimate {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
.fixed {
  position: fixed;
  z-index: 10000;
  background-color: #f5f5f5;
  width: 100%;
  top: -0px;
  animation: navAnimate 2s ease 1;
}
.header {
  background: #fff;
  box-shadow: 0px 0px 5px #ccc;
}
.header-menu {
  display: inline-block;
}
.header-right {
  float: right;
  display: flex;
  height: 100%;
  align-items: center;
  position: relative;
}
ul {
  list-style: none;
}
.show-btn {
  width: 50px;
  height: 50px;
  z-index: 100;
  cursor: pointer;
  display: none;
}
.show-btn i {
  font-size: 30px;
}

#demo {
  width: 100%;
}
.header-info {
  position: absolute;
  width: 300px;
  right: 0;
  font-size: 16px;
}

.header-info ul li {
  float: left;
  margin-left: 5%;
}
.header-info ul li a {
  color: #212529;
  font-weight: bold;
  text-decoration: none;
}
@media screen and (max-width: 910px) {
  .header-menu {
    display: none !important;
  }
}
</style>
