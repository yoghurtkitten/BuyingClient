<template>
  <div class="save">
    <div class="top">我的收藏</div>
    <div class="detail-list m-0 mt-3" id="busi_list">
      <ul>
        <li v-for="(item, index) in saveList" :key="index">
          <img :src="baseUrl+'/'+item.shop_img" @click="toShop" :data-sid="item.id">
          <div class="right">
            <p class="business-title">{{item.shop_name}}</p>
            <div class="star">
              <i class="iconfont" v-for="(o, i) in item.shop_start" :key="i">&#xec43;</i>
              <span>{{item.shop_start}}分</span>
            </div>
            <p class="descript d-flex align-items-center">
              <span>起送:{{item.deliver_cost}}</span>
              <span class="pl-3 pr-3">配送费:￥{{item.deliver_fee}}</span>
              <span>
                <i class="iconfont">&#xe784;</i>
                {{item.deliver_time}}分钟
              </span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      saveList: []
    };
  },
  created() {
    this.getSave();
  },
  methods: {
    getSave() {
      var url = `${this.baseUrl}/user/getSave`;
      this.axios(url).then(result => {
        console.log(result.data.data);
        this.saveList = result.data.data;
      });
    },
    toShop(e) {
      var sid = e.target.dataset.sid;
    //   console.log(sid);
      this.$router.push(`/Shop?sid=${sid}`);
    }
  }
};
</script>
<style scoped>
.save p {
  margin: 0;
}
.save {
  width: 80%;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  padding: 1.5625rem;
}
.save .top {
  font-size: 1.125rem;
  font-weight: 700;
}
.save .top::after {
  content: "";
  display: block;
  width: 100%;
  height: 0.1875rem;
  background: #f4f4f4;
  margin-top: 10px;
  margin-bottom: 5%;
}
.detail-list ul {
  display: flex;
  flex-wrap: wrap;
}
.detail-list ul li {
  display: flex;
  width: 50%;
  margin-bottom: 3%;
}
.detail-list ul li img {
  width: 100px;
  height: 80px;
  margin-right: 2%;
  cursor: pointer;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.star i {
  color: #e54c2a;
}
</style>
