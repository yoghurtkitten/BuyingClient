<template>
  <div>
    <my-header :toggleFixed="false"></my-header>

    <div class="container-fluid">
      <div class="main_img">
        <div class="address">
          <div class="inner-address p-0">
            <div class="row login_list">
              <div class="col-lg-5 col-md-8 col-sm-10 d-flex p-0">
                <div class="row detail-btn">
                  <div class="col-md-6 p-0 d-flex user">
                    <router-link to="/Login" class="btn mr-1 login_user" v-if="!user">注册/登录</router-link>
                    <a href="javascript:;" class="btn mr-1 login_user" v-else @click="{return false;}" @mouseenter="enter"
                      @mouseleave="leave">{{user}}</a>
                  </div>
                  <div class="col-md-6 p-0 pl-4">
                    <a href="#" class="new-list-btn fr btn">
                      <i class="iconfont">&#xe68d;</i>
                      我的订单
                    </a>
                  </div>
                  <div class="user-info" v-show="isToggle" @mouseenter="enter" @mouseleave="leave">
                    <ul>
                      <li>
                        <i class="iconfont">&#xe6a2;</i>
                        个人中心
                      </li>
                      <li>
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
              <a href="#" class="search-btn col-lg-2 col-md-3 col-sm-2" @click="search">搜索</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VDistpicker from "v-distpicker";
  import store from '../store/store.js';
  export default {
    components: { VDistpicker },
    data() {
      return {
        province: "湖北",
        city: "武汉",
        area: "武昌区",
        isToggle: false,
        user: store.state.user
      }
    },
    mounted: function () {
      this.getUser();
    },
    methods: {
      enter() {
        this.isToggle = true;
      },
      leave() {
        this.isToggle = false;
      },
      search: function () {
        // var data = txt_city.value.replace(/\s*/gi, "");
        // location.href = `${location.origin}/user_choose.html?address=${data}`;
        console.log(`${this.province}-${this.city}-${this.area}`);
        var address = `${this.province}-${this.city}-${this.area}`;
        this.$router.push(`/UserChoose?address=${address}`)
      },
      selected(data) {
        this.province = data.province.value.slice(0, -1);
        this.city = data.city.value.slice(0, -1);
        this.area = data.area.value;
      },
      getUser() {
        var _self = this;
        var url = 'http://127.0.0.1:5050/user/session';
        this.axios.get(url).then(result => {
          var data = result.data.msg.name;
          store.commit('setUser', data);
          this.user = result.data.msg.name;
        })
      }
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
  }

  .main_img {
    height: auto;
    width: 100%;
    overflow: hidden;
    /* position: relative; */
    background: url("http://127.0.0.1:5050/img/slider/3.jpg") no-repeat;
    background-size: cover;
  }

  .row {
    padding: 0;
    margin: 0;
  }

  ul {
    list-style: none;
  }

  .address {
    margin-top: 13%;
    display: flex;
    justify-content: center;
  }

  .container {
    width: 100%;
  }

  .inner-address {
    height: 550px;
    width: 100%;
  }

  .detail-btn div a {
    background: #fff;
    box-sizing: border-box;
    color: #333;
    font-size: 14px !important;
  }

  .new-list-btn {
    width: 96px;
    padding-left: 30px;
    box-sizing: border-box;
  }

  .fr {
    float: right;
  }

  i {
    color: #e54c2a;
  }

  .search-btn {
    background-color: #e54c2a;
    border-radius: 0;
    height: 73%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-left: 2%;
  }

  .search-btn:hover {
    text-decoration: none;
    color: #fff;
  }

  .main_img>img {
    width: 100%;
    position: relative;
    z-index: -1;
  }

  .search-form {
    height: 10%;
    width: 37%;
    margin: 0 auto;
  }

  .search-form div {
    cursor: pointer;
  }

  .search-form input {
    font-size: 16px;
    height: 100%;
  }

  .select-btn {
    height: 100%;
    float: left;
    background-color: #fff;
  }

  .select-btn:hover {
    cursor: pointer;
  }

  .login_list {
    width: 37%;
    margin: 0 auto;
  }

  .up-icon {
    width: 10px;
    border: 10px solid transparent;
    border: 9px 10px;
    border-bottom-color: #fff;
    position: absolute;
    top: 95px;
    left: 40px;
  }

  .up-icon+div {
    border-bottom: 1px solid #ddd;
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

  @media screen and (max-width: 1380px) {

    .search-form,
    .login_list {
      width: 50%;
    }
  }

  @media screen and (max-width: 1150px) {

    .search-form,
    .login_list {
      width: 60%;
    }
  }

  @media screen and (max-width: 994px) {

    .search-form,
    .login_list {
      width: 90%;
    }
  }

  @media screen and (max-width: 772px) {
    .detail-btn div {
      width: 50%;
    }
  }

  @media screen and (max-width: 576px) {

    .search-form,
    .login_list {
      width: 100%;
    }

    .select-btn {
      width: 23%;
    }

    .search-form input {
      width: 57% !important;
    }

    .search-btn {
      width: 20%;
    }

    .up-icon+div div:first-child {
      width: 30%;
      padding: 0;
    }

    .up-icon+div div:last-child {
      width: 70%;
      padding: 0;
    }
  }

  @media screen and (max-width: 468px) {
    .up-icon+div div:first-child {
      width: 50%;
    }

    .up-icon+div div:last-child {
      width: 50%;
    }

    .input-city {
      width: 100% !important;
    }
  }

  .user {
    position: relative;
  }

  .user-info {
    width: 124px;
    height: 120px;
    background: #fff;
    position: absolute;
    top: 33px;
    z-index: 5;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
  }

  .user-info>ul {
    margin: 0;
    height: 100%;
    text-align: center;
  }

  .user-info>ul>li {
    width: 90%;
    height: 25%;
    text-align: center;
    margin: 0 auto;
    margin-top: 7.5%;
  }

  .user-info>ul>li:hover {
    background: #f5f5f5;
    cursor: pointer;
  }

  .user-info>ul>li>i {
    color: #999;
  }

  .btn:not(:disabled):not(.disabled) {
    padding: 6px;
  }
</style>