<template>
  <div class="right-aside">
    <div>
      <img :src="baseUrl+'/img/user/default-avatar.38e40d.png'" alt>
      <div>
        <p>
          晚上好，
          <span>{{user}}</span>
        </p>
        <p>晚饭叫外卖，不吸油烟，不洗碗筷！</p>
      </div>
    </div>
    <div>
      <div class="show_order">
        <p>最近订单</p>
        <p>
          <a href="javascript:;">查看全部订单></a>
        </p>
      </div>
      <div class="order_info">
        <ul>
          <li
            v-for="(item, index) in allOrder"
            :key="index"
            v-if="item.content.length>0 && index <= 2"
          >
            <div>
              <div v-if="item.content[0]">
                <div
                  class="order_img"
                  :style="'background-image:url('+baseUrl+'/'+item.content[0].shop_img+');'"
                ></div>
                <p class="order_title">{{item.content[0].shop_name}}</p>
                <p class="detail">{{getShopCar(item.content)}}</p>
                <a href="javascript:;">
                  共
                  <span>{{item.content.length}}</span>个菜品>
                </a>
              </div>
              <div class="time">
                <p v-if="item.content[0]">{{item.content[0].order_time | dateFormat}}</p>
                <p v-if="item.content[0]">{{item.content[0].order_time | timeFormat}}</p>
              </div>
              <div class="price">
                <p>￥{{getTotal(item.content)}}</p>
              </div>
              <div>
                <p v-if="item.content[0]">{{item.content[0].status | statuFormat}}</p>
                <p>
                  <router-link v-if="item.content[0]" :to="`/UserCenter/OrderDetail?order_no=${item.content[0].order_no}`">订单详情</router-link>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      user: "",
      allOrder: [],
      order: []
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser: function() {
      var url = `${this.baseUrl}/user/session`;
      this.axios.get(url).then(result => {
        var data = result.data.msg.name;
        this.user = result.data.msg.name;
        this.getUserOrder();
      });
    },
    getUserOrder: function() {
      var _self = this;
      var index = 0;
      $.ajax({
        type: "GET",
        url: `${this.baseUrl}/user/getUserOrder`,
        dataType: "json",
        data: {
          user: this.user
        }
      }).then(data => {
        // console.log(data.data);
        _self.allOrder = data.data;
      });
    },
    getTotal: function(arr) {
      var sum = 0;
      for (const key in arr) {
        if (arr.hasOwnProperty(key)) {
          const element = arr[key];
          sum += element.un_price * element.number;
        }
      }
      return sum.toFixed(2);
    },
    getShopCar: function(arr) {
      var str = "";
      for (const key in arr) {
        if (arr.hasOwnProperty(key)) {
          const element = arr[key];
          str += `${element.name} ${element.number}份/`;
        }
      }
      return str;
    }
  },
  filters: {
    statuFormat: function(val) {
      var str = "";
      switch (val) {
        case 0:
          str = "订单已取消";
          break;
        case 1:
          str = "订单已完成";
          break;
        default:
          break;
      }
      return str;
    },
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
    @import '../../assets/css/center.css'
</style>