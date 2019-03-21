<template>
  <div>
    <my-header :toggleFixed="false"></my-header>
    <div>
      <div class="container">
        <section v-if="has_food">
          <div v-if="orderInfo[0]">
            <p></p>
            <p>{{orderInfo[0].shop_name}}</p>
            <p>确认购买</p>
          </div>
          <div>
            <div>
              <ul v-if="orderInfo[0]">
                <li>
                  <span>订单详情</span>
                  <span>
                    <a href="javascript:;">返回商家修改</a>
                  </span>
                </li>
                <li>
                  <span>菜品</span>
                  <span>份数/价格</span>
                </li>
                <li class="food" v-if="orderInfo" v-for="obj in orderInfo">
                  <span>{{obj.name}}</span>
                  <span>￥{{obj.un_price}}*{{obj.number}}</span>
                </li>
                <li>
                  <span>配送费</span>
                  <span>￥{{orderInfo[0].deliver_fee}}</span>
                </li>
                <li>
                  <span>
                    ￥
                    <span data-total>{{getTotal(orderInfo[0].deliver_fee)}}</span>
                  </span>
                </li>
              </ul>
              <div :style="`background-image:url(${baseUrl}/img/order-bot-bg1.png)`"></div>
            </div>
            <div data-right>
              <h2 data-target="#modal" data-toggle="my-modal">
                收货地址
                <a href="javascript:;" @click="show_address">添加新地址</a>
              </h2>
              <div class="add-address" data-add-address v-if="!address[0]">
                <i>+</i>
                <span @click="show_address">添加新地址</span>
              </div>
              <div>
                <div data-address-list :class="{'showFirst':isShowAdderss}">
                  <div
                    v-if="address"
                    class="add-address has-address"
                    :class
                    v-for="obj in address"
                    @click.stop="checkAddress($event, obj.id)"
                  >
                    <i class="iconfont">&#xe64d;</i>
                    <span>
                      <span>{{obj.receiver}} {{obj.gender | changeGender}} {{obj.phone}}</span>
                      <span>{{obj.address}}</span>
                    </span>
                    <div>
                      <i class="iconfont">&#xebe6;</i>
                    </div>
                  </div>
                </div>
                <div @click="changeShow">
                  <p v-if="showFitst">
                    显示更多地址
                    <i class="iconfont">&#xeb6d;</i>
                  </p>
                  <p v-if="!showFitst">
                    收起
                    <i class="iconfont">&#xeb6e;</i>
                  </p>
                </div>
              </div>
              <div>
                <h2>
                  付款方式
                  <span>推荐使用在线支付，不用找零，优惠更多</span>
                </h2>
                <div class="pay_method">
                  <p>在线支付</p>
                  <p>支持微信、支付宝、QQ钱包及大部分银行卡</p>
                  <div class="tabs">
                    <i class="iconfont">&#xebe6;</i>
                  </div>
                </div>
              </div>
              <div class="another-info">
                <h2>其他信息</h2>
                <div>
                  <span>送达时间</span>
                  <p @click="toggleTime">
                    <span
                      v-if="typeof(deliver_time)=='number'"
                    >{{new Date(deliver_time).getHours()}}:{{new Date(deliver_time).getMinutes()}}</span>
                    <span v-if="typeof(deliver_time)=='string'">{{deliver_time}}</span>
                    <i class="iconfont">&#xeb6d;</i>
                  </p>
                  <div class="time" v-show="show_time" @mouseleave="timeLeave">
                    <ul>
                      <li @click="chooseTime('立即送达')">立即送达</li>
                      <li v-for="i in 5" @click="chooseTime(time+(i+1)*900000)">
                        {{new Date(time+(i+1)*900000).getHours()}}:{{new
                        Date(time+(i+1)*900000).getMinutes()}}
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <span>订单备注</span>
                  <input
                    type="text"
                    name="order_descript"
                    id="order_descript"
                    v-model="order_descript"
                  >
                </div>
                <div>
                  <span>餐具份数</span>
                  <i class="iconfont">&#xe601;</i>
                  <p @click="toggleDish">
                    <span v-if="dish_count=='0'">无需餐具</span>
                    <span v-else>{{dish_count}}</span>
                    <i class="iconfont">&#xeb6d;</i>
                  </p>
                  <div data-cover v-show="show_dish">
                    <ul @mouseleave="dishLeave">
                      <li @click="chooseDish(0)">
                        <i class="iconfont">&#xe601;</i>
                        无需餐具
                      </li>
                      <li v-for="i in 6" @click="chooseDish(i+'份')">{{i}}份</li>
                    </ul>
                  </div>
                </div>
                <button @click="confirm_order">确认下单</button>
              </div>
            </div>
          </div>
        </section>
        <section v-else>
          <div class="empty">
            <img :src="baseUrl+'/img/nodata.6477c5.png'" alt>
            <p>
              你的购物车是空的，去
              <a href="javascript:;" @click="back_to_user_choose">下单</a>吧
            </p>
          </div>
        </section>
      </div>
      <div class="modal-bg"></div>
      <aside id="modal">
        <h2>添加新地址</h2>
        <div>
          <label>姓名</label>
          <input type="text" name id="uname" placeholder="请输入您的姓名" v-model="receiver">
        </div>
        <div>
          <label>性别</label>
          <input type="radio" name="gender" value="1" v-model="gender">
          <span>先生</span>
          <input type="radio" name="gender" value="0" v-model="gender">
          <span>女士</span>
        </div>
        <div data-address>
          <label>位置</label>
          <!-- <input type="text" name id="txt_city" placeholder="请输入小区、大厦或者学校"> -->
          <v-distpicker :province="province" :city="city" :area="area" @selected="selected"></v-distpicker>
        </div>
        <div>
          <label>详细地址</label>
          <input type="text" id="detail_address" placeholder="单元、门牌号" v-model="datail_address">
        </div>
        <div>
          <label>手机号</label>
          <input
            type="text"
            name
            id="user_phone"
            placeholder="请输入您的手机号"
            v-model="phone"
            @blur="checkphone"
          >
          <span v-if="!checkPhone">手机号格式有误</span>
        </div>
        <div>
          <button @click="getAddre">保存</button>
          <span data-cancal @click="cancel">取消</span>
        </div>
      </aside>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import store from "../store/store.js";
