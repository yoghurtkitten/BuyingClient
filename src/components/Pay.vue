<template>
  <div>
    <!-- <my-header :toggleFixed="false"></my-header> -->
    <div class="container-fluid" id="app">
      <header>
        <div class="logo">
          <router-link to="/  ">
            <img :src="baseUrl+'/img/logo.png'" alt>
          </router-link>
        </div>
        <div>收银台</div>
      </header>
      <section class="container">
        <div data-order v-if="pay_info[0]">
          <h3>订单详情</h3>
          <hr>
          <div data-order-info>
            <p>{{pay_info[0].shop_name}}（外卖订单）</p>
            <p>
              支付金额
              <span>￥{{total}}</span>
            </p>
          </div>
          <div data-small v-if="pay_info">
            <span>
              {{pay_info[0].receiver}} ({{pay_info[0].phone | changeGender}}) {{pay_info[0].phone}}
              {{pay_info[0].address}} -
              <span
                v-for="(obj, index) in pay_info"
                :key="index"
              >{{obj.name}}*{{obj.number}}-</span>
            </span>
            <span @click="show_detail">查看详情</span>
            <i class="iconfont">&#xeb6d;</i>
          </div>
          <div data-big v-if="pay_info[0]">
            <p>{{pay_info[0].receiver}} {{pay_info[0].phone}}</p>
            <p>{{pay_info[0].address}}</p>
            <p>-</p>
            <ul>
              <li v-for="(obj, index) in pay_info" :key="index">{{obj.name}}*{{obj.number}}</li>
            </ul>
            <span @click="hide_detail">收起详情</span>
            <i class="iconfont">&#xeb6e;</i>
          </div>
        </div>
        <div data-pay>
          <p>
            <span>请选择支付方式</span>
            <span>
              剩余支付时间
              <i></i>，逾期订单将自动取消
            </span>
          </p>
          <hr>
          <div>
            <p>
              第三方支付
              <span>￥{{total}}</span>
            </p>
            <div>
              <div :class="{active:Alipay}" @click="pay('ali')">
                <i class="iconfont">&#xe647;</i>
                <span>支付宝</span>
              </div>
              <div :class="{active:weChatPay}" @click="pay('wechat')">
                <i class="iconfont">&#xe634;</i>
                <span>微信支付</span>
              </div>
            </div>
          </div>
          <hr>
          <button @click="confirmPayment()">确认支付</button>
        </div>
      </section>
      <div class="modal-bg" v-if="isModel">
        <div>
          <i class="iconfont" @click="close_model()">&#xe661;</i>
          <div class="payOverTime" v-if="isClose">
            <i class="iconfont">&#xe8e7;</i>
            <div>
              <p>支付已超时</p>
              <p>很抱歉，已超过订单支付时间限制，请重新下单</p>
              <p @click="close_model()">确定</p>
            </div>
          </div>
          <div class="wechatPay" v-if="iswechat">
            <p>
              使用微信支付
              <span>{{total}}</span>
            </p>
            <img :src="baseUrl+'/img/pay/wechat.jpg'" alt>
            <div>
              <i class="iconfont">&#xe712;</i>
              <div>
                <p>请使用微信扫一扫</p>
                <p>扫描二维码完成支付</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from "../store/store.js";

