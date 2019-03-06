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
            <span>起送:￥{{obj.deliver_fee}}</span>
            <span class="pl-3">配送费:￥{{obj.deliver_cost}}</span>
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
<style scoped>
ul {
  list-style: none;
}

.detail-btn div a {
  background: #fff;
  box-sizing: border-box;
  color: #333;
  height: 34px;
}



.row {
  width: 100%;
}


a {
  text-decoration: none !important;
}

a:hover {
  text-decoration: none;
}

.list-group-item {
  z-index: 2;
}

.type-detail {
  background: #fff;
}

.business-type-title {
  width: 88px;
  height: 30px;
  padding-left: 32px;
  background-repeat: no-repeat;
  background-position-y: center;
  background-size: 28%;
  font-size: 14px;
  margin-right: 1.5%;
  line-height: 30px;
}

.type-detail p {
  margin-right: 1.5%;
  height: 30px;
  line-height: 30px;
}

.type-detail ul {
  height: 30px;
  display: flex;
  align-items: center;
}

.type-detail ul li {
  float: left;
  margin-right: 5%;
}

.type-detail ul li a {
  color: #333;
}

.type-detail ul li .active {
  color: #e54c2a;
}

.type-detail > div > input {
  width: 234px;
  height: 38px;
  border: 1px solid #e5e5e5;
  margin-left: 20%;
}

.type-detail > div > a {
  width: 49px;
  height: 38px;
  border: 1px solid #e5e5e5;
}

.type-detail a span {
  display: inline-block;
  color: #101010;
}

@media screen and (max-width: 1200px) {
  .container {
    padding: 0;
    margin: 0;
    max-width: 100% !important;
    width: 100%;
  }
}


/* 499 */
@media screen and (max-width: 499px) {
  .type-detail ul li {
    margin-right: 1.4%;
  }
}

.star i {
  color: #e54c2a;
}

.detail-list {
  width: 100%;
  box-shadow: 0px 0px 5px #ccc;

  background: #fff;
  overflow: auto;
}

.detail-list > ul > li {
  width: 210px;
  height: 288px;
  display: list-item;
  float: left;
  margin: 1.5%;
  margin-left: 4%;
}

.detail-list > ul > li:nth-child(4n + 1) {
  margin-left: 2.2% !important;
}

.detail-list li img {
  width: 100%;
  border: 1px solid #eaeaea;
}

.detail-list > ul > li .business-title {
  font-size: 16px;
  color: #313131;
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 5%;
  margin-bottom: 3%;
}

.descript,
.star {
  margin-bottom: 1%;
}

.descript,
.star span {
  font-size: 12px;
  color: #707070;
}

.descript span:last-child {
  margin-left: auto;
}

.load {
  height: 54px;
  /* border: 1px solid #ccc; */
  border-top: 1px solid transparent;
  box-shadow: 0 2px 5px #ccc;
  text-align: center;
  background-image: linear-gradient(to bottom, #f5f2f2, #e8e3e3);
  color: #777;
}

.load p {
  margin: 0;
  padding: 0;
  line-height: 54px;
  cursor: pointer;
}

.search-mode {
  margin-bottom: 200px !important;
}

.search-mode > ul > li {
  display: block;
  clear: both;
  width: 100%;
  /* border: 1px solid #000; */
  margin: 0;
  padding: 0;
  margin-bottom: 1em;
  /* padding-left: 2%; */
  height: auto !important;
  background: #f5f5f5;
  box-shadow: 0px 0px 5px #ccc;
}

.search-mode > ul > li:nth-child(4n + 1) {
  margin-left: 0 !important;
}

.search-mode > ul > li > div {
  margin-bottom: 10px !important;
  padding-left: 2%;
}

.search-mode > ul > li > div > span {
  margin-left: 3%;
}

.search-mode > ul > li > h4 {
  margin-top: 15px;
  margin-bottom: 5px !important;
  padding-left: 2%;
  font-family: "PingFang SC", "Lantinghei SC", "Helvetica Neue",
    "Microsoft Yahei", "Hiragino Sans GB", "Microsoft Sans Serif",
    "WenQuanYi Micro Hei", sans;
  font-size: 16px;
}

.search-mode > ul > li > ul {
  border-top: 1px solid #e4e3e3;
}

.search-mode > ul > li > ul > li {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-left: 1.5%;
  padding-right: 5%;
  padding-top: 1%;
  padding-bottom: 1%;
  font-size: 14px;
}

.search-mode > ul > li > ul > li > div > div > p {
  margin: 0;
  padding: 0;
}

.search-mode > ul > li > ul > li > div > div > p:first-child {
  color: #e54c2a;
}

.search-mode > ul > li > ul > li > div > div {
  text-align: center;
}

.right-choose {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
}

.buying {
  display: inline-block;
  width: 40%;
  color: #fff;
  text-align: center;
  line-height: 2.3em;
  border-radius: 5px;
  background: #e54c2a;
}

[v-cloak] {
  display: none;
}
</style>