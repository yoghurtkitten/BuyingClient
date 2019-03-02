<template>
  <div>
    <!-- <login-header></login-header> -->
    <div class="main">
      <div class="bg">
        <div class="title">
          <button>
            <i class="iconfont">&#xec43;</i>
            Buying
          </button>
          <p>商户中心</p>
          <div class="title-right">
            <p>小程序入口</p>
            <p>在线客服</p>
          </div>
        </div>
        <div class="concat">
          <p>加入Buying外卖平台，翻倍赚大钱</p>
        </div>
        <ul>
          <li>
            <p>
              <span>24</span>
              <span>小时</span>
            </p>
            <span>极速开店</span>
          </li>
          <li>
            <p>
              <span>340</span>
              <span>万</span>
            </p>
            <span>优质商家</span>
          </li>
          <li>
            <p>
              <span>2000</span>
              <span>城市</span>
            </p>
            <span>全国覆盖</span>
          </li>
          <li>
            <p>
              <span>2.6</span>
              <span>亿</span>
            </p>
            <span>累计用户</span>
          </li>
        </ul>
        <div class="toLogin">
          <button @click="toAppli">我要开店</button>
        </div>
      </div>
    </div>
    <div class="alert">
      <p>开店流程</p>
      <div>
        <ul>
          <li>
            <div>1</div>
            <span>提交申请</span>
          </li>
          <li>
            <div>2</div>
            <span>审核签约</span>
          </li>
          <li>
            <div>3</div>
            <span>录入菜单</span>
          </li>
          <li>
            <div>4</div>
            <span>门店上线</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="problem">
      <p>常见问题</p>
      <div>
        <ul>
          <li>
            <p>1.饿了么上开店是如何收费的？</p>
            <p>
              饿了么上开店本身不收取任何费用。 产生订单后会收取平台服务费，根据不同的地区、配送方案，大致如下:
              · 门店自行配送：每笔订单金额的 5%~8%;
              · 饿了么配送：每笔订单金额的 15%~25%;
              申请提交后，会有市场经理与您详细沟通。
            </p>
          </li>
          <li>
            <p>2.申请开店需要哪些材料？</p>
            <p>门脸照片、店内照片、门店logo、身份证照片、营业执照、餐饮服务许可证（或其他食品流通许可证等有效证件）。</p>
          </li>
          <li>
            <p>3.开店审核需要多久？</p>
            <p>提交申请后，1~3个工作日内将会有市场经理线下审核店铺信息，如超时未处理，您可直接联系市场经理。</p>
          </li>
          <li>
            <p>4.提交申请后，如何查询审核结果？</p>
            <p>您可通过“饿了么商家版”App 查看当前审核状态。</p>
          </li>
          <li>
            <p>5.店铺之前无效了，可以重新上线吗？</p>
            <p>可以，实体店双证齐全可直接点击“我要开店”按钮申请开店。</p>
          </li>
          <li>
            <p>6.无实体店或单证可以上线吗？</p>
            <p>不可以，网上开店必须有线下实体门店，并且需要准备好营业执照与餐饮服务许可证（或其他类许可证等)。</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="shade" v-if="isShade">
      <div class="choose_addre" v-if="chooseAddre">
        <p>选择你店铺所在的城市</p>
        <v-distpicker province="省" city="市" area="区" @selected="selected"></v-distpicker>
        <el-button type="primary" :disabled="notLogin" @click="confirm">确定</el-button>
      </div>
      <div class="appli" v-if="appliForm">
        <p>
          申请入驻
          <i class="iconfont" @click="close">&#xe661;</i>
        </p>
        <div class="form">
          <el-input v-model="phone" placeholder="联系人手机号" clear="phone"></el-input>
          <el-button type="primary" :disabled="disSend" class="sendCode" @click="sendCode">{{text}}</el-button>
          <el-input v-model="mycode" placeholder="验证码"></el-input>
          <el-button type="primary" :disabled="disVali" @click="appli">立即入驻</el-button>
        </div>
        <p>
          <!-- <el-checkbox label="我已阅读并已同意" name="type"></el-checkbox> -->
          <input type="checkbox" v-model="ck" id="ck">
          <label for="ck" class="read">我已阅读并已同意</label>
          <a href="javascript:;">《饿了么网上订餐平台服务协议》</a>
        </p>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import VDistpicker from "v-distpicker";
