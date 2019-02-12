<template>
  <div class="container-fluid" id="app">
    <header>
      <p>
        <span>
          你好，欢迎使用支付宝付款！
          <a href="javascript:;">常见问题</a>
        </span>
      </p>
      <div>
        <img src="http://127.0.0.1:5050/img/pay/T1HHFgXXVeXXXXXXXX.png" alt>
      </div>
    </header>
    <section>
      <div>
        <div class="main-div">
          <div>
            <p>扫码支付</p>
            <img src="http://127.0.0.1:5050/img/pay/pay.jpg" alt>
            <div class="pay_info">
              <p>使用手机支付宝扫码完成付款</p>
              <p>
                <a href="javascript:;">手机支付宝下载</a>
                <span>|</span>
                <a href="javascript:;">如何使用?</a>
              </p>
            </div>
            <div>
              <p>上海拉扎斯信息科技有限公司</p>
              <p>￥{{total}}</p>
              <p>交易号:{{order_no}}</p>
            </div>
          </div>
          <div>
            <p>
              您还可以：
              <a href="javascript">使用电脑支付</a>
            </p>
            <p>客服：95188</p>
          </div>
        </div>
      </div>
    </section>
    <footer>
      <div>
        <p>ICP证：沪B2-20150087</p>
      </div>
      <div>
        <img src="http://127.0.0.1:5050/img/pay/2R3cKfrKqS.png" alt>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: "",
      order_id: "",
      order_no: ""
    };
  },
  mounted() {
    this.getHerfParam();
    this.changeOrderStatu();
    this.time();
  },
  methods: {
    getHerfParam() {
      this.total = this.$route.query.total;
      this.order_id = this.$route.query.order_id;
      this.order_no = this.$route.query.order_no;
    },
    changeOrderStatu() {
      $.ajax({
        url: "http://127.0.0.1:5050/user/changeStatu",
        data: {
          order_no: this.order_id,
          pay_method: '支付宝'
        },
        type: "get",
        dataType: "json"
      }).then(data => {
        console.log(data);
      });
    },
    time() {
      setTimeout(() => {
        var str = alert("支付超时，请重新下单支付");
        setTimeout(() => {
          window.close();
        }, 2000);
      }, 900000);
    }
  }
};
</script>
<style scoped>
html {
  background: #fff;
}

body {
  margin: 0;
  padding: 0;
  background: #f7f7f7;
  font-family: tahoma, arial, 宋体;
}

.container-fluid {
  padding: 0 !important;
}

p {
  margin: 0;
}

header {
  width: 100%;
  height: 6.125rem;
  background: #fff;
  box-shadow: 0 0 0.3125rem #ccc;
}

header > p {
  display: block;
  width: 100%;
  height: 26.5%;
  background: #81868b;
  text-align: right;
}

header > div {
  margin: 0 auto;
  width: 50%;
  min-width: 950px;
  height: 73.5%;
  display: flex;
  align-items: center;
  /* padding-left: 2%; */
}

@media screen and (max-width: 980px) {
  header > div {
    padding-left: 3%;
  }
}

header > p > span {
  display: block;
  width: 50%;
  min-width: 950px;
  height: 100%;
  margin: 0 auto;
  color: #fff;
  font-size: 0.75rem;
  line-height: 1.6875rem;
  background: url("http://127.0.0.1:5050/img/pay/OzUPukVET.png") no-repeat 93.5% 59%;
}

header > p > span > a {
  text-decoration: none;
  color: #fff;
  font-size: 0.75rem;
  margin-left: 2.5%;
}

section {
  margin-bottom: 1.25rem;
}

section > div {
  width: 50%;
  min-width: 950px;
  background: #fff;
  margin: 0 auto;
  margin-top: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1.125rem;
  padding-bottom: 1.125rem;
  border-bottom: 2px solid #bfbfbf;
}

/* .demo{
    font-size: 12px/1.5 tahoma,arial,\5b8b\4f53;
} */
.main-div {
  width: 95.2%;
  height: 95.2%;
  border: 1px solid #c8c8c8;
}

.main-div > div:first-child {
  width: 32.7%;
  margin: 0 auto;
  /* border: 1px solid #000; */
  text-align: center;
}

.pay_info > p {
  font-size: 0.875rem;
  margin-top: 1%;
}

.pay_info > p:first-child {
  margin-top: 1rem;
}

.pay_info > p > a {
  color: #06b;
  text-decoration: none;
  font-size: 0.875rem;
}

.main-div > div:first-child > p:first-child {
  font-size: 22px;
  padding: 50px 0 10px;
  font-weight: 400;
}

.main-div > div:first-child > img {
  width: 85%;
  margin: 0 auto;
  margin: 0 0.9375rem 0 0.9375rem;
}

.main-div > div:last-child {
  width: 100%;
  height: 7.7%;
  border-top: 0.0625rem solid #c8c8c8;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  margin-top: 7%;
}

.main-div > div:last-child p {
  display: inline-block;
  padding: 0.9375rem 0.75rem 1.5rem;
  font-size: 0.875rem;
}

.main-div > div:last-child > p > a {
  text-decoration: none !important;
  color: #06b;
}

footer > div {
  width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 0.625rem 0;
}

.main-div > div > div:first-child > p {
  font-size: 14px;
  color: #000;
}

.pay_info + div {
  margin-top: 17%;
}

.pay_info + div > p:first-child {
  font-size: 18px;
}

.pay_info + div > p:nth-child(2) {
  font-size: 40px;
  color: #f60;
  font-family: arial !important;
  font-weight: bold;
  margin: 1rem 0 1rem 0;
}

.pay_info + div > p:last-child {
  font-size: 0.875rem;
  color: #ccc;
  margin-top: 10%;
}

footer > div:first-child > p {
  font-size: 0.75rem;
  color: #808080;
}

footer img {
  padding: 20px 0 16px;
}
</style>
