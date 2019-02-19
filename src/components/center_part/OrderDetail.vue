<template>
  <div class="order-detail">
    <div class="top">订单详情</div>
    <div class="steps">
      <ul>
        <li>订单已提交</li>
        <li>订单已取消</li>
      </ul>
    </div>
    <div class="detail" v-if="shop_info">
      <div class="shop-info">
        <div class="shop-img"></div>
        <div>
          <p>
            <span class="shop-title">{{shop_info.shop_name}}</span>
            <span>
              <i class="iconfont">&#xeb9a;</i>
              收藏
            </span>
          </p>
          <p>
            <span class="order-no">订单号：{{order_no}}</span>
            <span>商家电话：{{shop_info.shop_phone}}</span>
          </p>
        </div>
      </div>
      <div class="more-info">
        <div class="shop-car">
          <ul>
            <li class="title">
              <span>菜品</span>
              <span>数量</span>
              <span>小计（元）</span>
            </li>
            <li class="foods">
              <p v-for="(item, index) in shop_car" :key="index">
                <span>{{item.name}}</span>
                <span>{{item.number}}</span>
                <span>{{item.price.toFixed(2)}}</span>
              </p>
            </li>
            <li v-if="shop_info.deliver_fee">
              <span>配送费</span>
              <span></span>
              <span>￥{{shop_info.deliver_fee.toFixed(2)}}</span>
            </li>
            <li>
              <p class="pay">
                实际支付：
                <span>{{total.toFixed(2)}}</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="order-info">
          <ul>
            <li class="title">配送信息</li>
            <li>
              <p>
                <span>配送时间：</span>
                <span>{{address.order_time|dateFormat}} {{address.order_time|timeFormat}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>联系人：</span>
                <span>{{address.receiver}}</span>
              </p>
              <p>
                <span>联系电话：</span>
                <span>{{address.phone}}</span>
              </p>
              <p>
                <span>收货地址：</span>
                <span>{{address.address}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>备注:</span>
                <span v-if="!address.message">无备注</span>
                <span v-else>{{address.message}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      order_no: "",
      shop_info: {},
      shop_car: [],
      address: []
    };
  },
  created() {
    this.getData();
    this.getShop_info();
    this.getShopCarInfo();
    this.getAddressInfo();
  },
  computed: {
    total() {
      var sum = 0;
      for (const item of this.shop_car) {
        sum += item.price;
      }
      sum += this.shop_info.deliver_fee;
      return sum;
    }
  },
  methods: {
    getData() {
      this.order_no = this.$route.query.order_no;
    },
    getShop_info() {
      var url = "http://127.0.0.1:5050/user/getShopInfo";
      this.axios(url, {
        params: {
          order_no: this.order_no
        }
      }).then(result => {
        this.shop_info = result.data.data[0];
      });
    },
    getShopCarInfo() {
      var url = "http://127.0.0.1:5050/user/getShopCarInfo";
      this.axios(url, {
        params: {
          order_no: this.order_no
        }
      }).then(result => {
        this.shop_car = result.data.data;
      });
    },
    getAddressInfo() {
      var url = "http://127.0.0.1:5050/user/getAddressInfo";
      this.axios(url, {
        params: {
          order_no: this.order_no
        }
      }).then(result => {
        this.address = result.data.data[0];
        console.log(this.address);
      });
    }
  },
  filters: {
    dateFormat: function(val) {
      return `${new Date(val).getFullYear()}-${
        new Date(val).getMonth() + 1 > 10
          ? new Date(val).getMonth() + 1
          : "0" + (new Date(val).getMonth() + 1)
      }-${
        new Date(val).getDate() > 10
          ? new Date(val).getDate()
          : "0" + new Date(val).getDate()
      }`;
    },
    timeFormat: function(val) {
      return `${
        new Date(val).getHours() > 10
          ? new Date(val).getHours()
          : "0" + new Date(val).getHours()
      }:${
        new Date(val).getMinutes() > 10
          ? new Date(val).getMinutes()
          : "0" + new Date(val).getMinutes()
      }`;
    }
  }
};
</script>
<style scoped>
.order-detail {
  width: 80%;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  padding: 1.5625rem;
}
.order-detail ul {
  padding: 0;
}
.order-detail .top {
  font-size: 1.125rem;
  font-weight: 700;
}
.order-detail .top::after {
  content: "";
  display: block;
  width: 100%;
  height: 0.1875rem;
  background: #f8f8f8;
  margin-top: 10px;
}
.order-detail .steps {
  margin-top: 20px;
  padding-bottom: 30px;
  background: #f8f8f8;
}
.order-detail .steps > ul {
  list-style: none;
  display: flex;
  /* justify-content: space-around; */
  margin: 0;
  padding: 0;
  position: relative;
}
.order-detail .steps > ul::after {
  content: "";
  display: block;
  width: 80%;
  height: 1px;
  border: 0.5px solid #ededed;
  position: absolute;
  left: 10%;
  margin-top: 2.5rem;
  top: 28%;
}
.order-detail .steps > ul > li {
  width: 50%;
  text-align: center;
  height: 3.5rem;
  line-height: 3.5rem;
  font-size: 0.875rem;
  color: #999;
}
.order-detail .steps > ul li::after {
  position: absolute;
  content: "";
  background-color: #ddd;
  width: 1.125rem;
  height: 1.125rem;
  border: 5px solid #f8f8f8;
  border-radius: 50%;
  bottom: 0;
  margin-bottom: -9px;
  margin-left: -46px;
  z-index: 1;
}
.order-detail .detail .shop-img {
  width: 44px;
  height: 44px;
  background: url("http://127.0.0.1:5050/img/brand/miaomiao.jpg") no-repeat;
  background-size: cover;
  margin-right: 2%;
}
.order-detail .detail .shop-info {
  display: flex;
}
.order-detail ul {
  list-style: none;
}
.order-detail p {
  margin: 0;
}
.order-detail .detail {
  background: #f8f8f8;
  margin-top: 5%;
  padding: 18px 0px 0px 30px;
  box-shadow: 0 0 5px #ccc;
}
.shop-info {
  font-size: 14px;
  color: #999;
  padding-right: 30px;
}
.shop-title {
  font-size: 16px;
  color: #333;
}
.shop-img + div {
  width: 100%;
}
.shop-img + div > p:first-child {
  display: flex;
  justify-content: space-between;
}
.shop-img + div > p:first-child > span {
  display: inline-block;
}
.order-no,
.order-no + span {
  display: inline-block;
  width: 26%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 8%;
}
.order-detail .more-info {
  display: flex;
  border-top: 1px solid #eee;
}
.shop-car {
  width: 55%;
  font-size: 14px;
  color: #666;
}
.shop-car ul li:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.shop-car ul li:not(:first-child) span {
  margin-top: 3%;
}
.shop-car ul li span:first-child {
  display: inline-block;
  width: 50%;
}
.shop-car ul li span:nth-child(2) {
  display: inline-block;
  width: 10%;
  text-align: center;
}
.shop-car ul li span:last-child {
  display: inline-block;
  width: 30%;
  text-align: right;
}
.title {
  font-weight: 700;
  padding-top: 20px;
  /* padding-bottom: 16px; */
}
.order-info {
  background: #fff;
  width: 45%;
  font-size: 14px;
}
.pay {
  text-align: right;
  padding-top: 3%;
  padding-right: 7%;
}
.pay > span {
  display: inline !important;
  font-size: 1.625rem;
  font-weight: 700;
  color: #f74342;
}
.order-info ul li {
  padding-left: 8%;
}
.order-info ul li:not(:last-child):not(:first-child) {
  border-bottom: 1px solid #eee;
}
/* .order-info ul li p {
  margin-bottom: 5%;
} */
.order-info ul li p:first-child {
  margin-top: 5%;
}
.order-info ul li p span:first-child {
  display: inline-block;
  width: 21%;
  text-align: justify;
  text-align-last: justify;
}
.order-info ul li p span:first-child::after {
  display: inline-block;
  overflow: hidden;
  width: 100%;
  height: 12px;
  content: "";
}
.order-info ul li p span:last-child {
  display: inline-block;
}
.order-info ul li p span:last-child::after {
  display: inline-block;
  overflow: hidden;
  width: 100%;
  height: 12px;
  content: "";
}
</style>
