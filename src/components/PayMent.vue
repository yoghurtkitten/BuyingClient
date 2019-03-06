<template>
  <div class="container-fluid" id="app">
    <header>
      <p>
        <span :style="`background-image:url(${baseUrl}/img/pay/OzUPukVET.png)`">
          你好，欢迎使用支付宝付款！
          <a href="javascript:;">常见问题</a>
        </span>
      </p>
      <div>
        <img :src="baseUrl+'/img/pay/T1HHFgXXVeXXXXXXXX.png'" alt>
      </div>
    </header>
    <section>
      <div>
        <div class="main-div">
          <div>
            <p>扫码支付</p>
            <img :src="baseUrl+'/img/pay/pay.jpg'" alt>
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
        <img :src="baseUrl+'/img/pay/2R3cKfrKqS.png'" alt>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      baseUrl: this.$store.getters.getBaseUrl,
      total: "",
      order_id: "",
      order_no: "",
      timer: null
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
        url: `${this.baseUrl}/user/changeStatu`,
        data: {
          order_no: this.order_id,
          pay_method: "支付宝"
        },
        type: "get",
        dataType: "json"
      }).then(data => {
        console.log(data);
      });
    },
    time() {
      this.timer = setTimeout(() => {
        var str = alert("支付超时，请重新下单支付");
        setTimeout(() => {
          window.close();
        }, 2000);
      }, 900000);
    }
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);
    next();
  }
};
</script>
<style lang="css" scoped>
    @import '../assets/css/payMent.css'
</style>