export default {
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      sid: "",
      user: "",
      total: "",
      pay_info: [],
      add_id: "",
      order_id: "",
      Alipay: true,
      weChatPay: false,
      payment: "支付宝",
      order_no: "",
      isModel: false,
      isClose: false,
      iswechat: false,
      timer: null
      // delive_time: 0,
    };
  },
  created() {
    this.dataFromOrder();
    setTimeout(() => {
      this.getPayInfo();
    }, 100);
    this.time();
    this.changeOrder();
    this.isPay();
  },
  mounted() {
    this.getCurrentStatu();
  },
  methods: {
    getCurrentStatu() {
      var url = `${this.baseUrl}/user/getOrderStatu`;
      this.axios(url, {
        params: {
          order_id: this.order_id
        }
      }).then(result => {
        // console.log(result.data.code);
        if (result.data.code == 1) {
          this.close_model();
        }
      });
    },
    isPay() {
      var _self = this;
      var url = `${this.baseUrl}/user/orderStatu`;
      this.axios
        .get(url, {
          params: {
            order_id: this.order_id
          }
        })
        .then(result => {
          // console.log(result.data[0].status);
          var status = result.data[0].status;
          if (status) {
            $.ajax({
              url: `${_self.baseUrl}/user/getShopAddress`,
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
              this.$router.push(
                `/UserChoose/Choose?address=${address.join("-")}`
              );
            });
          }
        });
    },
    dataFromOrder() {
      this.sid = this.$route.query.sid;
      this.user = this.$route.query.user;
      this.total = this.$route.query.total;
      this.add_id = this.$route.query.address;
      this.order_id = this.$route.query.order_id;
      this.order_no = this.$route.query.order_no;
      // this.delive_time = this.$route.query.delive_time;
    },
    close_model() {
      this.isModel = false;
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
    },
    confirmPayment() {
      if (this.payment == "支付宝") {
        this.$router.push(
          `/PayMent?total=${this.total}&order_id=${this.order_id}&order_no=${
            this.order_no
          }`
        );
      } else {
        this.isModel = true;
        this.iswechat = true;
        this.isClose = false;
        $.ajax({
          url: `${this.baseUrl}/user/changeStatu`,
          data: {
            order_no: this.order_id,
            pay_method: "微信"
          },
          type: "get",
          dataType: "json"
        }).then(data => {
          // console.log(data);
        });
      }
    },
    pay(payment) {
      if (payment == "ali") {
        this.Alipay = true;
        this.weChatPay = false;
        this.payment = "支付宝";
      } else {
        this.Alipay = false;
        this.weChatPay = true;
        this.payment = "微信支付";
      }
    },
    time() {
      // console.log(12);
      var time_count = localStorage.getItem("timeNum");
      this.timer = setInterval(() => {
        time_count--;
        $("div[data-pay]>p>span>i").html(
          `${parseInt(time_count / 60)}分${time_count % 60}秒`
        );
        store.commit("setTimer", time_count);
        localStorage.setItem("timeNum", time_count);
        if (time_count < 0) {
          this.isModel = true;
          this.isClose = true;
          this.iswechat = false;
          clearTimeout(this.timer);
        }
      }, 1000);
      setTimeout(() => {
        clearTimeout(this.timer);
        this.isModel = true;
        this.isClose = true;
        this.iswechat = false;
      }, 900000);
    },
    show_detail() {
      $("div[data-small]").hide();
      $("div[data-big]").show();
    },
    hide_detail() {
      $("div[data-small]").show();
      $("div[data-big]").hide();
    },
    getPayInfo() {
      var _self = this;
      // console.log(this.sid, this.user, this.add_id, this.order_id);
      $.ajax({
        url: `${this.baseUrl}/user/load_Order`,
        data: {
          sid: this.sid,
          user: this.user,
          add_id: this.add_id,
          order_id: this.order_id
        },
        type: "post",
        dataType: "json"
      }).then(data => {
        // console.log(data);
        _self.pay_info = data;
      });
    },
    changeOrder() {
      $.ajax({
        url: `${this.baseUrl}/user/change_order`,
        type: "get",
        dataType: "json",
        data: {
          u_phone: this.user,
          sid: this.sid,
          order_id: this.order_id
        }
      }).then(data => {
        // console.log(data);
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    // console.log("1223");
    next();
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);
    var flag = confirm("请注意支付时间哦");
    if (flag) {
      next();
    } else {
      this.time();
    }
  }
};
</script>
<style scoped>
header {
  display: flex;
  align-items: center;
  padding-left: 5%;
  background: #fff;
  position: relative;
  height: 100px;
}

header > div:first-child {
  position: absolute;
}

header > div:last-child {
  font-size: 24px;
  color: #e54c2a;
  font-weight: bold;
  margin-left: 18%;
}

section {
  padding: 0 !important;
  margin: 0 auto;
  margin-top: 5%;
  color: #666;
  font-size: 14px;
}

div[data-order] {
  background: #fff;
  box-shadow: 0px 0px 5px #ccc;
  padding: 2% 3% 2% 3%;
}

div[data-order] > p {
  margin: 0;
}

div[data-order] > h3 {
  font-size: 16px;
  font-weight: bold;
}

div[data-order] > hr {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

div[data-order-info] {
  display: flex;
  justify-content: space-between;
}
div[data-order-info] > p {
  margin: 0;
}
div[data-order-info] > p:last-child {
  color: #000;
}
div[data-order-info] > p > span {
  color: #f66c1c;
  font-size: 21px;
  font-weight: 700;
}

div[data-small] {
  display: block;
}

div[data-small] > span:first-child {
  display: inline-block;
  width: 37% !important;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-right: 1%;
  vertical-align: middle;
}

div[data-small] > span:nth-child(2),
div[data-small] > i {
  color: #427bd8 !important;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
}

div[data-big] > span,
div[data-big] > i {
  color: #427bd8 !important;
  cursor: pointer;
}

div[data-big] {
  display: none;
}

div[data-big] p {
  margin: 0;
}

div[data-big] > ul {
  list-style: none;
  margin: 0;
}

div[data-pay] {
  background: #fff;
  padding: 2%;
  margin-top: 3%;
  box-shadow: 0px 0px 5px #ccc;
}
div[data-pay] > div > div {
  display: flex;
}

div[data-pay] > div > div > div {
  float: left;
  width: 13%;
  border: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5% 1% 0.5% 1%;
  margin-right: 1%;
  position: relative;
  cursor: pointer;
}

div[data-pay] > div > div > div:first-child > i {
  font-size: 35px;
  color: #00b7f0;
}

div[data-pay] > div > div > div:last-child > i {
  font-size: 35px;
  color: #00b95a;
}

div[data-pay] > div > div > div > span {
  font-size: 1.25em;
  font-weight: 500;
  color: #000;
}

div[data-pay] button {
  background: #e54c2a;
  color: #fff;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  cursor: pointer;
}

.active {
  border: 1px solid #e54c2a !important;
}

.active::after {
  content: '';
  display: inline-block;
  position: absolute;
  right: -1px;
  bottom: -5px;
  z-index: 10;
}
div[data-pay] > p > span:first-child {
  font-size: 16.32px;
  color: #000;
  font-weight: 700;
  margin-right: 1%;
}
div[data-pay] > div > p > span {
  font-size: 18px;
  font-weight: bold;
  color: #f66c1c;
}
div[data-pay] > p > span > i {
  color: #f66c1c;
  font-style: normal;
}
.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-bg > div {
  background: #fff;
  width: 44%;
  padding: 1.25rem 0.625rem 0.625rem 1.875rem;
}
.modal-bg > div > i {
  font-size: 0.75rem;
  font-weight: bold;
  display: inline-block;
  float: right;
  cursor: pointer;
}
.payOverTime {
  display: flex;
}
.payOverTime p {
  margin: 0;
}
.payOverTime > i {
  font-size: 2.625rem;
  color: #f74342;
}
.payOverTime > div {
  margin-left: 2%;
  padding-top: 3%;
  margin-bottom: 3.5%;
}
.payOverTime > div > p:first-child {
  font-size: 1.3125rem;
  padding-bottom: 2.3%;
}
.payOverTime > div > p:nth-child(2) {
  font-size: 12px;
  color: #808080;
  padding-bottom: 10%;
}
.payOverTime > div > p:last-child {
  display: inline-block;
  width: 37%;
  background: #e54c2a;
  border-radius: 0.1875rem;
  color: #fff;
  text-align: center;
  padding-top: 4%;
  padding-bottom: 4%;
  cursor: pointer;
}
.wechatPay {
  text-align: center;
}
.wechatPay p {
  margin: 0;
}
.wechatPay > p {
  font-size: 1.3125rem;
  margin-bottom: 3%;
  margin-top: 9%;
}
.wechatPay i {
  font-size: 2.9375rem;
}
.wechatPay > p > span {
  color: #f66c1c;
}
.wechatPay img {
  margin: 0 auto;
  width: 45.9%;
  margin-bottom: 2.3%;
}
.wechatPay > div {
  display: flex;
  width: 50%;
  background: #e54c2a;
  color: #fff;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  margin-bottom: 6%;
}
.wechatPay > div > i {
  display: inline-block;
  height: 100%;
}
.wechatPay > div > div {
  text-align: left;
  margin-left: 8%;
}
.wechatPay > div > div > p {
  font-size: 14px;
}
</style>
