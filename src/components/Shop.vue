<template>
  <div>
    <my-header :toggleFixed="false"></my-header>
    <div class="container" v-cloak>
      <div class="business-info row m-0 mt-3">
        <div
          :class="{'left-b':true, 'col-md-6':true, 'pr-0':true, 'left-b-show-all':isTitle}"
          @mouseenter="titleEnter"
          @mouseleave="titleEnter"
        >
          <div :class="{'left-inner':true, 'd-flex':true, 'align-items-center':true}">
            <img src="http://127.0.0.1:5050/img/business/business-icon.png" class="icon" alt>
            <div class="ml-2">
              <p class="busin-title" v-if="category[0]">
                <span>{{category[0].foods[0].shop_name}}</span>
                <i class="iconfont" v-if="!isTitle">&#xeb6d;</i>
                <i class="iconfont" v-else>&#xeb6e;</i>
              </p>
              <div class="star" v-if="category[0]">
                <i
                  class="iconfont"
                  v-for="(item, index) in category[0].foods[0].shop_start"
                  :key="index"
                >&#xec43;</i>
                <span>{{category[0].foods[0].shop_start}}分</span>
              </div>
            </div>
          </div>
          <div class="mt-3 pl-2">
            <p>
              <i class="iconfont">&#xe68f;</i>
              <span>营业时间</span>
              <span>07:00-20:15</span>
            </p>
            <p>
              <i class="iconfont">&#xec3f;</i>
              <span>商家地址</span>
              <span class="shop_address" v-if="category[0]">{{category[0].foods[0].shop_name}}</span>
            </p>
            <p>
              <i class="iconfont">&#xe678;</i>
              <span>商家电话</span>
              <span class="shop_tel" v-if="category[0]">{{category[0].foods[0].shop_phone}}</span>
            </p>
          </div>
        </div>
        <div class="taggle-btn" @click="mediaTitle">
          <i class="iconfont">&#xec0b;</i>
        </div>
        <div
          :class="{'right-b':true, 'col-md-6':true, 'col-sm-5':true, 'p-0':true, 'media-title':isShowMedia}"
        >
          <div
            class="d-flex justify-content-between align-items-center detail-info"
            v-if="category[0]"
          >
            <div class="deliver_time">
              <p>平均送餐时间</p>
              <p>
                <span>{{category[0].foods[0].deliver_time}}</span>分钟
              </p>
            </div>
            <div class="deliver_cost">
              <p>起送</p>
              <p>
                <span>{{category[0].foods[0].deliver_cost}}</span>元
              </p>
            </div>
            <div class="deliver_fee">
              <p>配送费</p>
              <p>
                <span>{{category[0].foods[0].deliver_fee}}</span>元
              </p>
            </div>
          </div>
          <div class="save d-flex justify-content-center p-0 m-0">
            <div class="align-self-center">
              <p>收藏本店</p>
              <i class="iconfont" v-if="!isCollect" @click="Collect">&#xeca2;</i>
              <i class="iconfont red" v-else @click="Collect">&#xeca1;</i>
            </div>
          </div>
        </div>
      </div>
      <div class="tabber m-0 p-0 mt-3 row">
        <ul class="d-flex justify-content-around col-xl-4 col-lg-4 col-md-4 col-sm-5 p-0">
          <li>
            <a href="#">所有商品</a>
          </li>
          <li>
            <a href="#">评价</a>
          </li>
          <li>
            <a href="#">商家资质</a>
          </li>
        </ul>
        <div class="offset-xl-3 col-xl-5 offset-lg-1 col-lg-7 offset-md-2 col-md-6 col-sm-7 p-0">
          <ul class="d-flex sort-info m-0">
            <li>
              <a href="#" class="rank">
                <i class="iconfont">&#xe73f;</i>
                <i class="iconfont">&#xe742;</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="food_item" v-if="category[0]">
        <div class="d-flex">
          <div class="category mt-3">
            <ul class="d-flex flex-wrap pt-3 pl-4 m-0" v-if="category[0]">
              <li v-for="(obj, index) in category[0].catagory" :key="index">
                <a href="javascript:;" :data-target="'#item'+(index+1)">{{obj.type_name}}</a>
              </li>
            </ul>
          </div>
          <div class="mt-3 concat">
            <p>商家公告</p>
            <div>
              <h4>配送说明</h4>
              <p v-if="category[0]">配送费 ￥{{category[0].foods[0].deliver_fee}}</p>
            </div>
          </div>
        </div>
        <div
          v-if="category[0]"
          v-for="(obj, index) in category[0].catagory"
          :key="index"
          class="goods"
          :id="'item'+(index+1)"
        >
          <div class="goods-type">
            <p class="goods-title" id="item1">{{obj.type_name}}</p>
            <ul>
              <li
                v-for="(food, index) in category[0].foods"
                :key="index"
                v-if="food.foot_type == obj.type_name"
              >
                <img :src="'http://127.0.0.1:5050/'+food.food_img" alt class="goods-img">
                <div>
                  <p>{{food.name}}</p>
                  <p>{{food.ingredients}}</p>
                  <div class="star">
                    <i class="iconfont">&#xec43;</i>
                    <i class="iconfont">&#xec43;</i>
                    <i class="iconfont">&#xec43;</i>
                    <i class="iconfont">&#xec43;</i>
                    <i class="iconfont">&#xec43;</i>
                    <span>({{food.food_start}}分)月售200+份</span>
                  </div>
                  <p v-if="getCount(food.food_id)<1">
                    <span class="price">￥{{food.price}}</span>
                    <a
                      href="javascript:;"
                      @click="add_to_shopCar($event,food.name,food.price,food.food_id)"
                    >加入购物车</a>
                    <input type="hidden" class="food_id" :value="food.food_id">
                  </p>
                  <div v-if="getCount(food.food_id)>=1" class="change_food_count">
                    <span class="price">￥{{food.price}}</span>
                    <p>
                      <button @click="change(-1, food.food_id)">-</button>
                      <input type="text" :value="getCount(food.food_id)">
                      <button @click="change(+1, food.food_id)">+</button>
                      <input type="hidden" class="food_id" :value="food.food_id">
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="shop-car">
        <div>
          <p>
            <span>购物车</span>
            <span @click="clear">
              <a href="javascript:;">[清空]</a>
            </span>
          </p>
          <i class="iconfont">&#xe640;</i>
        </div>
        <div v-for="(obj, index) in shop_car" :key="index">
          <div class="shop-item">
            <ul>
              <li>
                <span class="goods-name">{{obj.name}}</span>
                <p>
                  <button @click="change(-1, obj.fid)">-</button>
                  <input type="text" v-model="obj.number">
                  <button @click="change(+1, obj.fid)">+</button>
                  <input type="hidden" :value="obj.fid">
                </p>
                <span class="unprice">￥{{obj.un_price * obj.number}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <a href="#">
            <i class="iconfont">&#xe63f;</i>
            <i class="number">{{count_total}}</i>
            <span>￥</span>
            <span class="total">{{price_total}}</span>
            <span></span>
          </a>
          <a href="#">
            <span @click="toOrder">去结算 ></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sid: "",
      user: "",
      category: [],
      foods_type: [],
      shop_car: [],
      isTitle: false,
      isCollect: false,
      isShowMedia: false
    };
  },
  mounted() {
    this.getSid();
    this.load_food().then(this.bandClick);
    this.load_shop_car();
  },
  methods: {
    getSid: function(){
      this.sid = this.$route.query.sid;
    },
    mediaTitle: function() {
      this.isShowMedia = !this.isShowMedia;
    },
    Collect: function() {
      this.isCollect = !this.isCollect;
    },
    titleEnter: function() {
      this.isTitle = !this.isTitle;
    },
    getCount: function(food_id) {
      for (const key in this.shop_car) {
        if (this.shop_car.hasOwnProperty(key)) {
          const element = this.shop_car[key];
          if (element.fid == food_id) {
            return element.number;
          }
        }
      }
      return 0;
    },
    load_food: function() {
      var _self = this;
      return new Promise(function(open) {
        $.ajax({
          url: "http://127.0.0.1:5050/user/getFoodsCatagory",
          type: "get",
          data: {
            sid: _self.sid
          },
          dataType: "json"
        }).then(function(data) {
          _self.category = _self.category.concat(data);
          open();
        });
      });
    },
    bandClick: function() {
      return new Promise(function(open) {
        $(".category ul li:first-child").addClass("type-active");
        $(".category>ul").on("click", "li", function(e) {
          $(this)
            .addClass("type-active")
            .siblings("li")
            .removeClass("type-active")
            .css({ background: "#fff" });
        });
        $(".category ul li").hover(
          function() {
            $(this)
              .not(".type-active")
              .css({ background: "#eee" });
          },
          function() {
            $(this)
              .not(".type-active")
              .css({ background: "#fff" });
          }
        );
      });
    },
    set_sid_user: function() {
      var urlParams = new URLSearchParams(location.search);
      this.sid = urlParams.get("sid");
      this.user = urlParams.get("user");
    },
    load_shop_car: function() {
      var _self = this;
      var url = "http://127.0.0.1:5050/user/session";
      this.axios.get(url).then(result => {
        var data = result.data.msg.name;
        this.user = result.data.msg.name;
        url = "http://127.0.0.1:5050/user/load_shop_car";
        this.axios.get(url, {
          params:{
            user: this.user
          }
        }).then(result => {
          _self.shop_car = result.data;
        })
      });
    },
    toOrder: function() {
      this.$router.push(`/Order?sid=${this.sid}&user=${this.user}`);

    },
    clear: function() {
      this.shop_car = [];

      $.ajax({
        url: "/user/delete_shop_car",
        type: "get",
        dataType: "json",
        data: {
          user: this.user
        }
      }).then(function(data) {
        console.log(data);
      });
    },
    add_to_shopCar: function(e, name, price, f_id) {
      var _self = this;
      $.ajax({
        url: "http://127.0.0.1:5050/user/setShopCar",
        type: "post",
        data: {
          foods_id: f_id,
          un_price: price,
          user: this.user,
          sid: this.sid
        },
        dataType: "json"
      }).then(function(data) {
        console.log("重新加载");
        _self.load_shop_car();
      });
      for (const key in this.category[0].foods) {
        if (this.category[0].foods.hasOwnProperty(key)) {
          const element = this.category[0].foods[key];
        }
      }
    },
    change: function(i, f_id) {
      var _self = this;
      for (const key in this.shop_car) {
        if (this.shop_car.hasOwnProperty(key)) {
          const element = this.shop_car[key];
          if (element.fid == f_id) {
            element.number += i;
            if (element.number <= 0) {
              element.number = 0;
              _self.load_shop_car();
            }
            console.log(element.number);
            $.ajax({
              url: "http://127.0.0.1:5050/user/update_shopCar",
              type: "post",
              data: {
                foods_id: f_id,
                number: element.number
              },
              dataType: "json"
            }).then(function(data) {});
          }
        }
      }
    }
  },
  computed: {
    count_total: function() {
      var sum = 0;
      for (const key in this.shop_car) {
        if (this.shop_car.hasOwnProperty(key)) {
          const element = this.shop_car[key];
          sum += element.number;
        }
      }
      return sum;
    },
    price_total: function() {
      var sum = 0;
      for (const key in this.shop_car) {
        if (this.shop_car.hasOwnProperty(key)) {
          const element = this.shop_car[key];
          sum += element.number * element.un_price;
        }
      }
      return sum.toFixed(2);
    }
  }
};

