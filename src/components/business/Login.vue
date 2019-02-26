<template>
  <div>
    <login-header></login-header>
    <div class="container">
      <div class="content">
        <h3>账号密码登录</h3>
        <el-input v-model="user" placeholder="请输入账号" @blur="vali"></el-input>
        <el-input v-model="pwd" placeholder="请输入密码" class="pwd" @blur="vali"></el-input>
        <a href="javascript:;" class="forget">忘记密码？</a>
        <el-button type="primary" :disabled="notLogin" @click="Login">登录</el-button>
      </div>
      <div class="registe">
        <p>
          没有帐号？
          <a href="javascript:;">去开店</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: "",
      pwd: "",
      notLogin: true,
      baseUrl: this.$store.getters.getBaseUrl,
    };
  },
  methods: {
    vali() {
      var reg = /^1[3-8]\d{9}$/;
      if (!reg.test(this.user)||!this.pwd) {
        this.notLogin = true;
      } else {
        this.notLogin = false;
      }
    },
    Login() {
      var url = `${this.baseUrl}/business/Login`;
      this.axios.get(url, {
        params: {
          user: this.user,
          pwd: this.pwd
        }
      }).then(result => {
        if (result.data.code == 200) {
          localStorage.setItem('business', result.data.data[0].phone);
          // console.log(localStorage.getItem('business'));
          // console.log(this.$store.getters.getBusiness);

        } else {
          alert('帐号或密码有误，请重试');
          this.user = '';
          this.pwd = '';
        }
      })
    },
  }
};
</script>
<style scoped>
p {
  margin: 0;
}
.container {
  width: 100%;
  height: 550px;
}
.content {
  width: 38%;
  margin: 0 auto;
  /* border: 1px solid #000; */
  background: #fff;
  padding: 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 7%;
  position: relative;
  border-radius: 2%;
}
.content > h3 {
  text-align: center;
  color: #333;
  font-size: 22px;
  font-weight: normal;
}
.content > h3::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #f5f5f5;
  margin-top: 3%;
  margin-bottom: 5%;
}
.forget {
  position: absolute;
  right: 10%;
  text-decoration: none;
  top: 53%;
}
.registe {
  width: 38%;
  margin: 0 auto;
  height: 14%;
  background: #fff;
  border-radius: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
}
.el-input {
  margin-bottom: 6%;
}
.el-button {
  margin-top: 4%;
  margin-bottom: 3%;
}

.el-input__inner {
  height: 50px;
}
@media screen and (max-width: 997px) {
  .content,
  .registe {
    width: 55%;
  }
}
@media screen and (max-width: 782px) {
  .content,
  .registe {
    width: 65%;
  }
}
</style>
