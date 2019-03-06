<template>
  <div class="index">
    <div class="order">
      <p>待处理订单</p>
      <div>
        <ul>
          <li>
            <p>{{newOrder}}</p>
            <p>新订单</p>
          </li>
          <li>
            <p>{{cancelOrder}}</p>
            <p>异常订单</p>
          </li>
          <li>
            <p>0</p>
            <p>退单</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="comment">
      <p>待处理反馈</p>
      <div>
        <ul>
          <li>
            <p>10</p>
            <p>未回复评价</p>
          </li>
          <li>
            <p>125</p>
            <p>总评价</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="count">
      <p>今日总览</p>
      <div>
        <ul>
          <li>
            <p>{{allOrder}}</p>
            <p>今日订单</p>
          </li>
          <li>
            <p>￥{{countPrice.toFixed(2)}}</p>
            <p>今日营业额</p>
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
      newOrder: "",
      allOrder: 0,
      countPrice: 0,
      cancelOrder: 0,
    };
  },
  created() {
    this.getNewOrder();
    this.getPrice();
    this.getCancelOrder();
  },
  methods: {
    getNewOrder() {
      var url = `${this.baseUrl}/business/getNewCount`;
      this.axios
        .get(url, {
          params: {
            bphone: localStorage.getItem("business")
          }
        })
        .then(result => {
          this.newOrder = result.data.data[0].count;
        });
    },
    getCancelOrder() {
       var url = `${this.baseUrl}/business/getCancel`;
      this.axios
        .get(url, {
          params: {
            bphone: localStorage.getItem("business")
          }
        })
        .then(result => {
          this.cancelOrder = result.data.data[0].count;
        });
    },
    getPrice() {
      var url = `${this.baseUrl}/business/getAllPrice`;
      this.axios
        .get(url, {
          params: {
            bphone: localStorage.getItem("business")
          }
        })
        .then(result => {
          for (const item of result.data.data) {
            if (
              new Date(item.order_time).getFullYear() ==
                new Date().getFullYear() &&
              new Date(item.order_time).getMonth() == new Date().getMonth() &&
              new Date(item.order_time).getDate() == new Date().getDate()
            ) {
              this.countPrice += item.price;
              this.allOrder ++;
            }
          }
        });
    }
  }
};
</script>
<style scoped>
.index {
  margin-top: 2%;
  margin-left: 2%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.index .order,
.index .count {
  width: 50%;
}
.index .comment {
  width: 40%;
}
.index > div:first-child {
  margin-right: 2%;
}
.index p {
  margin: 0;
}
.index ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.index > div {
  background: #fff;
  box-shadow: 0 0 5px #ccc;
  margin-bottom: 5%;
}
.index > div > p {
  font-size: 1rem;
  color: #666;
  font-weight: 700;
}
.index > div > p::after {
  content: "";
  display: block;
  width: 100%;
  height: 0.1875rem;
  background: #f4f4f4;
  margin-top: 10px;
  margin-bottom: 3%;
}
.index .order,
.index .count,
.index .comment {
  padding: 3% 5% 0% 5%;
}
.index .comment ul,
.index .order ul,
.index .count ul {
  display: flex;
  justify-content: space-around;
}

.index .comment ul li p:first-child,
.index .order ul li p:first-child,
.index .count ul li p:first-child {
  font-size: 50px;
  font-weight: 500;
}
.index .comment ul li p,
.index .order ul li p,
.index .count ul li p {
  text-align: center;
}
.index .count div {
  display: flex;
  justify-content: center;
}
.index ul {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