$(window).resize(function() {
  if ($(".taggle-btn").css("display") == "none") {
    $(".right-b").css("display", "inherit");
    $(".right-b").css("border", "none");
  } else {
    $(".right-b").css("display", "none");
  }
});
window.onscroll = function() {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  if (scrollTop < 500) {
    var div = document.getElementsByClassName("category")[0];
    div.classList.remove("fixed-div");
  }
  if (scrollTop >= 500) {
    var div = document.getElementsByClassName("category")[0];
    div.classList.add("fixed-div");
  }
  if ($(".goods").length > 0) {
    var windowTop = 500;
    var arr = {};
    var goods_div = document.getElementsByClassName("goods");
    for (const elem of goods_div) {
      arr[$(elem).attr("id")] = elem.scrollHeight;
    }

    var countLeft = 0,
      countRight = 0;
    for (const key in arr) {
      countLeft = countRight;
      countRight += arr[key];
      if (
        scrollTop > windowTop + countLeft &&
        scrollTop < windowTop + countRight
      ) {
        $(`a[data-target="#${key}"]`)
          .parent()
          .addClass("type-active")
          .siblings()
          .removeClass("type-active");
      }
    }
  }
};
</script>
<style scoped>
.media-title {
  box-shadow: 0 0 5px #ccc;
  display: inherit !important;
}
ul {
  list-style: none !important;
}
.business-info {
  position: relative;
  height: 120px;
  background: #fff;
  /* min-width: 690px; */
}

