<template>
  <div>
    <my-header :toggleFixed="false"></my-header>
    <div class="container-fluid">
      <section class="container">
        <div>
          <span>当前位置：</span>
          <span>保利华都</span>
          <a href="javascript:;">[切换地址]</a>
          <span>></span> 个人中心
        </div>
        <div>
          <div class="left-aside">
            <ul>
              <li>
                <div>
                  <i class="iconfont">&#xe603;</i>
                  <span>个人中心</span>
                </div>
              </li>
              <li>
                <div>
                  <i class="iconfont">&#xe62c;</i>
                  <span>我的订单</span>
                </div>
                <p>近三个月订单</p>
              </li>
              <li>
                <div>
                  <i class="iconfont">&#xe645;</i>
                  <span>我的资料</span>
                </div>
                <p>个人资料</p>
                <p>地址管理</p>
              </li>
              <li>
                <div>
                  <i class="iconfont">&#xeb9a;</i>
                  <span>我的收藏</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="right-aside">
            <div>
              <img src="http://127.0.0.1:5050/img/user/default-avatar.38e40d.png" alt>
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
                  <li v-for="(item, index) in allOrder" :key="index" v-if="item.content.length">
                    <div>
                      <div v-if="item.content[0]">
                        <div
                          class="order_img"
                          :style="'background-image:url(http://127.0.0.1:5050/'+item.content[0].shop_img+');'"
                        ></div>
                        <p class="order_title">{{item.content[0].shop_name}}</p>
                        <p class="detail">
                          {{getShopCar(item.content)}}
                        </p>
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
                          <a href="javascript:;">订单详情</a>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
        console.log(data.data);
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
<style scoped>
body {
  background: #f7f7f7;
}
.container-fluid {
  margin: 0 !important;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

p {
  margin: 0;
}

iframe {
  width: 100%;
}

section > div {
  display: flex;
  font-size: 12px;
  margin-top: 2%;
}
section > div > span:first-child {
  color: #999;
}
section > div > span {
  margin-right: 1%;
}

.left-aside {
  width: 20%;
}

.right-aside {
  width: 80%;
}

.right-aside > div:first-child {
  display: flex;
  /* border: 1px solid #000; */
  align-items: center;
  background: #fff;
  box-shadow: 0px 0px 5px #ccc;
  padding: 3%;
}

.right-aside > div:first-child > div {
  margin-left: 3%;
}
.right-aside > div:first-child > div > p:first-child {
  font-size: 16px;
}
.right-aside > div:first-child > div > p:last-child {
  font-size: 12px;
  color: #999;
  margin-top: 1%;
}
.right-aside > div:first-child > div > p:first-child > span {
  font-weight: bold;
}

.right-aside > div:first-child > img {
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
}

.right-aside > div:first-child > div > p {
  margin: 0;
}

.show_order {
  display: flex;
  justify-content: space-between;
}

.order_info > ul > li > div {
  display: flex;
  justify-content: space-between;
}

.left-aside > ul > li > div > span {
  font-size: 1.125rem;
  font-weight: bold;
}
.left-aside > ul > li {
  margin-bottom: 15%;
}
.left-aside > ul > li > p {
  margin-left: 10%;
  margin-top: 7%;
  color: #666;
  font-size: 14px;
}
.left-aside > ul > li > div > i {
  font-size: 1rem;
  color: #aaa;
  margin-right: 1%;
}
.right-aside > div:last-child {
  background: #fff;
  box-shadow: 0px 0px 5px #ccc;
  margin-top: 3%;
  padding: 2%;
  /* height: 403px; */
  overflow: hidden;
}
.show_order {
  border-bottom: 2px solid #f4f4f4;
  padding-bottom: 1%;
}
.show_order > p:first-child {
  font-size: 1rem;
  color: #666;
  font-weight: 700;
}
.show_order > p > a {
  color: #666;
  text-decoration: none;
}
.order_info > ul > li {
  padding: 2%;
  border-top: 1px solid #eee;
}
.order_info > ul > li > div {
  font-size: 0.75rem;
  color: #999;
}
.order_info > ul > li > div p {
  margin-bottom: 2%;
}

.order_title {
  color: #333;
  font-size: 16px;
  font-weight: bold;
}
.order_title ~ a {
  color: #333;
  text-decoration: none;
}
.order_title ~ a > span {
  color: #e54c2a;
}
.time {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.price {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #333;
}
.order_info > ul > li > div > div:last-child {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.order_info > ul > li > div > div:last-child > p:first-child {
  color: #999;
  font-size: 1rem;
}
.order_img {
  width: 4.375rem;
  height: 4.375rem;
  /* background: url("http://127.0.0.1:5050/img/business/order.webp") no-repeat; */
  background-repeat: no-repeat;
  background-size: cover;
  float: left;
  margin-right: 6%;
}
.order_info > ul > li > div > div:first-child {
  width: 50%;
}
</style>
