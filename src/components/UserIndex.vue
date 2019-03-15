<template>
  <div>
    <my-header :toggleFixed="false"></my-header>

    <div class="container-fluid">
      <div class="main_img" :style="`background-image:url(${baseUrl}/img/slider/3.jpg)`">
        <div class="address">
          <div class="inner-address p-0">
            <div class="row login_list">
              <div class="col-lg-5 col-md-8 col-sm-10 d-flex p-0">
                <div class="row detail-btn">
                  <div class="col-md-6 p-0 d-flex user">
                    <router-link to="/Login" class="btn mr-1 login_user" v-if="!user">注册/登录</router-link>
                    <a
                      href="javascript:;"
                      class="btn mr-1 login_user"
                      v-else
                      @click="{return false;}"
                      @mouseenter="enter"
                      @mouseleave="leave"
                    >{{user}}</a>
                  </div>
                  <div class="user-info" v-show="isToggle" @mouseenter="enter" @mouseleave="leave">
                    <ul>
                      <li @click="toUserCenter">
                        <i class="iconfont">&#xe6a2;</i>
                        个人中心
                      </li>
                      <li @click="toSave">
                        <i class="iconfont">&#xec43;</i>
                        我的收藏
                      </li>
                      <li>
                        <i class="iconfont">&#xe78c;</i>
                        <router-link to="/Login" class="exit_login">退出登录</router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-group mt-2 search-form row">
              <v-distpicker province="湖北省" city="武汉市" area="武昌区" @selected="selected"></v-distpicker>
              <a
                href="javascript:;"
                class="search-btn col-lg-2 col-md-3 col-sm-2"
                @click="search"
              >搜索</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import store from "../store/store.js";
export default {
  components: { VDistpicker },
  data() {
    return {
      province: "湖北省",
      city: "武汉市",
      area: "武昌区",
      isToggle: false,
      user: store.state.user,
      baseUrl: this.$store.getters.getBaseUrl,
    };
  },
  mounted: function() {
    this.getUser();
  },
  methods: {
    enter() {
      this.isToggle = true;
    },
    leave() {
      this.isToggle = false;
    },
    search: function() {
      console.log(`${this.province}-${this.city}-${this.area}`);
      var address = `${this.province}-${this.city}-${this.area}`;
      this.$router.push(`/UserChoose/Choose?address=${address}`);
    },
    selected(data) {
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
    },
    getUser() {
      var _self = this;
      var url = `${this.baseUrl}/user/session`;
      this.axios.get(url).then(result => {
        var data = result.data.msg.name;
        store.commit("setUser", data);
        this.user = result.data.msg.name;
      });
    },
    toUserCenter() {
      this.$router.push('/UserCenter/Center');
    },
    toSave() {
      this.$router.push('/UserCenter/Save')
    }
  }
};
</script>

<style lang="css" scoped>
    @import '../assets/css/userIndex.css'
</style>