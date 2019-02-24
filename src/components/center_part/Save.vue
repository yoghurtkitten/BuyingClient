<template>
  <div class="save">
    <div class="top">我的收藏</div>
    <div class="detail-list m-0 mt-3" id="busi_list">
      <ul>
        <li>
          <img :src="baseUrl+'/img/business/hualaishi.jpg'">
          <div class="right">
            <p class="business-title">华莱士</p>
            <div class="star">
              <i class="iconfont">&#xec43;</i>
              <span>5分</span>
            </div>
            <p class="descript d-flex align-items-center">
              <span>起送:5</span>
              <span class="pl-3 pr-3">配送费:￥5</span>
              <span>
                <i class="iconfont">&#xe784;</i>
                30分钟
              </span>
            </p>
          </div>
        </li>
        <li>
          <img :src="baseUrl+'/img/business/hualaishi.jpg'">
          <div class="right">
            <p class="business-title">华莱士</p>
            <div class="star">
              <i class="iconfont">&#xec43;</i>
              <span>5分</span>
            </div>
            <p class="descript d-flex align-items-center">
              <span>起送:5</span>
              <span class="pl-3 pr-3">配送费:￥5</span>
              <span>
                <i class="iconfont">&#xe784;</i>
                30分钟
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
      baseUrl: this.$store.getters.getBaseUrl
    };
  },
  methods: {}
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
.detail-list ul{
    display: flex;
}
.detail-list ul li {
  display: flex;
  width: 50%;
}
.detail-list ul li img {
  width: 100px;
  height: 80px;
  margin-right: 2%;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
