<template>
  <div class="order-detail">
    <div class="top">订单详情</div>
    <div class="steps">
      <ul>
        <li>订单已提交</li>
        <li>订单已取消</li>
      </ul>
    </div>
    <div class="detail">
      <div class="shop_img"></div>
      <div>
        <p>
          <span>醉得意（杨家湾）</span>
          <span>
              <i class="iconfont">&#xeb9a;</i>
              收藏
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.order-detail {
  width: 80%;
  box-shadow: 0 0 5px #ccc;
  background: #fff;
  padding: 1.5625rem;
}
.order-detail .top {
  font-size: 1.125rem;
  font-weight: 700;
}
.order-detail .top::after {
  content: "";
  display: block;
  width: 100%;
  height: 0.1875rem;
  background: #f8f8f8;
  margin-top: 10px;
}
.order-detail .steps {
  margin-top: 20px;
  padding-bottom: 30px;
  background: #f8f8f8;
}
.order-detail .steps > ul {
  list-style: none;
  display: flex;
  /* justify-content: space-around; */
  margin: 0;
  padding: 0;
  position: relative;
}
.order-detail .steps > ul::after {
  content: "";
  display: block;
  width: 80%;
  height: 1px;
  border: 0.5px solid #ededed;
  position: absolute;
  left: 10%;
  margin-top: 2.5rem;
  top: 28%;
}
.order-detail .steps > ul > li {
  width: 50%;
  text-align: center;
  height: 3.5rem;
  line-height: 3.5rem;
  font-size: 0.875rem;
  color: #999;
}
.order-detail .steps > ul li::after {
  position: absolute;
  content: "";
  background-color: #ddd;
  width: 1.125rem;
  height: 1.125rem;
  border: 5px solid #f8f8f8;
  border-radius: 50%;
  bottom: 0;
  margin-bottom: -9px;
  margin-left: -46px;
  z-index: 1;
}
.detail{
    display: flex;
}
.detail > .shop_img {
  width: 44px;
  height: 44px;
  background: url("http://127.0.0.1:5050/img/brand/miaomiao.jpg") no-repeat;
  background-size: cover;
}
</style>
