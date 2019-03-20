<template>
  <div>
    <my-header :toggleFixed="false"></my-header>
    <div v-if="c==0" class="noFood">
      <img :src="baseUrl+'/img/nodata.6477c5.png'" alt>
      <p>该店铺尚未添加商品</p>
    </div>
    <div class="container" v-cloak v-if="category[0]">
      <div class="business-info row m-0 mt-3">
        <div
          :class="{'left-b':true, 'col-md-6':true, 'pr-0':true, 'left-b-show-all':isTitle}"
          @mouseenter="titleEnter"
          @mouseleave="titleEnter"
        >
          <div
            :class="{'left-inner':true, 'd-flex':true, 'align-items-center':true}"
            v-if="category[0]"
          >
            <img :src="baseUrl+'/'+category[0].foods[0].shop_img" class="icon" alt>
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
              <i class="iconfont red" v-else @click="unCollect">&#xeca1;</i>
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
                v-if="food.type_name == obj.type_name"
              >
                <img :src="baseUrl+'/'+food.food_img" alt class="goods-img">
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
    <my-footer></my-footer>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      sid: "",
      user: "",
      category: [],
      foods_type: [],
      shop_car: [],
      isTitle: false,
      isCollect: false,
      isShowMedia: false,
      saveId: "",
      c: 1,
      enought: true
    };
  },
  mounted() {
    this.getSid();
    var url = `${this.baseUrl}/user/hasFood`;
    this.axios
      .get(url, {
        params: {
          sid: this.sid
        }
      })
      .then(result => {
        this.c = result.data.data.c;
        if (result.data.data.c) {
          this.load_food().then(this.bandClick);
          this.load_shop_car();
          this.isSave();
        }
      });
  },
  methods: {
    isSave: function() {
      var url = `${this.baseUrl}/user/isSave`;
      this.axios(url, {
        params: {
          sid: this.sid
        }
      }).then(result => {
        if (result.data.code == 201) {
          this.isCollect = true;
          this.saveId = result.data.data[0].id;
        } else if (result.data.code == 200) {
          this.saveId = result.data.data[0].id;
        }
      });
    },
    getSid: function() {
      this.sid = this.$route.query.sid;
    },
    mediaTitle: function() {
      this.isShowMedia = !this.isShowMedia;
    },
    Collect: function() {
      this.isCollect = true;
      var url = `${this.baseUrl}/user/isSave`;
      this.axios(url, {
        params: {
          sid: this.sid
        }
      }).then(result => {
        console.log(result.data);
        if (result.data.code == 200) {
          url = `${this.baseUrl}/user/UnSave`;
          this.axios(url, {
            params: {
              id: this.saveId,
              isDel: 0
            }
          }).then(result => {
            // console.log(result.data)
            if (result.data.code == 200) {
              this.saveId = result.data.data;
            }
          });
        } else {
          url = `${this.baseUrl}/user/SaveShop`;
          var data = qs.stringify({
            sid: this.sid
          });
          this.axios.post(url, data).then(result => {
            this.saveId = result.data.data[0].id;
          });
        }
      });
    },
    unCollect: function() {
      var url = `${this.baseUrl}/user/UnSave`;
      this.axios(url, {
        params: {
          id: this.saveId,
          isDel: 1
        }
      }).then(result => {
        /* console.log(result.data)
        console.log(this.saveId) */
        if (result.data.code == 200) {
          this.isCollect = false;
        }
      });
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
          url: `${_self.baseUrl}/user/getFoodsCatagory`,
          type: "get",
          data: {
            sid: _self.sid
          },
          dataType: "json"
        }).then(function(data) {
          _self.category = _self.category.concat(data);
          // console.log(data)
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
    load_shop_car: function() {
      var _self = this;
      var url = `${_self.baseUrl}/user/session`;
      this.axios.get(url).then(result => {
        var data = result.data.msg.name;
        this.user = result.data.msg.name;
        url = `${_self.baseUrl}/user/load_shop_car`;
        this.axios
          .get(url, {
            params: {
              user: this.user
            }
          })
          .then(result => {
            _self.shop_car = result.data;
          });
      });
    },
    toOrder: function() {
      if (this.enought) {
        // console.log('即将跳转')
        this.$router.push(`/Order?sid=${this.sid}&user=${this.user}`);
      } else {
        alert('购物车中有商品库存不足，无法下单！')
      }
      // 
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
        // console.log(data);
      });
    },
    add_to_shopCar: function(e, name, price, f_id) {
      var _self = this;
      $.ajax({
        url: `${_self.baseUrl}/user/setShopCar`,
        type: "post",
        data: {
          foods_id: f_id,
          un_price: price,
          user: this.user,
          sid: this.sid
        },
        dataType: "json"
      }).then(function(data) {
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
            element.number = parseInt(element.number);
            element.number += i;
            if (element.number <= 0) {
              element.number = 0;
              _self.load_shop_car();
            }
            var url = `${_self.baseUrl}/user/getFoodCount`;
            this.axios
              .get(url, {
                params: {
                  inventory: element.number,
                  food_id: f_id
                }
              })
              .then(res => {
                if (res.data.code == 200) {
                  this.enought = true;
                  $.ajax({
                    url: `${_self.baseUrl}/user/update_shopCar`,
                    type: "post",
                    data: {
                      foods_id: f_id,
                      number: element.number
                    },
                    dataType: "json"
                  }).then(function(data) {});
                } else {
                  alert("库存不足");
                  this.enought = false;
                }
              });
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
          element.number = parseInt(element.number);
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
    if (div) {
      div.classList.remove("fixed-div");
    }
  }
  if (scrollTop >= 500) {
    var div = document.getElementsByClassName("category")[0];
    if (div) {
      div.classList.add("fixed-div");
    }
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
<style lang="css" scoped>
@import "../assets/css/shop.css";
</style>
