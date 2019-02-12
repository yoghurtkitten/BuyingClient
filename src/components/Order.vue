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
                  <span>包装费</span>
                  <span>￥2</span>
                </li>
                <li>
                  <span>配送费</span>
                  <span>￥{{orderInfo[0].deliver_fee}}</span>
                </li>
                <li>
                  <span>
                    ￥
                    <span data-total>{{getTotal()}}</span>
                  </span>
                </li>
              </ul>
              <div></div>
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
                <div data-address-list :class="{showFirst:isShowAdderss}">
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
            <img src="http://127.0.0.1:5050/img/nodata.6477c5.png" alt>
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
          <v-distpicker province="湖北省" city="武汉市" area="武昌区" @selected="selected"></v-distpicker>
        </div>
        <div>
          <label>详细地址</label>
          <input type="text" id="detail_address" placeholder="单元、门牌号" v-model="datail_address">
        </div>
        <div>
          <label>手机号</label>
          <input type="text" name id="user_phone" placeholder="请输入您的手机号" v-model="phone">
        </div>
        <div>
          <button @click="getAddre">保存</button>
          <span data-cancal @click="cancel">取消</span>
        </div>
      </aside>
    </div>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";

export default {
  components: { VDistpicker },
  data() {
    return {
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
      province: "湖北",
      city: "武汉",
      area: "武昌区"
    };
  },
  mounted() {
    // this.getCity();
    this.setSidUser();
    this.load_orderInfo();
    this.load_adderss();
  },
  watch: {
    address_id: function() {},
    show_time: function() {},
    address: function() {
      console.log("addressAdd");
    }
  },
  methods: {
    selected(data) {
      this.province = data.province.value.slice(0, -1);
      this.city = data.city.value.slice(0, -1);
      this.area = data.area.value;
    },
    toggleTime: function() {
      this.show_time = !this.show_time;
    },
    toggleDish: function() {
      this.show_dish = !this.show_dish;
    },
    chooseTime: function(time) {
      console.log(time);
      if (time == "立即送达") {
        this.deliver_time = new Date().getTime();
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
      var _self = this;
      $.ajax({
        url: "http://127.0.0.1:5050/user/save_Order",
        type: "post",
        data: {
          u_phone: this.user,
          shop_id: this.sid,
          addr_id: this.address_id,
          order_time: this.deliver_time,
          message: this.order_descript,
          dish_count: this.dish_count,
          price: this.getTotal()
        },
        dataType: "json"
      }).then(function(data) {
        // console.log(data[0].id);
        if (data) {
          /* location.href = `${location.origin}/pay.html?sid=${_self.sid}&user=${
            _self.user
          }&address=${_self.address_id}&total=${_self.getTotal()}&order_id=${
            data[0].id
          }&order_no=${data[0].order_no}`; */
          this.$router.push(`/Pay?sid=${_self.sid}&user=${_self.user}&address=${_self.address_id}&total=${_self.getTotal()}&order_id=${data[0].id}&order_no=${data[0].order_no}`)
        } else {
          alert("诶呀，服务器出了点小问题！");
        }
      });
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
        url: "http://127.0.0.1:5050/user/getOrderInfo",
        type: "post",
        data: {
          sid: this.sid,
          user: this.user
        },
        dataType: "json"
      }).then(function(data) {
        _self.orderInfo = data;
        console.log(data);
        if (data.length == 0) {
          _self.has_food = false;
        } else {
          _self.has_food = true;
        }
      });
    },
    getTotal: function() {
      var sum = 0;
      for (const key in this.orderInfo) {
        if (this.orderInfo.hasOwnProperty(key)) {
          const element = this.orderInfo[key];
          sum += parseInt(element.number) * parseFloat(element.un_price);
        }
      }
      return sum.toFixed(2);
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
        url: "http://127.0.0.1:5050/user/valiAddress",
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
      $.ajax({
        url: "http://127.0.0.1:5050/user/save_address",
        type: "post",
        data: {
          u_phone: this.user,
          receiver: this.receiver,
          province: this.province,
          city: this.city,
          country: this.area,
          address: this.datail_address,
          phone: this.phone,
          gender: this.gender
        },
        dataType: "json"
      }).then(function(data) {
        console.log(data);
        $("#modal").hide();
        $(".modal-bg").hide();
        _self.load_adderss();
      });
    },
    back_to_user_choose: function() {
      $.ajax({
        url: "/user/getShopAddress",
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
        location.replace(
          `${location.origin}/user_choose.html?address=${address.join("-")}`
        );
      });
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  margin: 0 auto;
}
section {
  width: 100%;
}

a {
  text-decoration: none !important;
}

section > div:first-child {
  display: flex;
  margin-top: 2%;
}

section div:first-child p {
  margin-right: 1%;
}

section > div:first-child > p:first-child {
  display: inline-block;
  width: 0.6%;
  height: 21px;
  background: #000;
}

section div:first-child > p:last-child {
  font-weight: bold;
}

section > div:nth-child(2) {
  width: 100%;
  display: flex;
}

section > div:nth-child(2) > div:first-child {
  width: 33%;
}

section > div:nth-child(2) > div:first-child ul {
  box-shadow: 0px 0px 5px #ccc;
}

ul {
  list-style: none;
  background: #fff;
  margin: 0px;
  padding: 0px;
}

section > div:nth-child(2) > div:first-child > div {
  width: 100%;
  height: 22px;
  background: url("http://127.0.0.1:5050/img/order-bot-bg1.png") no-repeat;
}

section > div:nth-child(2) > div:first-child > ul > li {
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  border-bottom: 1px solid #eee;
  padding-left: 8%;
  padding-right: 8%;
}

section > div:nth-child(2) > div:first-child > ul > li:last-child {
  justify-content: flex-end;
  border-bottom: none;
}

section > div:nth-child(2) > div:first-child > ul > li > span {
  display: inline-block;
}

section > div:nth-child(2) > div:first-child > ul > li:first-child {
  padding-top: 10px;
  padding-bottom: 10px;
}

section
  > div:nth-child(2)
  > div:first-child
  > ul
  > li:first-child
  > span:first-child {
  font-size: 16px;
  color: #333;
  font-weight: 700;
}

section
  > div:nth-child(2)
  > div:first-child
  > ul
  > li:first-child
  > span:last-child
  a {
  color: #666;
}

section > div:nth-child(2) > div:first-child > ul > li:nth-child(2) {
  font-weight: bold;
}

.food {
  background: #fcfaf8 !important;
}

section > div:nth-child(2) > div:first-child > ul > li:last-child {
  color: #e54c2a;
  /* font-weight: bold; */
  font-size: 24px;
  padding-top: 20%;
  padding-bottom: 15%;
}

section
  > div:nth-child(2)
  > div:first-child
  > ul
  > li:last-child
  > span
  > span {
  font-size: 46px;
}

section > div:nth-child(2) > div:last-child {
  width: 65%;
  /* border: 1px solid #000; */
  margin-left: 2%;
  padding-left: 2%;
  padding-right: 2%;
  height: 60rem;
  box-shadow: 0px 0px 5px #ccc;
  background: #fff;
  margin-bottom: 5%;
}

h2 {
  font-size: 16px;
  font-weight: 700;
  color: #000;
  margin-top: 6%;
  margin-bottom: 3%;
}

section > div:nth-child(2) > div:last-child > h2 {
  display: flex;
  justify-content: space-between;
  margin-top: 4% !important;
}

section > div:nth-child(2) > div:last-child h2 > a {
  font-weight: normal;
}

/* section>div:nth-child(2)>div:last-child>div {
    width: 100%;
    height: 94%;
} */

.add-address {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 !important;
  padding: 0;
  height: 4.99rem;
  background: #f1f1f1;
  font-weight: normal !important;
  font-size: 14px;
  cursor: pointer;
}

.add-address > i {
  font-size: 20px;
  margin-right: 0.5%;
}

.add-address > i,
.add-address > span {
  font-style: normal;
  display: inline-block;
}

.add-address + div > h2 > span {
  font-weight: normal;
  font-size: 12px;
  margin-left: 1%;
  color: #ff9c00;
}

.pay_method {
  width: 50%;
  height: 20%;
  border: 1px solid #e54c2a;
  padding-left: 3%;
  padding-top: 2%;
  position: relative;
}
.pay_method p {
  margin-bottom: 0.7rem;
}

.tabs {
  display: inline-block;
  position: absolute;
  border: 17px solid transparent;
  border-right: 17px solid #e54c2a;
  border-bottom: 17px solid #e54c2a;
  top: 56%;
  right: 0%;
}
.tabs > i {
  position: absolute;
  font-weight: bold;
  color: #fff;
  top: -5px;
}

.add-address + div > div > p:first-child {
  margin-bottom: 2%;
  color: #000;
}
.another-info > div {
  color: #333;
  margin-bottom: 3%;
  display: flex;
  align-items: center;
}
.another-info > div > span {
  margin-right: 3%;
}
.another-info > div > input {
  border: 1px solid #e0e0e0;
  width: 32%;
  padding: 5px 7px;
}
.another-info > button {
  margin-top: 4%;
  border: none;
  background: #e54c2a;
  color: #fff;
  font-size: 16px;
  padding: 12px 30px;
  cursor: pointer;
}
.another-info > div > i {
  color: #1ec971;
  font-size: 48px;
}
.another-info > div > p {
  margin: 0;
  border: 1px solid #e0e0e0;
  width: 22%;
  height: 3rem;
  line-height: 3rem;
  padding-left: 1%;
  padding-right: 1%;
  color: #666;
  display: flex;
  justify-content: space-between;
}
.another-info > div > p > i {
  color: #ccc;
}
.another-info > div:not(:nth-child(3)) {
  position: relative;
}
.another-info > div > div {
  position: absolute;
  width: 22.5%;
  border: 1px solid #e0e0e0;
  z-index: 10;
  height: 17rem;
  overflow: auto;
  /* display: none; */
}
.another-info > div > div::-webkit-scrollbar {
  width: 5px;
  background: #fff;
}
.another-info > div > div::-webkit-scrollbar-thumb {
  background: #ccc;
}
.another-info > div > div > ul > li {
  padding-left: 9%;
  padding-top: 8%;
  padding-bottom: 5%;
}
.another-info > div > div > ul > li:hover {
  background: #e0e0e0;
}
.another-info > div > div:last-child i {
  color: #1ec971;
  font-size: 26px;
}
.another-info > div:nth-child(2) > div {
  left: 11%;
  top: 97%;
}

.another-info > div:nth-child(4) > div {
  left: 18%;
  top: 80%;
}
div[data-right] {
  position: relative;
}
#modal {
  position: fixed;
  top: 0;
  background: #fff;
  width: 55%;
  z-index: 101;
  font-size: 14px;
  color: #666;
  padding: 2%;
  margin-left: 23%;
  margin-top: 15%;
  display: none;
}
#modal > div {
  display: flex;
  margin-bottom: 4%;
  align-items: center;
}
#modal > h2 {
  margin-top: 0;
  margin-bottom: 4%;
}
#modal > div > label {
  width: 8%;
  text-align: right;
  margin-right: 5%;
}
#modal > div > span {
  display: inline-block;
  margin-left: 1%;
  margin-right: 5%;
  cursor: pointer;
}
#modal > div > input:not([type="radio"]) {
  height: 39px;
  width: 40%;
  border: 1px solid #dedede;
  padding-left: 2%;
}
input::-webkit-input-placeholder {
  color: #bbbbbb;
}