import qs from "qs";
export default {
  components: { VDistpicker },
  data() {
    return {
      province: "",
      city: "",
      area: "",
      isShade: true,
      chooseAddre: true,
      appliForm: false,
      baseUrl: this.$store.getters.getBaseUrl,
      phone: "",
      mycode: "",
      notLogin: false,
      disVali: true,
      disSend: true,
      code: "",
      ck: false,
      text: "发送验证码"
    };
  },
  methods: {
    close() {
      this.isShade = false;
      this.appliForm = false;
    },
    selected(data) {
      if (
        data.province.value != "" &&
        data.city.value != "" &&
        data.area.value != ""
      ) {
        this.notLogin = false;
        this.city = data.city.value;
        this.area = data.area.value;
        this.province = data.province.value;
      } else {
        this.notLogin = true;
      }
    },
    confirm() {
      this.isShade = false;
      this.chooseAddre = false;
    },
    sendCode() {
      var i = 60;
      this.text = `${i}S`;
      var timer = setInterval(() => {
        i--;
        this.text = `${i}S`;
        this.disSend = true;
      }, 1000);
      setTimeout(() => {
        this.text = "重新发送";
        this.disSend = false;
        this.disVali = true;
        clearInterval(timer);
      }, 60000);
      console.log(this.phone);

      var data = qs.stringify({
        phone: this.phone
      });
      var url = `${this.baseUrl}/user/getVCode`;
      this.axios.post(url, data).then(res => {
        this.code = res.data.vcode;
      });
    },
    appli() {
      if (this.mycode == this.code) {
        // console.log(this.phone, this.province, this.city, this.area);
        this.$router.push(
          `/AppliFrom?phone=${this.phone}&province=${this.province}&city=${
            this.city
          }&area=${this.area}`
        );
      }
    },
    toAppli() {
      this.isShade = true;
      this.appliForm = true;
    }
  },
  watch: {
    phone: function(newValue) {
      var reg = /^1[3-9]\d{9}$/;
      if (reg.test(newValue)) {
        this.disSend = false;
      } else {
        this.disSend = true;
      }
    },
    mycode: function(newValue) {
      var reg = /^\d{6}$/;
      if (reg.test(newValue) && this.ck) {
        this.disVali = false;
      } else {
        this.disVali = true;
      }
    },
    ck: function(newValue) {
      var reg = /^\d{6}$/;
      if (reg.test(this.mycode) && newValue) {
        this.disVali = false;
      } else {
        this.disVali = true;
      }
    }
  }
};
</script>
<style scoped>
ul {
  list-style: none;
}
.shade {
  width: 100%;
  height: 650px;
  position: absolute;
  top: 0px;
  background: hsla(0, 0%, 100%, 0.8);
}
.choose_addre {
  background: #fff;
  width: 60%;
  margin: 0 auto;
  padding-top: 1%;
  padding-bottom: 2.5%;
  margin-top: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 2%;
}
.choose_addre > p {
  text-align: center;
  font-size: 18px;
  color: #303133;
  width: 100%;
}
.choose_addre > p::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #ebeef5;
  margin-top: 1.5%;
  margin-bottom: 2.5%;
}
.choose_addre > p + div {
  margin-bottom: 3%;
  width: 100%;
  text-align: center;
}
.choose_addre > p + div::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #ebeef5;
  margin-top: 4%;
}
.bg {
  background: url("http://127.0.0.1:5050/img/business/head-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 650px;
  border: 1px solid transparent;
  color: #fff;
  padding-bottom: 55px;
}
.concat {
  display: flex;
  justify-content: center;
}
.concat > p {
  width: 52%;
  font-size: 60px;
  text-align: center;
  margin-top: 4%;
}
.bg ul {
  display: flex;
  margin: 0 auto;
  justify-content: center;
}
.bg ul > li {
  width: 20%;
  display: flex;
  flex-direction: column;
}
.bg ul > li > p {
  text-align: center;
  color: #fff000;
  position: relative;
}
.bg ul > li:not(:last-child) > p::after {
  position: absolute;
  content: "";
  display: block;
  height: 60px;
  width: 1px;
  border-right: 1px dotted hsla(0, 0%, 100%, 0.6);
  right: 0px;
  top: 60px;
}

.bg ul > li > p > span:first-child {
  font-size: 100px;
  font-weight: 300;
  font-family: Fjalla One;
  letter-spacing: -8px;
}
.bg ul > li > p > span:last-child {
  font-size: 26px;
}
.bg ul > li > span {
  display: inline-block;
  text-align: center;
  font-size: 20px;
  margin-top: -29px;
}
.toLogin {
  text-align: center;
  height: 20%;
}
.toLogin > button {
  width: 18%;
  height: 65%;
  background: tomato;
  border: none;
  color: #fff;
  font-size: 32px;
  border-radius: 8px;
  margin-top: 3%;
}
.alert {
  padding: 50px;
  background: #ebeef2;
}
.alert ul {
  display: flex;
  justify-content: space-around;
}
.alert ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.alert ul li div {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: tomato;
  text-align: center;
  line-height: 100px;
  color: #fff;
  font-size: 42px;
  margin-bottom: 10%;
}
.alert > p,
.problem > p {
  font-size: 24px;
  text-align: center;
}
.title {
  display: flex;
  margin-left: 20%;
  margin-top: 1%;
  font-size: 20px;
  font-weight: 500;
}
.title p {
  margin: 0;
}
.title button {
  border-radius: 5px;
  border: none;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 5px;
  color: #fff;
  background: #e54c2a;
  font-weight: 500;
  margin-right: 2%;
}
.problem {
  padding: 6%;
}
.problem ul {
  display: flex;
  flex-wrap: wrap;
}
.problem ul > li {
  width: 50%;
}
.problem ul > li > p:last-child {
  padding-left: 3%;
  padding-right: 6%;
  font-size: 14px;
  color: #5a5e66;
}
.title-right {
  display: flex;
  width: 63%;
  justify-content: flex-end;
  font-size: 14px;
}
.title-right p:first-child {
  margin-right: 5%;
}
.appli {
  width: 26.5%;
  background: #fff;
  margin: 0 auto;
  margin-top: 15%;
  padding-top: 2%;
  border-radius: 5px;
}
.appli > p {
  text-align: center;
  position: relative;
  color: #303133;
  font-size: 18px;
}
.appli > p::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #ebeef5;
  margin-top: 3%;
}
.appli > p > i {
  position: absolute;
  right: 30px;
  top: 20%;
  font-weight: bold;
  font-size: 12px;
  cursor: pointer;
}
.form {
  position: relative;
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
}
.form div {
  margin-bottom: 8%;
}

.form > button {
  width: 100%;
}
.sendCode {
  position: absolute;
  width: 90px !important;
  z-index: 1;
  right: 10%;
  top: 0;
  height: 40px;
  text-align: center;
  padding: 0 !important;
  border-radius: 0 4px 4px 0;
}
.appli a {
  font-size: 12px;
}
.read {
  font-size: 12px;
  margin-right: 0;
  color: #9a9a9a;
  font-weight: 700;
  letter-spacing: -0.4px;
  margin-top: 5%;
  margin-bottom: 5%;
}
</style>
