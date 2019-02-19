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
              <img :src="'http://127.0.0.1:5050/'+item.content[0].shop_img" alt srcset>
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
      var url = "http://127.0.0.1:5050/user/session";
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
        url: "http://127.0.0.1:5050/user/getUserOrder",
        dataType: "json",
        data: {
          user: this.user
        }
      }).then(data => {
        console.log(data.data)
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
      console.log(start);
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
      // console.log(myList);
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

<style>
.order {
  width: 80%;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  padding: 1.5625rem;
}
.order .top {
  font-size: 1.125rem;
  font-weight: 700;
}
.order .top::after {
  content: "";
  display: block;
  width: 100%;
  height: 0.1875rem;
  background: #f4f4f4;
  margin-top: 10px;
}
.order td > img {
  width: 4.375rem;
  height: 4.375rem;
  border-radius: 50%;
  margin: 15px 15px 15px 25px;
}
.order p {
  margin: 0;
  padding: 0;
}
.order table {
  width: 100%;
}
.order-item-line {
  position: relative;
}
.order i {
  position: absolute;
  top: 70px;
  right: -8px;
}
.order thead {
  background: #eee;
}
.order thead > tr > th:not(:nth-child(2)) {
  font-weight: normal;
  text-align: center;
  height: 30px;
  color: #333;
}
.order thead > tr > th:nth-child(2) {
  font-weight: normal;
  padding-left: 34px;
  width: 124px;
}
.order .order-item-line {
  border-right: 1px solid #eee;
  text-align: center;
}
.order .order-item-line > span {
  display: inline-block;
  width: 59px;
}
.order tbody > tr > td {
  text-align: center;
  padding: 30px 0 30px 0;
  color: #999;
}
.order tbody > tr > td:nth-child(3) {
  text-align: left;
}
.order tbody > tr > td > h3 {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin: 0;
}
.order tbody > tr > td:last-child > a,
.order .nextPage > a {
  display: inline-block;
  width: 4.875rem;
  height: 1.5rem;
  border: 1px solid #eee;
  text-decoration: none;
  color: #333;
  padding-top: 1%;
}
.order tbody > tr > td {
  border-bottom: 1px solid #eee;
}
.order tbody > tr > td:first-child,
.order tbody > tr > td:nth-child(2) {
  border-bottom: none;
}
.state {
  font-size: 1.17em;
}
.order .food-details {
  width: 230px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.order p > span {
  color: #333;
  font-weight: 700;
}
.order .nextPage {
  text-align: right;
  margin-top: 1%;
}
.order .nextPage > a {
  padding-top: 0.1%;
  text-align: center;
}
</style>
