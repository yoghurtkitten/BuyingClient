<template>
  <div>
    <login-header></login-header>
    <div class="container">
      <div class="content">
        <h3>账号密码登录</h3>
        <el-input v-model="user" placeholder="请输入账号" @blur="vali"></el-input>
        <el-input type="password" v-model="pwd" placeholder="请输入密码" class="pwd" @blur="vali"></el-input>
        <router-link to="/forgetPwd" class="forget" v-if="radio == 1">忘记密码？</router-link>
        <div class="identity">
          <el-radio v-model="radio" label="1">商家</el-radio>
          <el-radio v-model="radio" label="2">管理员</el-radio>
        </div>
        <el-button type="primary" :disabled="notLogin" @click="Login">登录</el-button>
      </div>
      <div class="registe" v-if="radio == 1">
        <p>没有帐号？
          <router-link to="/register">去开店</router-link>
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
      radio: ""
    };
  },
  methods: {
    vali() {
      if (this.radio == 1) {
        var reg = /^1[3-8]\d{9}$/;
        if (!reg.test(this.user) || !this.pwd) {
          this.notLogin = true;
        } else {
          this.notLogin = false;
        }
      } else {
        if (!this.user || !this.pwd) {
          this.notLogin = true;
        } else {
          this.notLogin = false;
        }
      }
    },
    Login() {
      if (this.radio == 1) {
        var url = `${this.baseUrl}/business/Login`;
        this.axios
          .get(url, {
            params: {
              user: this.user,
              pwd: this.pwd
            }
          })
          .then(result => {
            if (result.data.code == 200) {
              var url = `${this.baseUrl}/business/valiBusiness`;
              this.axios
                .get(url, {
                  params: {
                    phone: this.user
                  }
                })
                .then(res => {
                  console.log(res.data.data[0].isPass);
                  if (res.data.code == 200) {
                    if (res.data.data[0].isPass == 0) {
                      localStorage.setItem(
                        "business",
                        result.data.data[0].phone
                      );
                      this.$router.push("/MainPage/index");
                    } else if (res.data.data[0].isPass == 0) {
                      this.$message("管理员正在审核中");
                    } else {
                      this.$message.error("审核不同过，请重新申请并核对信息");
                    }
                  } else {
                    this.$message.error("系统开小差儿了，请稍后重试");
                  }
                });
            } else {
              alert("帐号或密码有误，请重试");
              this.user = "";
              this.pwd = "";
            }
          });
      } else if (this.radio == 2) {
        var url = `${this.baseUrl}/admin/login`;
        this.axios
          .get(url, {
            params: {
              name: this.user,
              pwd: this.pwd
            }
          })
          .then(res => {
            if (res.data.code == 200) {
              localStorage.setItem("isLogin", "1");
              this.$router.push("/adminIndex");
            } else {
              this.$message.error("用户名或密码有误，请重试。.");
              this.pwd = "";
            }
          });
      } else {
        this.$message.error("请选择登录身份");
      }
    }
  }
};
</script>
<style lang="css" scoped>
@import "../../assets/css/bLogin.css";
</style>
