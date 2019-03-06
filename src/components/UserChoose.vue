<template>
  <div>
    <my-header :toggleFixed="false"></my-header>
    <div class="container-fluid" id="app" v-cloak>
      <div class="container">
        <div class="section">
          <div class="business-type">
            <div class="row m-0 mt-5">
              <div class="col-lg-9 col-md-6 row m-0 position-relative">
                <div class="col-lg-3 col-md-5 d-flex align-items-center pr-0">
                  <i class="iconfont">&#xec3f;</i>
                  <span class="ml-1">{{pageAddress}}</span>
                </div>
                <div class="col-lg-2 col-md-5 d-flex align-items-center p-0">
                  <router-link to="/UserIndex" class="ml-3 mr-4 select-address">[切换地址]</router-link>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 row detail-btn m-0">
                <div class="col-md-6 col-sm-3 col-xs-6 offset-6 p-0 m-0">
                  <router-link to="/Login" class="btn mr-1 login_user" v-if="!user">注册/登录</router-link>
                  <a
                    href="javascript:;"
                    class="btn mr-1 login_user"
                    v-else
                    @click="{return false;}"
                  >{{user}}</a>
                </div>
                <div class="col-md-6 col-sm-3 col-xs-6 p-0">
                  <router-link to="/UserCenter/Center" class="new-list-btn fr btn">
                    <i class="iconfont">&#xe68d;</i>
                    我的订单
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <my-choose v-if="!issearch" :parentdata="data" @search="currentSearch"></my-choose>
          <my-search
            v-if="issearch"
            :parentuser="user"
            :parentaddress="address"
            :parentbusiness="business"
            @comeback="comeback"
          ></my-search>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import store from "../store/store.js";
import myChoose from "./shop_search/Choose.vue";
import mySearch from "./shop_search/UserSearch.vue";
export default {
  data() {
    return {
      user: "",
      data: "",
      pageAddress: "",
      address: "",
      issearch: false,
      business: "",
      baseUrl: this.$store.getters.getBaseUrl
    };
  },
  mounted: function() {
    this.setData();
    this.getUser();
  },
  methods: {
    getUser: function() {
      var url = `${this.baseUrl}/user/session`;
      this.axios.get(url).then(result => {
        var data = result.data.msg.name;
        this.user = result.data.msg.name;
      });
    },
    currentSearch(val) {
      console.log("parent" + val);
      this.business = val;
      this.issearch = true;
    },
    change() {
      this.issearch = true;
    },
    comeback() {
      this.issearch = false;
    },
    setData: function() {
      this.data = this.$route.query.address;
      var title_address = this.data.split("-");
      this.address = this.data;
      this.pageAddress = title_address[1] + " " + title_address[2];
    }
  },
  components: { myChoose, mySearch }
};
</script>
<style lang="css" scoped>
    @import '../assets/css/userChoose.css'
</style>