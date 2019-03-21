<template>
  <div class="order-detail">
    <div class="top">订单详情</div>
    <div class="steps">
      <ul>
        <li>订单已提交</li>
        <li v-if="!status">订单已取消</li>
        <li v-else>订单已付款</li>
      </ul>
    </div>
    <div class="evaluation" v-if="status && !comment">
      <p>订单已完成</p>
      <el-button type="danger" @click="setComment">评价</el-button>
    </div>
    <div class="detail" v-if="shop_info.shop_img">
      <div class="shop-info">
        <div class="shop-img" :style="`background-image:url(${baseUrl}/${shop_info.shop_img})`"></div>
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
                <span>{{address.receiver}}({{address.gender|changeGender}})</span>
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
      baseUrl: this.$store.getters.getBaseUrl,
      order_no: "",
      shop_info: {},
      shop_car: [],
      address: [],
      status: '',
      comment: '',
    };
  },
  created() {
    this.getData();
    this.getShop_info();
    this.getShopCarInfo();
    this.getAddressInfo();
    this.getOrderStatus();
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
      var url = `${this.baseUrl}/user/getShopInfo`;
      this.axios(url, {
        params: {
          order_no: this.order_no
        }
      }).then(result => {
        this.shop_info = result.data.data[0];
        // console.log(this.shop_info);
      });
    },
    getShopCarInfo() {
      var url = `${this.baseUrl}/user/getShopCarInfo`;
      this.axios(url, {
        params: {
          order_no: this.order_no
        }
      }).then(result => {
        this.shop_car = result.data.data;
      });
    },
    getAddressInfo() {
      var url = `${this.baseUrl}/user/getAddressInfo`;
      this.axios(url, {
        params: {
          order_no: this.order_no
        }
      }).then(result => {
        this.address = result.data.data[0];
      });
    },
    getOrderStatus() {
      var url = `${this.baseUrl}/user/getOrderStatus`;
      this.axios(url, {
        params: {
          order_no: this.order_no
        }
      }).then(result => {
        this.status = result.data.data[0].status;
        this.comment = result.data.data[0].comment;
        // console.log(result.data.data[0]);
      })
    },
    setComment() {
      // console.log(this.order_no);
      this.$router.push(`/UserCenter/Comment?order_no=${this.order_no}`)
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
<style lang="css" scoped>
    @import '../../assets/css/orderDetail.css'
</style>
