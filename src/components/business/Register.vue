<template>
  <div>
    <!-- <login-header></login-header> -->
    <div class="main">
      <div class="bg" :style="`background-image:url(${baseUrl}/img/business/head-bg.jpg)`">
        <div class="title">
          <button>
            <i class="iconfont">&#xec43;</i>
            Buying
          </button>
          <p>商户中心</p>
          <div class="title-right">
            <p @click="toIndex">首页</p>
            <p>小程序入口</p>
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
    toIndex() {
      this.$router.push('/')
    },
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
<style lang="css" scoped>
    @import '../../assets/css/registe.css'
</style>
