<template>
  <div>
    <login-header></login-header>
    <div class="changePwd">
      <div>
        <p>您正在找回的账号是：{{phone}}</p>
        <el-form
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <h3 v-show="isSuccess">修改成功，3秒后自动跳到登陆页面~~</h3>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.phone = this.$route.query.phone;
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        checkPass: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      phone: "",
      baseUrl: this.$store.getters.getBaseUrl,
      isSuccess: false,
      timer: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = `${this.baseUrl}/business/changePwd`;
          this.axios
            .get(url, {
              params: {
                upwd: this.ruleForm2.pass,
                bphone: this.phone
              }
            })
            .then(result => {
              if (result.data.code == 200) {
                this.isSuccess = true;
                this.timer = setTimeout(() => {
                  this.$router.push("/Business")
                }, 3000);
              } else {
                alert("修改密码失败，请重新修改！");
              }
            });
          // console.log(this.ruleForm2.pass,this.phone);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  beforeRouteLeave (to, from, next) {
    clearTimeout(this.timer);
    next();
  }
};
</script>
<style scoped>
.changePwd {
  width: 100%;
  background: #fff;
  box-shadow: 0 -1px 5px #ccc;
}
.changePwd > div {
  width: 30%;
  margin: 0 auto;
  padding-top: 5%;
}
.changePwd > div > p {
  color: #999;
  font-size: 12px;
  margin-bottom: 3%;
  text-align: center;
}
h3{
  text-align: center;
}
</style>