import qs from "qs";

export default {
  components: { VDistpicker },
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      sid: "",
      user: "",
      orderInfo: [],
      address: [],
      receiver: "",
      datail_address: "",
      phone: "",
      address_id: "",
      gender: "",
      showFitst: true,
      isShowAdderss: true,
      order_descript: "",
      deliver_time: "立即送达",
      time: new Date().getTime(),
      dish_count: "无需餐具",
      show_time: false,
      show_dish: false,
      has_food: false,
      province: "湖北省",
      city: "武汉市",
      area: "武昌区",
      checkPhone: true,
      orderTotalPrice: 0
    };
  },
  mounted() {
    this.setSidUser();
    this.load_orderInfo();
    this.load_adderss();
  },
  watch: {
    address_id: function() {},
    show_time: function() {},
    address: function() {
      // console.log("addressAdd");
    }
  },
  methods: {
    checkphone() {
      var reg = /^1[3-9]\d{9}$/;
      if (!reg.test(this.phone)) {
        this.checkPhone = false;
      } else {
        this.checkPhone = true;
      }
    },
    selected(data) {
      this.province = data.province.value;
      this.city = data.city.value;
      this.area = data.area.value;
    },
    toggleTime: function() {
      this.show_time = !this.show_time;
    },
    toggleDish: function() {
      this.show_dish = !this.show_dish;
    },
    chooseTime: function(time) {
      // console.log(time);
      if (time == "立即送达") {
        this.deliver_time = new Date().getTime();
        // console.log(this.deliver_time)
      } else {
        this.deliver_time = time;
      }
    },
    chooseDish: function(i) {
      this.dish_count = i;
    },
    timeEnter: function() {
      this.show_time = true;
    },
    timeLeave: function() {
      this.show_time = false;
    },
    dishEnter: function() {
      this.show_dish = true;
    },
    dishLeave: function() {
      this.show_dish = false;
    },
    confirm_order: function() {
      // console.log(this.orderTotalPrice)
      if (this.address_id) {
        if (typeof this.deliver_time == "string") {
          this.deliver_time = new Date().getTime();
        }
        var _self = this;
        $.ajax({
          url: `${_self.baseUrl}/user/save_Order`,
          type: "post",
          data: {
            u_phone: this.user,
            shop_id: this.sid,
            addr_id: this.address_id,
            order_time: this.deliver_time,
            message: this.order_descript,
            dish_count: this.dish_count,
            price: this.orderTotalPrice
          },
          dataType: "json"
        }).then(function(data) {
          // console.log(data);
          if (data) {
            store.commit("setTimer", 900);
            localStorage.setItem("timeNum", store.state.timerNumber);
            _self.$router.push(
              `/Pay?sid=${_self.sid}&user=${_self.user}&address=${
                _self.address_id
              }&total=${_self.orderTotalPrice}&order_id=${data[0].id}&order_no=${
                data[0].order_no
              }&storeTime=${store.state.timerNumber}`
            );
          } else {
            alert("诶呀，服务器出了点小问题！");
          }
        });
      } else {
        alert("请选择地址");
      }
    },
    checkAddress: function(e, id) {
      if (e.target.nodeName == "DIV") {
        this.address_id = id;
        $("div[data-address-list]>div").each(function() {
          $(this).removeClass("is-choose-address");
        });
        $("div[data-address-list]>div>div").each(function() {
          $(this).removeClass("tabs");
        });
        $(e.target).addClass("is-choose-address");
        $(e.target)
          .children("div")
          .addClass("tabs");
      }
    },
    changeShow: function() {
      this.showFitst = !this.showFitst;
      this.isShowAdderss = !this.isShowAdderss;
    },
    setSidUser: function() {
      this.sid = this.$route.query.sid;
      this.user = this.$route.query.user;
    },
    load_orderInfo: function() {
      var _self = this;
      $.ajax({
        url: `${_self.baseUrl}/user/getOrderInfo`,
        type: "post",
        data: {
          sid: this.sid,
          user: this.user
        },
        dataType: "json"
      }).then(function(data) {
        _self.orderInfo = data;
        // console.log(_self.sid,_self.user)
        // console.log(data);
        if (data.length == 0) {
          _self.has_food = false;
        } else {
          _self.has_food = true;
        }
      });
    },
    getTotal: function(deliver_fee) {
      var sum = 0;
      for (const key in this.orderInfo) {
        if (this.orderInfo.hasOwnProperty(key)) {
          const element = this.orderInfo[key];
          sum += parseInt(element.number) * parseFloat(element.un_price);
        }
      }
      this.orderTotalPrice = sum + deliver_fee;
      return (sum + deliver_fee).toFixed(2);
    },
    show_address: function() {
      $("#modal").show();
      $(".modal-bg").show();
    },
    cancel: function() {
      $("#modal").hide();
      $(".modal-bg").hide();
    },
    load_adderss: function() {
      var _self = this;
      $.ajax({
        url: `${_self.baseUrl}/user/valiAddress`,
        type: "get",
        data: {
          user: this.user
        },
        dataType: "json"
      }).then(data => {
        if (data.code != 400) {
          _self.address = data;
        }
      });
    },
    saveAddress: function() {
      $("#modal").hide();
      $(".modal-bg").hide();
    },
    getAddre: function(e) {
      var addr = `${this.province}-${this.city}-${this.area}`;
      var _self = this;
      var data = qs.stringify({
        u_phone: this.user,
        receiver: this.receiver,
        province: this.province,
        city: this.city,
        country: this.area,
        address: this.datail_address,
        phone: this.phone,
        gender: this.gender
      });
      // console.log(data);
      var url = `${_self.baseUrl}/user/save_address`;
      this.axios.post(url, data).then(result => {
        this.address_id = result.data.id[0].id;
        // console.log(this.address_id);
        $("#modal").hide();
        $(".modal-bg").hide();
        _self.load_adderss();
      });
    },
    back_to_user_choose: function() {
      $.ajax({
        url: `${this.baseUrl}/user/getShopAddress`,
        data: {
          sid: this.sid
        },
        type: "get",
        dataType: "json"
      }).then(data => {
        var address = [];
        address.push(data[0].province);
        address.push(data[0].city);
        address.push(data[0].county);
        this.$router.push(`/UserChoose/Choose?address=${address.join("-")}`);
      });
    }
  }
};
</script>
<style lang="css" scoped>
@import "../assets/css/order.css";
</style>