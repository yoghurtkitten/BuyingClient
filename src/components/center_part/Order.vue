<template>
  <div class="order">
    <div class="top">近三个月订单</div>
    <div class="order_detail">
      <table>
        <thead>
          <tr>
            <th>下单时间</th>
            <th>订单内容</th>
            <th></th>
            <th>支付金额（元）</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in allOrder" :key="i">
            <td class="order-item-line" v-if="item.content[0]">
              <span>{{item.content[0].order_time|dateFormat}} {{item.content[0].order_time|timeFormat}}</span>
              <i class="iconfont">&#xe78c;</i>
            </td>
            <td v-if="item.content[0]">
              <img :src="baseUrl+'/'+item.content[0].shop_img" alt srcset>
            </td>
            <td>
              <p class="food-details">
                {{getShopCar(item.content)}}等
                <span>{{item.content.length}}</span> 份
              </p>
              <p v-if="item.content[0]">订单号: {{item.content[0].order_no}}</p>
            </td>
            <td>
              <h3>{{getTotal(item.content)}}</h3>
            </td>
            <td>
              <p class="state" v-if="item.content[0]">{{item.content[0].status|statuFormat}}</p>
            </td>
            <td>
              <router-link v-if="item.content[0]" :to="`/UserCenter/OrderDetail?order_no=${item.content[0].order_no}`">订单详情</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="nextPage">
        <a href="javascript:;" @click="getPage(pageOrder,page,0)" v-if="page">上一页</a>
        <a href="javascript:;" @click="getPage(pageOrder,page,1)" v-if="hasOrder">下一页</a>
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
      order: [],
      page: 0,
      pageOrder: [],
      hasOrder: true,
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
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
        // console.log(data.data)
        var index = 0;
        var myList = [];
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].content.length > 0) {
            myList[index++] = data.data[i];
          }
        }
        _self.pageOrder = myList;
        this.getPage(_self.pageOrder, -1, 1);
      });
    },
    getPage(data, start, direct) {
      if (direct) {
        start++;
      } else {
        start--;
      }
      // console.log(start);
      var count = 0;
      var myList = [];
      var index = 0;
      for (index = start * 10; index < data.length; index++) {
        const element = data[index];
        if (count >= 10) {
          break;
        }
        myList[count++] = data[index];
      }
      this.allOrder = myList;
      this.page = start;

      if (index >= data.length) {
          this.hasOrder = false;
      } else {
          this.hasOrder = true;
      }
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
      var i = 0;
      for (const key in arr) {
        if (arr.hasOwnProperty(key) && i <= 1) {
          const element = arr[key];
          str += `${element.name} ${element.number}份/`;
          i++;
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
          str = "订单已提交";
          break;
        case 2:
          str = "订单已送达";
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
    @import '../../assets/css/centerOrder.css'
</style>
