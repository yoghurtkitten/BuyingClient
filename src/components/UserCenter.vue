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
                  <span @click="toCenter">个人中心</span>
                </div>
              </li>
              <li>
                <div>
                  <i class="iconfont">&#xe62c;</i>
                  <span>我的订单</span>
                </div>
                <p @click="toOrder">近三个月订单</p>
              </li>
              <li>
                <div>
                  <i class="iconfont">&#xe645;</i>
                  <span>我的资料</span>
                </div>
                <p>个人资料</p>
                <p @click="toAddress">地址管理</p>
              </li>
              <li>
                <div>
                  <i class="iconfont">&#xeb9a;</i>
                  <span>我的收藏</span>
                </div>
              </li>
            </ul>
          </div>
          <router-view></router-view>
          
        </div>
      </section>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
export default {
  methods: {
    toCenter() {
      // console.log('123')
      this.$router.push('/UserCenter/Center')
    },
    toOrder() {
      this.$router.push('/UserCenter/Order');
    },
    toAddress() {
      this.$router.push('/UserCenter/Address');
    }
  },
}
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

.left-aside > ul > li > p{
  cursor: pointer;
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
.detail {
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  background-repeat: no-repeat;
  background-size: cover;
  float: left;
  margin-right: 6%;
}
.order_info > ul > li > div > div:first-child {
  width: 50%;
}
</style>