#modal > div > button {
  width: 20%;
  height: 42px;
  margin-left: 13%;
  border: none;
  color: #fff;
  font-size: 16px;
  border-radius: 4px;
  background: #e45c2a;
  cursor: pointer;
}
#modal > div > button + span {
  margin-left: 5%;
}
.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  left: 0;
  top: 0;
  display: none;
}
div[data-address] {
  position: relative;
}
.city-popup {
  top: 0 !important;
  left: 13%;
}
.has-address {
  justify-content: flex-start !important;
  background: #fff !important;
  border: 1px solid #eee;
  position: relative;
}
.is-choose-address {
  border: 1px solid #e54c2a;
}
.has-address > i {
  display: block;
  width: 10%;
  font-size: 37px;
  text-align: center;
  float: left;
}
.has-address span {
  display: block;
}
.has-address > span > span:first-child {
  color: #333;
}
.showFirst {
  height: 80px;
  overflow: hidden;
}
div[data-address-list] > div > div > i {
  color: #fff;
}
div[data-address-list] + div {
  cursor: pointer;
}
.empty {
  width: 100%;
  padding: 3.125rem 0 3.125rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.empty p {
  margin: 0;
  margin-left: 3%;
  color: #999;
  font-weight: normal !important;
  font-family: "PingFang SC", "Lantinghei SC", "Helvetica Neue",
    "Microsoft Yahei", "Hiragino Sans GB", "Microsoft Sans Serif",
    "WenQuanYi Micro Hei", sans;
}
</style>
