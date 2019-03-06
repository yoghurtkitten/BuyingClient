<template>
  <div class="detail-list m-0 mt-3 search-mode" id="busi_list">
    <!-- <button @click="comeback">返回</button> -->
    <p @click="comeback" class="comeback">< 返回</p>
    <ul>
      <li v-for="(obj, index) in businessList" :key="index">
        <h4>{{obj.foods[0].shop_name}}</h4>
        <div class="star">
          <i class="iconfont" v-for="(item, index) in obj.foods[0].shop_start" :key="index">&#xec43;</i>
          <span>平均{{obj.foods[0].deliver_time}}分钟送达</span>
        </div>
        <ul>
          <li v-for="(item, index) in obj.foods" :key="index">
            <div>
              <span>{{item.name}}</span>
            </div>
            <div class="right-choose">
              <span>￥{{item.price.toFixed(2)}}</span>
              <span class="buying" @click="toShop(obj.id,user)">去购买</span>
              <div>
                <p>
                  <i class="iconfont">&#xec43;</i>
                  <i class="iconfont">&#xec43;</i>
                  <i class="iconfont">&#xec43;</i>
                  <i class="iconfont">&#xec43;</i>
                  <i class="iconfont">&#xec43;</i>
                </p>
                <p>月售68份</p>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["parentuser", "parentaddress", "parentbusiness"],
  created() {
    this.address = this.parentaddress;
    this.business = this.parentbusiness;
  },
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      user: this.parentuser,
      address: this.parentaddress,
      business: "",
      businessList: []
    };
  },
  mounted() {
    this.getBusiness();
  },
  methods: {
    comeback() {
      this.$emit("comeback");
    },
    getBusiness() {
      $.ajax({
        url: `${this.baseUrl}/user/searchByBusiness`,
        data: {
          address: this.address,
          business: this.business
        },
        type: "get",
        dataType: "json"
      }).then(data => {
        this.businessList = data;
        console.log(data);
      });
    },
    toShop(sid, user) {
      this.$router.push(`/Shop?sid=${sid}&user=${user}`);
    }
  }
};
</script>
<style lang="css" scoped>
    @import '../../assets/css/userSearch.css'
</style>