.busin-title {
  color: #333;
  font-size: 14px;
  font-weight: bold;
}

.left-b {
  width: 40%;
  height: 100%;
  /* border: 1px solid #000; */
  padding-top: 1.35%;
  padding-left: 1.4%;
  overflow: hidden;
  z-index: 10;
  min-width: 345px;
}

.left-b:last-child {
  z-index: 1;
}

.left-b-show-all {
  height: 200%;
  background: #fff;
  box-shadow: 1px 1px 5px #ccc;
  overflow: inherit !important;
}

.icon {
  height: 90px;
}

.icon + div {
  /* width: 40%; */
  height: 60%;
}

.star i {
  color: #e54c2a;
}

.red {
  color: #e54c2a !important;
}

.left-inner + div p span {
  font-size: 12px;
  color: #666;
}

.left-inner + div p i {
  display: inline-block;
  color: #666;
  margin-right: 3%;
  font-size: 12px;
}
.right-b {
  min-width: 345px;
  display: flex;
  justify-content: space-between;
}

.right-b div i {
  font-size: 23px;
  color: #6a6a6a;
  cursor: pointer;
}
.detail-info {
  width: 50%;
  margin-left: 20%;
}

.detail-info div p {
  font-size: 12px;
  color: #6a6a6a;
  margin: 0;
}

