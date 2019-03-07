<template>
  <div class="business">
    <div class="header">
      <p>Buying · 商家中心</p>
      <p>{{shopName}}</p>
    </div>
    <article>
      <aside>
        <ul>
          <li @click="toHome">
            <i class="iconfont">&#xe603;</i>
            <span>首页</span>
          </li>
          <li>
            <i class="iconfont">&#xe68d;</i>
            <span @click="toOrderHandle">订单</span>
          </li>
          <li>
            <i class="iconfont">&#xe602;</i>
            <span @click="toFoodIndex">商品</span>
          </li>
          <li>
            <i class="iconfont">&#xe603;</i>
            <span>财务</span>
          </li>
          <li>
            <i class="iconfont">&#xe603;</i>
            <span>门店</span>
          </li>
          <li>
            <i class="iconfont">&#xe603;</i>
            <span>通知中心</span>
          </li>
        </ul>
      </aside>
      <router-view></router-view>
    </article>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchInfo: "",
      isorder: false,
      shopName: '',
      baseUrl: this.$store.getters.getBaseUrl,
    };
  },
   mounted() {
    this.getAllCount();
  },
  methods: {
    toHome() {
      this.$router.push("/MainPage/index");
    },
    toOrderHandle() {
      this.$router.push("/MainPage/order");
    },
    getAllCount() {
      var url = `${this.baseUrl}/business/getAllOrder`;
      this.axios.get(url, {
        params: {
          bphone: localStorage.getItem("business")
        }
      }).then(result => {
        // console.log(result.data.data);
        this.shopName = result.data.data[0].shop_name;
      })
    },
    toFoodIndex() {
      this.$router.push('/MainPage/foodIndex');
    }
  },
};
</script>
<style>
.business > .header {
  display: flex;
  justify-content: space-between;
  background: #41403f;
  color: #f5f5f5;
  padding: 2% 5%;
}
.business > .header p {
  margin: 0;
  padding: 0;
  font-size: 20px;
}
.business > article {
  display: flex;
}
.business>article>aside {
  width: 12%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 675px;
  padding-top: 2%;
  box-shadow: 0 0 5px #ccc;
}
.business aside img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10%;
}
.business > article > aside > ul {
  list-style: none;
  margin: 0;
  padding: 0;
  color: #333;
}
.business > article > aside > ul li {
  padding-top: 20%;
  padding-bottom: 20%;
  cursor: pointer;
}
.business > article > aside > ul li > ul {
  list-style: none;
  padding-left: 24%;
}
</style>
