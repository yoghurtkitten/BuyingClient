<template>
  <div>
    <div class="type-detail row d-flex align-content-center m-0 pl-3 mt-2 pt-3 pb-3">
      <div class="col-lg-1 col-md-12 p-0">
        <div class="business-type-title" :style="`background-image:url(${baseUrl}/img/small_img/new-icon-sort.png)`">商家分类</div>
      </div>
      <div class="col-lg-7 col-md-8 col-sm-12">
        <ul class="list-unstyled m-0">
          <li v-for="(item, index) in type" :key="index">
            <a
              href="javascript:;"
              v-text="item.name"
              v-if="index==0"
              @click="loadAll"
              :class="{'active':item.isActive}"
            ></a>
            <a
              href="javascript:;"
              v-text="item.name"
              v-else
              @click="select_type(item.name,index)"
              :class="{'active':item.isActive}"
            ></a>
          </li>
        </ul>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 d-flex">
        <input
          type="text"
          placeholder="搜索商家，美食"
          class="align-self-center pl-3"
          id="search_business"
          v-model="search_shop"
          @keyup.13="search"
        >
        <a href="#" class="d-flex align-items-center justify-content-center" @click="search">
          <i class="iconfont">&#xe694;</i>
        </a>
      </div>
    </div>
    <div class="detail-list m-0 mt-3" id="busi_list">
      <ul v-for="(obj, index) in shop_item" :key="index">
        <li @click="choose_shop(obj.id)">
          <img :src="baseUrl+'/'+obj.shop_img" alt>
          <p class="business-title">{{obj.shop_name}}</p>
          <div class="star">
            <i class="iconfont" v-for="n in obj.shop_start" :key="n">&#xec43;</i>
            <span>{{obj.shop_start}}分</span>
          </div>
          <p class="descript d-flex align-items-center">
            <span>起送:￥{{obj.deliver_cost}}</span>
            <span class="pl-3">配送费:￥{{obj.deliver_fee}}</span>
            <span>
              <i class="iconfont">&#xe784;</i>
              {{obj.deliver_time}}分钟
            </span>
          </p>
          <input type="hidden" :value="obj.id" id="busi_id">
        </li>
      </ul>
    </div>
    <div class="load" @click="load">
      <p>点击加载更多商家...</p>
    </div>
  </div>
</template>
<script>
import store from "../../store/store.js";

export default {
  props: ["parentdata"],
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      user: store.state.user,
      data: this.parentdata,
      pageAddress: "",
      shop_item: [],
      search_shop: "",
      loading: "",
      type: [
        { name: "全部", isActive: true },
        { name: "美食", isActive: false },
        { name: "正餐优选", isActive: false },
        { name: "精选小吃", isActive: false },
        { name: "下午茶", isActive: false }
      ]
    };
  },
  mounted: function() {
    this.setData();
    this.ajax_get_data("getlist", this.data, 0),
      (this.loading = this.loadMore());
  },
  methods: {
    load: function() {
      var typeName = $(".active").text();
      var obj = this.loading(typeName);
      if (typeName == "全部") {
        this.ajax_get_data("getlist", this.data, obj[typeName]);
      } else {
        this.ajax_get_data("getlist", this.data, typeName, obj[typeName]);
      }
    },
    search: function() {
      var business = this.search_shop;
      this.$emit("search", this.search_shop);
    },
    setData: function() {
      // var urlParams = new URLSearchParams(location.search);
      // this.data = urlParams.get('address');
      this.data = this.$route.query.address;
      var title_address = this.data.split("-");
      this.pageAddress = title_address[1] + " " + title_address[2];
    },
    ajax_get_data: function(...arr) {
      var data = {};
      if (arr.length == 3) {
        data = {
          address: arr[1],
          n: arr[2]
        };
      } else {
        data = {
          address: arr[1],
          type: arr[2],
          n: arr[3]
        };
      }
      var _self = this;
      $.ajax({
        url: `${this.baseUrl}/user/${arr[0]}`,
        data: data,
        dataType: "json",
        type: "get"
      }).then(function(result) {
        // console.log(result)
        _self.shop_item = _self.shop_item.concat(result);
      });
    },
    loadAll: function() {
      for (const key in this.type) {
        if (this.type.hasOwnProperty(key)) {
          const element = this.type[key];
          element.isActive = false;
        }
      }
      this.type[0].isActive = true;
      this.shop_item = [];
      this.ajax_get_data("getlist", this.data, 0);
    },
    select_type: function(item, index) {
      for (const key in this.type) {
        if (this.type.hasOwnProperty(key)) {
          const element = this.type[key];
          element.isActive = false;
        }
      }
      this.type[index].isActive = true;
      this.shop_item = [];
      this.ajax_get_data("getlist", this.data, item, 0);
    },
    loadMore: function() {
      var typeIndex = {
        全部: 0,
        美食: 0,
        正餐优选: 0,
        精选小吃: 0,
        下午茶: 0
      };
      return function(str) {
        typeIndex[str]++;
        return typeIndex;
      };
    },
    choose_shop: function(sid) {
      if ($(".login_user").text() == "注册/登录") {
        alert("请登录");
      } else {
        this.$router.push(`/Shop?sid=${sid}`);
      }
    }
  }
};
</script>
<style lang="css" scoped>
    @import '../../assets/css/choose.css'
</style>