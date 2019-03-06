<template>
  <div class="container-fluid">
    <login-header></login-header>
    <div class="login">
      <section>
        <p>请填写您需要找回的账号</p>
        <div class="input-group mb-3 phone-div">
          <input
            type="text"
            class="form-control phone-number"
            placeholder="手机号"
            maxlength="11"
            v-model="phone"
          >
          <!-- <input type="hidden" id="codeFromUser" v-model="code"> -->
          <div class="input-group-append get-code">
            <span
              id="validate_code"
              :class="{'input-group-text':true,getcode:codeStyle}"
              @click="getCode"
            >{{code_span}}</span>
          </div>
        </div>
        <div class="input-group mb-3 phone-div">
          <input
            type="text"
            class="form-control phone-number"
            placeholder="验证码"
            id="code"
            v-model="pwd"
            :disabled="isDisabled"
          >
        </div>
        <button class="btn form-control" @click="login()">下一步</button>
      </section>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      phone: "",
      pwd: "",
      codeStyle: false,
      code: "",
      code_span: "获取验证码",
      time: 60,
      isDisabled: true,
      baseUrl: this.$store.getters.getBaseUrl
    };
  },
  watch: {
    phone(val) {
      if (val.length == 11) {
        var reg = /^[1][3|4|5|7|8]\d{9}$/g;
        if (reg.test(val)) {
          this.codeStyle = true;
        } else {
          this.codeStyle = false;
        }
      }
    }
  },
  created() {},
  methods: {
    getCode() {
      if (this.codeStyle) {
        $.ajax({
          url: `${this.baseUrl}/user/getVCode`,
          type: "post",
          data: {
            phone: this.phone
          },
          dataType: "json"
        }).then(data => {
          if (data.code == 200) {
            console.log("验证码发送成功!");
            this.code = data.vcode;
            this.startTime();
            this.isDisabled = false;
          } else {
            console.log("验证码发送失败！");
          }
          this.codeStyle = false;
        });
      }
    },
    startTime() {
      var timer = setInterval(() => {
        this.code_span = `已发送${this.time}`;
        this.time--;
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        this.codeStyle = true;
        this.code_span = "重新发送";
        this.isDisabled = true;
      }, 30000);
    },
    login() {
        if (this.code == this.pwd) {
            var url = `${this.baseUrl}/business/getBusi`;
            this.axios.get(url, {
                params:{
                    bphone: this.phone
                }
            }).then( res => {
                console.log(res.data)
                if (res.data.code == 200) {
                    this.$router.push(`/changePwd?phone=${this.phone}`)
                } else {
                    console.log('该用户不存在，请去注册')
                }
            })
        } else {
            alert('验证码有误');
        }
    }
  }
};
</script>
<style lang="css" scoped>
@import "../../assets/css/userLogin.css";
</style>