.detail-info div p span {
  font-size: 28px;
  font-weight: bold;
  color: #4a4a4a;
}

.detail-info > div {
  height: 42%;
  /* border: 1px solid #000; */
}

.right-b div:last-child p {
  font-size: 12px;
  color: #6a6a6a;
}

.save {
  width: 50%;
  flex: 0 0 18%;
  box-sizing: border-box;
  border-left: 1px dashed #e5e5e5;
}

.save div {
  height: 50%;
  text-align: center;
  width: 120px;
}
.container > .row {
  width: 100%;
}
.tabber {
  height: 59px;
  /* border: 1px solid #000; */
  background: #fff;
  width: 100%;
}
.tabber div {
  display: flex;
  justify-content: flex-end;
}
.tabber ul {
  width: 336px;
  /* border: 1px solid #000; */
  margin-bottom: 0;
  /* margin-right: 3%; */
}
.tabber ul li a {
  text-decoration: none;
  line-height: 55px;
  color: #333;
  font-size: 16px;
}
.sort-info {
  color: #333;
  font-size: 16px;
}
.sort-info i {
  color: #999;
}
.tabber ul li:last-child > a {
  display: inline-block;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.rank i {
  font-size: 22px;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  float: left;
  /* margin-right: 10px; */
  padding-left: 7%;
  border: 1px solid #999;
}
.rank i:first-child {
  border: none;
  color: #fff;
  background: #e54c2a;
}
.category {
  width: 80%;
  /* border: 1px solid #000; */
  background: #fff;
}
.category ul li {
  width: 18%;
  margin-bottom: 0.7%;
  margin-left: 2%;
  padding: 1%;
}
.category ul li a {
  font-size: 14px;
  color: #666;
  text-decoration: none;
}
.concat {
  border: 1px solid #eee;
  width: 18.5%;
  margin-left: 1.5%;
}
.concat > p,
.concat div {
  margin: 0;
  padding: 5%;
}
.concat p:first-child {
  font-size: 0.8rem;
  height: 30%;
  background: #e54c2a;
  color: #fff;
}

h4 {
  font-size: 14px;
  font-weight: 700;
}
.concat > p > p {
  font-size: 14px;
}
.goods-title {
  font-size: 20px;
  color: #333;
  padding: 0 0 0 2%;
}
.goods {
  width: 80%;
  padding: 0;
  margin: 0;
  margin-top: 3%;
}
.goods-type > p {
  margin-top: 3%;
  margin-bottom: 0;
}
.goods-type ul {
  margin: 0;
  padding: 0;
  display: inline-block;
  width: 100%;
}
.goods-type ul li {
  width: 49%;
  float: left;
  display: flex;
  border: 1px solid #eee;
  margin-top: 1.5%;
  /* border: 1px solid #000; */
}
.goods-type ul li:nth-child(2n-1) {
  margin-right: 2%;
}
.goods-type ul li p {
  padding: 0;
  margin: 0;
}
.goods-type ul li > p {
  display: flex;
  justify-content: space-between;
}
.goods-type ul li > div {
  padding-left: 3%;
  background: #fff;
  width: 79%;
  padding-top: 2%;
}
.goods-type ul li > div > p:first-child {
  font-size: 14px;
  font-weight: 700;
}
.goods-type ul li > div > p:nth-child(2),
.star span {
  font-size: 12px;
  color: #999;
}
.goods-type ul li > div > p:last-child {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
}
.price {
  font-size: 14px;
  font-weight: 700;
  color: #e54c2a;
}
.price + a {
  display: inline-block;
  width: 90px;
  height: 26px;
  text-decoration: none;
  background: #e54c2a;
  color: #fff;
  text-align: center;
  line-height: 26px;
  border-radius: 15%/50%;
}
.goods-scroll {
  width: 100%;
  position: relative;
}
.shop-car {
  position: fixed;
  /* top: 0; */
  right: 0;
  bottom: 0px;
  z-index: 1000;
  width: 320px;
  border-top: 2px solid #e54c2a;
  background: #fff;
  box-shadow: 0 1px 15px #ccc;
}
.shop-car div:first-child {
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  height: 45px;
}
.shop-car div:first-child p {
  margin-left: 3%;
}
.shop-car div:first-child p span {
  font-size: 14px;
  font-family: "PingFang SC", "Lantinghei SC", "Helvetica Neue",
    "Microsoft Yahei", "Hiragino Sans GB", "Microsoft Sans Serif",
    "WenQuanYi Micro Hei", sans;
  line-height: 45px;
}
.shop-car div:first-child i {
  font-size: 23px;
  font-weight: bold;
  color: #e54c2a;
}
.shop-car div:last-child {
  position: relative;
  height: 46px;
}
.shop-car div:last-child a {
  float: left;
  height: 100%;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shop-car div:last-child a:first-child {
  width: 60%;
  background: #000;
}
.shop-car div:last-child a:first-child i:first-child {
  font-size: 23px;
  font-weight: bold;
  color: #fff;
}
.shop-car div:last-child a:last-child {
  width: 40%;
  background: #e54c2a;
  font-size: 14px;
  font-weight: bold;
}
.number {
  display: inline-block;
  width: 18px;
  height: 18px;
  background: #e54c2a;
  border-radius: 50%;
  color: #fff;
  font-style: normal;
  font-size: 12px;
  text-align: center;
  position: absolute;
  top: 10%;
  left: 16%;
}
.total {
  font-size: 24px;
}
.total + span {
  font-size: 12px;
  color: #999;
}
@media screen and (max-width: 1005px) {
  .goods-type ul li {
    width: 98%;
  }
}
@media screen and (max-width: 770px) {
  .detail-info {
    margin-left: 0;
  }
  .right-b {
    background: #fff;
    z-index: 10000;
    height: 120px;
    justify-content: space-around;
    display: none;
    /* display: inherit */
  }
  .taggle-btn {
    display: block !important;
  }
  .concat {
    display: none;
  }
  .category {
    width: 100%;
  }
  .goods {
    width: 100%;
    margin-right: 0;
  }
  .shop-car {
    left: 10%;
  }
}

@media screen and (max-width: 580px) {
  .tabber {
    height: 104px;
  }
  .tabber div {
    justify-content: center;
  }
}
.goods-img {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}
.taggle-btn {
  width: 37px;
  height: 50px;
  display: none;
  text-align: center;
  position: absolute;
  z-index: 100;
  right: 10px;
}
.taggle-btn i {
  font-size: 32px;
  line-height: 80px;
  cursor: pointer;
}
.shop-item ul {
  width: 100%;
}
.shop-item ul li {
  display: flex;
  border-bottom: 1px solid #eee;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  padding: 0 5% 0 5%;
}
.shop-item ul li p {
  margin: 0;
  padding: 0;
  width: 30%;
  display: flex;
}
.shop-item ul li p button {
  display: inline-block;
  height: 20px;
  width: 25%;
  border: 1px solid #ddd;
  text-align: center;
  background: #fff;
  color: #666;
}
.shop-item ul li p input {
  border: 1px solid transparent;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  height: 20px;
  width: 38%;
  text-align: center;
  color: #666;
}
a {
  text-decoration: none !important;
}

.type-active {
  background: #e54c2a !important;
}
.type-active a {
  color: #fff !important;
}
.fixed-div {
  position: fixed;
  top: 0;
  margin-top: 0px !important;
  box-shadow: 0px 0px 5px #ccc;
}
[v-cloal] {
  display: none;
}
.change_food_count {
  display: flex;
  justify-content: space-between;
}
.change_food_count > p {
  display: flex;
}
.change_food_count > p > button {
  display: inline-block;
  height: 100%;
  width: 17%;
  border: 1px solid #ddd;
  text-align: center;
  background: #fff;
  color: #666;
}
.change_food_count > p > input {
  border: 1px solid transparent;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  height: 100%;
  width: 22%;
  text-align: center;
  color: #666;
}
</style>
